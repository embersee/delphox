import React from "react";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" overflow-x-hidden p-1">{children}</div>;
}
