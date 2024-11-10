"use client";
import {useState} from "react"
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

import ResultCard from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";
import { saveSubmission } from "@/app/actions/saveSubmission";

import { InferSelectModel } from "drizzle-orm";
import { questionAnswers, questions as DbQuestions, quizzes } from "@/db/schema";

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof DbQuestions>;
type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
    quizz: Quizz
};


export default function QuizzQuestions(props: Props) {
  const { questions } = props.quizz;
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean | null>(false);
  const [userAnswers, setUserAnswers] = useState<{questionId: number, answerId: number}[]>([]);
  const router = useRouter();

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length -1) {
      setCurrentQuestion(currentQuestion+1);
    } else {
      setSubmitted(true);
      return;
    }
    
  }

  const handleAnswer = (answer: Answer, questionId: number) => {
    const newUserAnswerArr = [...userAnswers, {
      questionId,
      answerId: answer.id
    }];
    setUserAnswers(newUserAnswerArr);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score+1);
    }
  }

  const handleSubmit = async () => {
    try {
      const subId = await saveSubmission({score}, props.quizz.id);

    }catch (e) {
      console.error(e);
    }

    setSubmitted(true);
  }

  const handlePressPrev = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion-1);
    }
  };

  const handleExit = () => {
    router.push('/dashboard');
  };

  const scorePercentage = Math.round((score/questions.length)*100);
  const selectedAnswer:number | null | undefined = userAnswers.find(item => item.questionId === questions[currentQuestion].id)?.answerId;
  const isCorrect: boolean | null | undefined = questions[currentQuestion].answers.findIndex((answer:Answer)=>answer.id === selectedAnswer) 
  ? questions[currentQuestion].answers.find((answer:Answer)=>answer.id === selectedAnswer)?.isCorrect : null
  if (submitted){
    return (
      <QuizzSubmission 
      score={score} 
      scorePercentage={scorePercentage} 
      totalQuestions={questions.length} />
    )
    
  }

  return (
    <div className="flex bg-purple-300 m-auto w-full h-full">
      {/* Quention Area */}
      <div className="flex flex-col m-auto w-[70%]">
        <main className="flex justify-center m-auto">
          {!started ? <h1 className="text-3xl font-bold m-auto">Welcome to AI Quizz</h1> 
          : (
            <div>
                <div className="position-sticky top-0 z-10 py-4 w-full">
                  <header className="grid grid-cols-[auto,1fr,auto]
                  grid-flow-col items-center justify-between py-2 gap-2">
                    <Button size="icon" variant={"outline"} onClick={handlePressPrev}><ChevronLeft /></Button>
                    <ProgressBar value={(currentQuestion/questions.length)*100}></ProgressBar>
                    <Button size="icon" variant={"outline"} onClick={handleExit}><X /></Button>
                  </header>
                </div>
              <h2 className="text-3xl font-bold">Q{currentQuestion+1}.{questions[currentQuestion].questionText}</h2>
              <div className="grid grid-cols-2 gap-6 mt-6 text-justify">
              {
              questions[currentQuestion].answers.map((answer, index)=>{
                const options = ["A", "B", "C", "D"];
                const optionLabel = options[index];
                const variant = selectedAnswer===answer.id ? 
                (answer.isCorrect ? "default" : "destructive") : "ghost";
                return (
                  <Button key={answer.id} disabled={!!selectedAnswer} variant={variant} size="lg"
                  onClick={()=>{
                    handleAnswer(answer, questions[currentQuestion].id)
                  }} className="font-bold text-sm"> {optionLabel}. {answer.answerText}</Button>
                )
              })}
              </div>
            </div>
          ) 
          
          }
        </main>
        
        <footer className="footer px-6 relative justify-center grid grid-cols-1">
          <ResultCard isCorrect={isCorrect} correctAnswer={
            questions[currentQuestion].answers.find((answer) => answer.isCorrect === true)?.answerText || ""
          }/> 
          {
            (currentQuestion === questions.length-1) ? 
            <Button variant={"default"} size="lg" onClick={handleSubmit}> Submit </Button> :
            <Button variant={"default"} size="sm" className="w-1/4 m-auto" onClick={handleNext}>{!started ? 'start' :'Next'}</Button>

          }
          
        </footer>
      </div>
      
      {/* Divider */}
      <div className="w-[2px] bg-black h-full"><hr/></div>
      
      {/* Sidebar Tracker  */}
      <div className="bg-purple-500 w-[25%] h-full flex flex-col font-bold text-white text-center px-5">
  <h2 className="text-center mt-5 text-2xl">Questions Tracker</h2>
  <h2 className="mb-5">Total No of Questions: {questions.length}</h2>
  
  <div className="flex flex-wrap gap-4 justify-center">
    {questions.map((question, index) => {
      const isAttempted = question.isAttempted || false; // Assuming you have this flag in your data
      return (
        <button
          key={question.id}
          onClick={() => setCurrentQuestion(index)} // Function to navigate to the selected question
          className={`w-[50px] h-[50px] rounded-sm flex items-center justify-center text-xl font-bold ${
            isAttempted ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {index + 1}
        </button>
      );
    })}
  </div>
</div>
      
    </div>
  );
}
