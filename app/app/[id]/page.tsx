import Filter from "@/components/app/Filter";
import Search from "@/components/app/Search";
import Sort from "@/components/app/Sort";
import TelegramLogic from "@/components/app/TelegramLogic";
import Heading from "@/components/ui/heading";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function App({
  params: { id },
}: {
  params: { id: string };
}) {
  const { bot } = await api.bots.getBotPublic.query({ id });

  if (!bot) redirect("/404");
  return (
    <>
      <TelegramLogic />
      <Heading title={bot.displayName} description={bot.description} />
      <div>
        <Search />
        <Filter />
        <Sort />
      </div>
      <div>
        {bot.Products.map((p, i) => (
          <div key={i}>{p.name}</div>
        ))}
      </div>
    </>
  );
}
