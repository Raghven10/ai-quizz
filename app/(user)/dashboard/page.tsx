import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import QuizzTable from "@/components/quizz/quizzTable";

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
        <p>No quizzes found</p>
    )
    

}

export default page;