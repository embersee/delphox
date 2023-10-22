import CreateProductButton from "@/components/products/CreateProductButton";
import { ProductVale } from "@/components/products/Vale";

import CreateStoreButton from "@/components/store/CreateStoreButton";
import ProductList from "@/components/store/ProductList";
import { StoreVale } from "@/components/store/Vale";

import Heading from "@/components/ui/heading";
import { api } from "@/trpc/server";

import { redirect } from "next/navigation";

export default async function BotPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { bot } = await api.bots.getBotById.query({ id });

  if (!bot) return redirect("/dash");

  return (
    <>
      {!bot.Store ? (
        <div className="text-center">
          <h2 className="mt-2 text-sm font-semibold">No store is connected</h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new store!
          </p>
          <CreateStoreButton botId={bot.id} />
        </div>
      ) : (
        <>
          <Heading
            title="My Store"
            description="Create or manage products here."
          >
            <CreateProductButton storeId={bot.Store.id} />
          </Heading>

          <ProductList store={bot.Store} />
        </>
      )}

      <StoreVale />
      <ProductVale />
    </>
  );
}