"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UploadDoc = ()=> {
    const [document, setDocument] = useState<Blob | File | null | undefined>(null)
    const [isLoading, setIsLoading] = useState <boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>
         {
            e.preventDefault();
            if (!document){
                setError("Please upload a document first");
                return;
            }
            setIsLoading(true);
            
            const formData = new FormData();
            formData.append("pdf", document as Blob);
            try {
                const res = await fetch ("/api/quizz/generate", {
                    method: "POST",
                    body: formData
                })
                if (res.status==200) {
                    console.log("quiz generated successfully");
                    const data = await res.json();
                    const quizzId = data.quizzId;
                    router.push(`/quizz/${quizzId}`);

                }
                else {
                    console.log("quiz generation failed");
                    console.log(res);
                }
            }catch (e:any) {
                console.log("error while generating",e);
            }
            setIsLoading(false);
            
         };
    return (
        <div className="w-full">
            {isLoading ? "Generating questions..." : <form className="w-full" onSubmit={handleSubmit}>
                <label htmlFor="document"
                className="bg-secondary w-full flex h-20 rounded-md
                border-4 border-dashed border-blue-900 relative">
                    <div className="absolute inset-0 m-auto flex
                    justify-center items-center">
                        {document && document?.name ? document.name: "Drag a file"}
                    </div>
                    <input type="file" id="document" className="relative 
                    block w-full h-full z-50 opacity-0" onChange={(e)=> setDocument(e?.target?.files?.[0])} />
                </label>

                {error ? <p className="text-red-600">{error}</p>: null}
                <Button size={"lg"} type="submit" className="mt-2">Generate Quiz</Button>
            
            </form> }
            
        </div>
    )
}

export default UploadDoc