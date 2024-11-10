import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

import  Link  from "next/link";

export type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
    quizzes: Quizz[];
}

const QuizzTable = (props: Props) => {

    return (


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Quizz ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {props.quizzes.map((quizz) => (
            <tr key={quizz.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {quizz.id}
                </th>
                <td className="px-6 py-4">
                {quizz.name}
                </td>
                <td className="px-6 py-4">
                {quizz.description}
                </td>
                <td className="px-6 py-4">
                <Link href={`/quizz/${quizz.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Start
                </Link>
                </td>
            </tr>
            ))}
           
        </tbody>
    </table>
</div>

    )

}

export default QuizzTable;