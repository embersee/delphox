"use client";

import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import { ArrowUpRightIcon, ChevronRightSquare, Settings2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { api } from "@/trpc/react";
import { RouterOutputs } from "@/trpc/shared";
import { NonNullableFields } from "@/server/types";

export default function ProductList({
  store,
}: RouterOutputs["stores"]["getStore"]) {
  const { data: s } = api.stores.getStore.useQuery(undefined, {
    initialData: { store },
    refetchOnMount: false,
  });

  const [animationParent] = useAutoAnimate();

  if (!s.store?.Products.length) return <>No products</>;

  return (
    <ul ref={animationParent} className="space-y-2">
      {s.store?.Products.map((p) => <ProductCard product={p} key={p.id} />)}
    </ul>
  );
}

const ProductCard = ({
  product,
}: {
  product: RouterOutputs["products"]["getProduct"]["product"][0];
}) => {
  return (
    <li className="flex items-center justify-between rounded-md bg-secondary/30 p-2 pl-4 transition-colors hover:bg-secondary/60">
      <div className="flex w-full items-center justify-between space-x-4">
        <Link
          href={`/dash/bot/${product.id}`}
          className="text-md group flex items-center font-medium capitalize hover:underline"
        >
          <span>{product.name}</span>
          <span>{product.price}</span>
          <ArrowUpRightIcon className="h-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>

        <div className="flex items-center space-x-4 self-end">
          <Badge variant="outline" className=" border-green-300">
            {product.status}
          </Badge>
        </div>
      </div>
    </li>
  );
};
