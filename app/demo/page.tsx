"use client";
import {useState} from "react"
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";

import ResultCard from "@/components/quizz/ResultCard";
import QuizzSubmission from "@/components/quizz/QuizzSubmission";

const questions = [
  {
    questionText:"What is React ?",
    answers: [
      {answerText: "A library for building user interfaces", isCorrect:true, id:1},
      {answerText: "A backend framework", isCorrect:false, id:2},
      {answerText: "A database", isCorrect:false, id:3},
      {answerText: "A front end framework", isCorrect:false, id:4},
 
    ]
  },
  {
    questionText:"What is JSX ?",
    answers: [
      {answerText: "A library for building user interfaces", isCorrect:true, id:1},
      {answerText: "A backend framework", isCorrect:false, id:2},
      {answerText: "A database", isCorrect:false, id:3},
      {answerText: "A front end framework", isCorrect:false, id:4},
 
    ]
  },
  {
    questionText:"What is React ?",
    answers: [
      {answerText: "A library for building user interfaces", isCorrect:true, id:1},
      {answerText: "A backend framework", isCorrect:false, id:2},
      {answerText: "A database", isCorrect:false, id:3},
      {answerText: "A front end framework", isCorrect:false, id:4},
 
    ]
  },
  {
    questionText:"What is React ?",
    answers: [
      {answerText: "A library for building user interfaces", isCorrect:true, id:1},
      {answerText: "A backend framework", isCorrect:false, id:2},
      {answerText: "A database", isCorrect:false, id:3},
      {answerText: "A front end framework", isCorrect:false, id:4},
 
    ]
  },
  {
    questionText:"What is React ?",
    answers: [
      {answerText: "A library for building user interfaces", isCorrect:true, id:1},
      {answerText: "A backend framework", isCorrect:false, id:2},
      {answerText: "A database", isCorrect:false, id:3},
      {answerText: "A front end framework", isCorrect:false, id:4},
 
    ]
  },
]

export default function Demo() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer,setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean | null>(false);
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

    setSelectedAnswer(null);
    setIsCorrect(null);
    
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score+1);
    }
    setIsCorrect(isCurrentCorrect);
  }

  if (submitted){
    return (
      <QuizzSubmission 
      score={score} 
      scorePercentage={(score/questions.length) * 100} 
      totalQuestions={questions.length} />
    )
    
  }

  return (

    <div className="container m-auto bg-gray-500 h-screen">
      
      <main className="flex flex-col flex-1">
        {!started ? <h1 className="text-3xl font-bold m-auto my-16">AI Based Quizz</h1> 
        : (
          
          <div className="flex flex-col flex-1 m-auto">
            <div className="position-sticky top-0 z-10 py-4">
              <header className="grid grid-cols-[auto,1fr,auto]
              grid-flow-col items-center justify-between py-2 gap-2 ">
                <Button size="icon" variant={"outline"}><ChevronLeft /></Button>
                <ProgressBar value={(currentQuestion/questions.length)*100}></ProgressBar>

                <Button size="icon" variant={"outline"}><X /></Button>
              </header>
            </div>
            <h2 className="text-3xl font-bold">Q{currentQuestion+1}. {questions[currentQuestion].questionText}</h2>
            <div className="grid grid-cols-2 gap-6 mt-6">
            {
            questions[currentQuestion].answers.map(answer=>{
              const variant = selectedAnswer===answer.id ? 
              (answer.isCorrect ? "default" : "destructive") : "ghost";
              return (
                <div className="font-bold text-justify">
                <span>{answer.id}. </span>
                <Button key={answer.id} variant={variant} size="lg" 
                onClick={()=>{
                  handleAnswer(answer)
                }}> {answer.answerText}</Button>
                </div>
              )
            })}
            </div>
          </div>
        ) 
        
        }
      </main>
      <footer className="flex flex-col flex-1 w-1/3 m-auto">
        <ResultCard isCorrect={isCorrect} correctAnswer={
          questions[currentQuestion].answers.find(answer=>answer.isCorrect === true)?.answerText
        }/>
        <br/><br/>
        <Button variant={"default"} onClick={handleNext} className=" m-auto font-bold text-lg uppercase hover:bg-gray-600 rounded-full">
          {!started ? 'start' : (currentQuestion === questions.length-1) ? 'Submit':'Next'}
        </Button>
      </footer>
    </div>
  );
}
