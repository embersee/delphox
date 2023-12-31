import CreateBotButton from "@/components/bots/CreateBotButton";
import { CreateProjectVale } from "@/components/bots/Vale";
import BotList from "@/components/bots/BotList";

import Heading from "@/components/ui/heading";
import { api } from "@/trpc/server";

export default async function Dash() {
  const { bots } = await api.bots.getBotsWithCommands.query();

  return (
    <>
      <Heading
        title="My Bots"
        description="Create or select which bot to manage here."
      ></Heading>

      <BotList bots={bots} />

      {!bots.length && (
        <div className="text-center">
          <h2 className="mt-2 text-sm font-semibold">No bots</h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new bot.
          </p>
          <div className="mt-6">
            <CreateBotButton />
          </div>
        </div>
      )}

      <CreateProjectVale />
    </>
  );
}
