"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LoginButton } from "@telegram-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <Button variant={"destructive"} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <LoginButton
        botUsername="DelphoxBot"
        onAuthCallback={(data: any) => {
          void signIn("telegram-login", { callbackUrl: "/" }, data as any);
        }}
      />
    </>
  );
}
