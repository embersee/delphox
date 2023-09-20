import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/bots">bots</Link>
      <SignIn />
    </main>
  );
}
