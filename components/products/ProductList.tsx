"use client";

import { Badge } from "@/components/ui/badge";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { api } from "@/trpc/react";
import { RouterOutputs } from "@/trpc/shared";
import { NonNullableFields } from "@/server/types";
import CreateProductButton from "./CreateProductButton";
import ActivityBadge from "../ui/activity-badge";

export default function ProductList({
  bot,
}: NonNullableFields<RouterOutputs["bots"]["getBotById"]>) {
  const { data: b } = api.bots.getBotById.useQuery(
    { id: bot.id },
    {
      initialData: { bot },
      refetchOnMount: false,
    },
  );

  const [animationParent] = useAutoAnimate();

  if (!b.bot?.Products.length)
    return (
      <div className="text-center">
        <h2 className="mt-2 text-sm font-semibold">No Products.</h2>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new product!
        </p>
        <div className="mt-2">
          <CreateProductButton botId={bot.id} />
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      <CreateProductButton botId={b.bot.id} />

      <div ref={animationParent} className="grid  grid-cols-2 gap-2">
        {b.bot.Products.map((p) => (
          <ProductCard product={p} categories={p.Categories} key={p.id} />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({
  product,
  categories,
}: {
  product: RouterOutputs["products"]["getProduct"]["product"][0];
  categories: RouterOutputs["categories"]["getCategoryByBot"]["category"];
}) => {
  return (
    <div className=" rounded-md border bg-secondary/30 p-2 pl-4 backdrop-blur-[1px] transition-colors hover:bg-secondary/60">
      <div className="flex w-full items-center justify-between space-x-4">
        <div className="space-x-4 text-xl font-medium capitalize hover:underline">
          <span>{product.name}</span>
          <ActivityBadge active={product.status == "ACTIVE"} />
        </div>
      </div>
      <div className=" w-full ">
        <p>Price: {product.price}</p>
        <p>desc: {product.description}</p>
        <p>short: {product.shortDescription}</p>
        <p>price: {product.price}</p> <p>{product.discount}%</p>
        <p>stock: {product.stock}</p>
        <p>Created At:{product.createdAt?.toDateString()}</p>
      </div>
      <ul>
        {categories.map((c, i) => (
          <li>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
