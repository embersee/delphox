import { checkAuth } from "@/server/auth";

import React from "react";

export default async function BotLayout({
  children, // params: { id },
}: {
  children: React.ReactNode;
  // params: { id: string };
}) {
  await checkAuth();

  return <>{children}</>;
}
