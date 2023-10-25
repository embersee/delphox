"use client";

import { RouterOutputs } from "@/trpc/shared";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductCard({
  p,
  children,
}: {
  p: RouterOutputs["products"]["getProducts"]["product"][0];
  children: React.ReactNode;
}) {
  const { cart, addToCart, removeFromCart } = useCartStore();

  const inCart = cart.find((item) => item.id === p.id);
  return (
    <div className="relative flex aspect-[2/3] flex-col rounded-lg border p-1 backdrop-blur-[1px]">
      {inCart && (
        <Badge
          variant="outline"
          className="absolute right-0 top-0 z-50 border text-lg shadow-2xl backdrop-blur-[1px]"
        >
          {inCart.quantity}
        </Badge>
      )}
      <div className="aspect-square rounded-xl border backdrop-blur-[1px]">
        {children}
      </div>
      <p className="text-lg">{p.name}</p>
      <p className="self-end">${p.price}</p>
      {/* {children} */}

      <div className=" mt-auto flex">
        {cart.some((value) => value.id == p.id) ? (
          <div className="flex w-full space-x-1">
            <Button
              variant="highlight"
              className="w-full"
              onClick={() => {
                removeFromCart(p);
              }}
            >
              <MinusIcon />
            </Button>
            <Button
              variant="highlight"
              className="w-full"
              onClick={() => {
                addToCart(p);
              }}
            >
              <PlusIcon />
            </Button>
          </div>
        ) : (
          <Button
            variant="highlight"
            className="w-full"
            onClick={() => {
              addToCart(p);
            }}
          >
            Buy
          </Button>
        )}
      </div>
    </div>
  );
}
