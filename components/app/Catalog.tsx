"use client";

import { RouterOutputs } from "@/trpc/shared";
import ProductCard from "./ProductCard";
import { useSortStore } from "@/store/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Catalog({
  bot,
}: RouterOutputs["bots"]["getBotPublic"]) {
  const products = bot?.Products;

  const [animationParent] = useAutoAnimate();

  if (!products) return <> no products on sale!</>;

  const { selectedSort } = useSortStore();

  if (selectedSort.value !== "") {
    switch (selectedSort.value) {
      case "ascending-name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "descending-name":
        products.sort((a, b) => a.name.localeCompare(b.name)).reverse();
        break;
      case "ascending-price":
        products.sort((a, b) => a.price - b.price);
        break;
      case "descending-price":
        products.sort((a, b) => a.price - b.price).reverse();
        break;
    }
  }

  console.log("sort: ", selectedSort.value);

  return (
    <div ref={animationParent} className="grid grid-cols-2 gap-1">
      {products.map((p, i) => (
        <ProductCard key={p.id} p={p}>
          {/* {p.name} */}
        </ProductCard>
      ))}
    </div>
  );
}
