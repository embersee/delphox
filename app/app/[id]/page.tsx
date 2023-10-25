import Cart from "@/components/app/Cart";
import Filter from "@/components/app/Filter";
import Header from "@/components/app/Header";
import ProductCard from "@/components/app/ProductCard";
import Search from "@/components/app/Search";
import Sort from "@/components/app/Sort";
import TelegramLogic from "@/components/app/TelegramLogic";
import { AppVale } from "@/components/app/Vale";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { api } from "@/trpc/server";
import { ShoppingBasket } from "lucide-react";
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
      <Heading title={bot.displayName} description={bot.description}>
        <Cart />
      </Heading>

      <div className="flex items-center space-x-1 pb-4">
        <Search />
        <Filter />
        <Sort />
      </div>
      <div className=" grid grid-cols-2 gap-1">
        {bot.Products.map((p, i) => (
          <ProductCard key={i} p={p}>
            {/* {p.name} */}
          </ProductCard>
        ))}
      </div>
      <AppVale />
    </>
  );
}
