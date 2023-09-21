import SignIn from "@/components/auth/SignIn";
import Nav from "@/components/layouts/Nav";
import { getUser } from "@/lib/api/auth/queries";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getUser();

  if (user && !user.registered) {
    redirect("/registration");
  }
  return (
    <>
      <Nav />
      <main>
        <SignIn />
      </main>
    </>
  );
}
