import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { View, ViewIcon } from "lucide-react";
import  Link  from "next/link";

export type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
    quizzes: Quizz[];
}

const QuizzesTable = (props: Props) => {
    return (
      

        <table className="table table-auto">
            <thead>
                <tr>
                    <th>Quizz ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {props.quizzes.map((quizz) => (
                    <tr key={quizz.id}>
                        <td>{quizz.id}</td>
                        <td>{quizz.name}</td>
                        <td>{quizz.description}</td>
                        <td>
                            <Link href={`/quizz/${quizz.id}`}>
                                <View />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       
    )
}

export default QuizzesTable;