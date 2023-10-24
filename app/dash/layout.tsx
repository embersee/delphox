import DashNav from "@/components/layouts/DashNav";
import { checkAuth } from "@/server/auth";
import React from "react";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <>
      <DashNav />
      <main>{children}</main>
    </>
  );
}
