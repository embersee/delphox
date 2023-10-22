import BotSidebar from "@/components/layouts/BotSidebar";
import { checkAuth } from "@/server/auth";

import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function BotLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  await checkAuth();

  const { bot } = await api.bots.getBotById.query({ id });

  if (!bot) return redirect("/dash");

  return (
    <div className="flex max-w-7xl">
      <BotSidebar username={bot?.username} botId={bot?.id} />
      <div className="flex w-full flex-col p-4">{children}</div>
    </div>
  );
}
