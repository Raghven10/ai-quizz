import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import QuizzTable, { Quizz } from "@/components/quizz/quizzTable";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const page = async () => {
    // const session = await auth();
    // const userId = session?.user?.id;

    // if (!userId) {
    //     return (<p>user not found!</p>)
    // }
    // const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
    //     where: eq (quizzes.userId, userId)
    // })
    const userQuizzes: Quizz[] = await db.query.quizzes.findMany()
    console.log("userQuizzes",userQuizzes)
    if (userQuizzes.length !== 0) {
        return (
            <div className="container m-auto">
                <QuizzTable quizzes={userQuizzes} />
            </div>
            
        )
    }
    return (
        <div className="container m-auto">
            <p>No Quizz Generated yet!</p>
            <Link href="/quizz/new">            
                <Button variant="default">Generate</Button>
            </Link>
        </div>
    )
    

}

export default page;