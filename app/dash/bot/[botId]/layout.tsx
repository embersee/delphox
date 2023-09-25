import BotSidebar from "@/components/layouts/BotSidebar";
import { getBotById } from "@/lib/api/bots/queries";
import { checkAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function BotLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { botId: string };
}) {
  await checkAuth();

  const { bot } = await getBotById(params.botId);

  if (!bot) return redirect("/dash");

  return (
    <div className="flex max-w-7xl mx-auto">
      <BotSidebar username={bot?.username} botId={bot?.id} />
      {children}
    </div>
  );
}
