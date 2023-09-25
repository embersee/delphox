import { getBotById } from "@/lib/api/bots/queries";

import { redirect } from "next/navigation";

export default async function BotPage({
  params,
}: {
  params: { botId: string };
}) {
  const { bot } = await getBotById(params.botId);

  if (!bot) return redirect("/dash");

  return (
    <div className="flex ">
      <div className="main">{JSON.stringify(bot, null, 4)}</div>
    </div>
  );
}
