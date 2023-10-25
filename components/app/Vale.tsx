"use client";

import {
  ValeContent,
  ValeDescription,
  ValeIcon,
  ValeRoot,
  ValeTitle,
} from "@/components/ui/vale";
import { useCartStore } from "@/store/cart";

import CartList from "./CartList";

export function AppVale() {
  const { open, setOpen, cart } = useCartStore();

  const cleanUp = () => {
    // setBotId(undefined);
  };

  return (
    <ValeRoot
      open={open}
      onOpenChange={(value) => setOpen(value)}
      onClose={() => cleanUp()}
    >
      <ValeContent>
        <ValeIcon />

        <div className="h-[calc(100vh-7rem)] overflow-y-auto">
          <div className=" mx-auto flex h-full max-w-2xl flex-col space-y-1 p-2 ">
            <div className="py-8">
              <ValeTitle className="flex items-center justify-between gap-2 ">
                Your Cart
              </ValeTitle>
              <ValeDescription className="text-muted-foreground">
                Here are the items you added to cart...
              </ValeDescription>
            </div>
            <CartList c={cart} />
          </div>
        </div>
      </ValeContent>
    </ValeRoot>
  );
}
