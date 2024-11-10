import { NextRequest, NextResponse } from "next/server";

import {ChatOpenAI} from "@langchain/openai";
import {HumanMessage} from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import saveQuizz from "./saveToDb";
 

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    try {
        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: " "
        });
        const docs = await pdfLoader.load();

        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);

        const texts = selectedDocuments.slice(1,2).map((doc) => doc.pageContent);
        console.log(texts);

        const prompt  = "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quizz object with fields: name, description and questions. The questions is an array of minimum 10 objects with fields: questionText, answers. The answers is an array of exactly 4 objects with fields: answerText, isCorrect. "

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({error: "No API key provided"}, {status: 500})
        }

        const parser = new JsonOutputFunctionsParser();

        const extractionFunctionSchema = {
            name: "extractor",
            description: "Extract fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quizz: {
                        type:"object",
                        properties: {
                            name: {type: "string"},
                            description: {type: "string"},
                            questions: {
                                type:"array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: {type: "string"},
                                        answers: {
                                            type:"array",
                                            items:{
                                                type: "object",
                                                properties: {
                                                    answerText: {type: "string"},
                                                    isCorrect: {type: "boolean"},
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        

        const model = new ChatOpenAI({
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.MODEL_ID,
            
        });

        const runnable = model
        .bind({
            functions: [extractionFunctionSchema],
            function_call: { name: "extractor"}
        })
        .pipe(parser);

        const message = new HumanMessage({
            content: [
                {
                    type: "text",
                    text: prompt + "\n" + texts.join("\n")
                }
                
            ]
        });

        
        const result:any = await runnable.invoke([message]);
        console.log(result);
        
        const { quizzId } = await saveQuizz(result.quizz);
        console.log(quizzId);
        return NextResponse.json(
            {quizzId}, {status: 200});
    
        
    } catch (err: any) {
        console.error("Error invoking function:", err);

        return NextResponse.json({error: err.message}, {status:500})
    }
}