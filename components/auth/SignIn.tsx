"use client";

import { LoginButton } from "@telegram-auth/react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <LoginButton
      buttonSize="medium"
      botUsername="DelphoxBot"
      onAuthCallback={(data: any) => {
        void signIn("telegram-login", { callbackUrl: "/dash" }, data as any);
      }}
    />
  );
}
