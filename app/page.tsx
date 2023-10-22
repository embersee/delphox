import SignIn from "@/components/auth/SignIn";
import Nav from "@/components/layouts/Nav";

import { api } from "@/trpc/server";
import Hello from "./hello";

export const runtime = "edge";

export default async function Home() {
  const hello = await api.hello.hello.query();

  return (
    <>
      <Nav />
      <main>
        <div className="page">
          server: {hello.greeting}
          <Hello />
          <SignIn />
        </div>
      </main>
    </>
  );
}
