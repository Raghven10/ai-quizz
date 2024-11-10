import Link from 'next/link';
import { Button } from "@/components/ui/button";
export default function Home() {
 
  return (

    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-600 dark:bg-black-900">
      
      <main className="flex flex-1 flex-col flex-cols-1 justify-center py-10 my-11 items-center">
        <h1 className="text-4xl font-bold text-yellow-700">Welcome to AI Quizz App</h1>
        <div className="flex px-4 py-4 mt-4 w-1/4 text-center justify-between">
          
          <Link href="api/auth/signin/keycloak">
              <Button variant={"link"} className="bg-black hover:bg-green-500 text-white py-3 px-12 m-auto rounded-full">Sign In</Button>
          </Link>
          <Link href="/demo" passHref>
          <Button variant={"link"} className="bg-black hover:bg-green-500 text-white py-3 px-12 m-auto rounded-full">Demo</Button>
          </Link>
        </div>
        
      </main>
      <footer className="footer pb-9 px-6 m-auto z-10 ">
       <p className="text-sm text-muted z-10 text-black font-bold">Copyright smartstudy.io 2024</p> 
      </footer>
    </div>
  );
}
