import SignIn from "@/components/auth/SignIn";
import { getUser } from "@/lib/api/auth/queries";
import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await getUserAuth();

  const { user } = await getUser();

  if (user && !user.registered) {
    redirect("/registration");
  } else if (user && user.registered) {
    redirect("/dash");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {"session: " + JSON.stringify(session)}
      {"user: " + JSON.stringify(user)}
      <Link href="/bots">bots</Link>
      <SignIn />
    </main>
  );
}
