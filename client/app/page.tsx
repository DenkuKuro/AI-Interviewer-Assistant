import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 gap-4 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-6xl text-center">Welcome to Quacky Interviewer!</h1>
        <Link href="/auth/login"><Button size={"lg"}>Login</Button></Link>
      </main>
    </div>
  );
}
