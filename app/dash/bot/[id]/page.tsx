import { ProductVale } from "@/components/products/Vale";
import ProductList from "@/components/products/ProductList";
import Heading from "@/components/ui/heading";
import { api } from "@/trpc/server";

import { redirect } from "next/navigation";

import BackButton from "@/components/layouts/BackButton";
import ActivityBadge from "@/components/ui/activity-badge";

export default async function BotPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { bot } = await api.bots.getBotById.query({ id });

  if (!bot) return redirect("/dash");

  return (
    <>
      <BackButton />
      <Heading
        title={bot.displayName}
        description={bot.description || "no description."}
      >
        <ActivityBadge active={bot.active} />
      </Heading>

      <ProductList bot={bot} />

      <ProductVale />
    </>
  );
}
