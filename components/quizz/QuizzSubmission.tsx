import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    scorePercentage: number,
    score: number,
    totalQuestions: number,
};

const QuizzSubmission = (props:Props) => {

    const {scorePercentage, score, totalQuestions} = props;
    const router = useRouter();
    const goToHome = () => {
        router.push(`/quizz`);
    }
    return (
        <div className="container m-auto">
            <div className="flex flex-col flex-1 m-auto">
                <main className="border border-green-500 my-10 gap-2 p-10
                justify-center items-center text-3xl font-bold w-1/2">
                    <h2>Quizz Complete!</h2>
                    <p>You scored: {scorePercentage}%</p>
                </main>
                <footer className="footer">
        
                    <Button variant={"default"} size="sm" onClick={goToHome}>Home</Button>
                </footer>

            </div>
            
            
        </div>
    )

}

export default QuizzSubmission