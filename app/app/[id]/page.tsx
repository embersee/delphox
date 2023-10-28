import Cart from "@/components/app/Cart";
import Catalog from "@/components/app/Catalog";

import Search from "@/components/app/Search";
import Sort from "@/components/app/Sort";
import TelegramLogic from "@/components/app/TelegramLogic";
import { AppVale } from "@/components/app/Vale";

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
      <div className="mx-4">
        <Heading title={bot.displayName} description={bot.description}>
          <Cart />
        </Heading>
      </div>

      <div className="flex items-center space-x-1 pb-4">
        <Search />
        <Sort />
      </div>

      <Catalog bot={bot} />

      <AppVale />
    </>
  );
}
