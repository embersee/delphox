"use client";

import {
  ValeContent,
  ValeDescription,
  ValeIcon,
  ValeRoot,
  ValeTitle,
} from "@/components/ui/vale";
import { create } from "zustand";

import ProductForm from "./ProductForm";

import { BotId } from "@/server/schema/bot";

type ValeStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  botId?: BotId;
  setBotId: (botId?: BotId) => void;
};

export const useProductStore = create<ValeStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  botId: undefined,
  setBotId: (botId?: BotId) => set({ botId }),
}));

export function ProductVale() {
  const { isOpen, setIsOpen, setBotId, botId } = useProductStore();

  const cleanUp = () => {
    setBotId(undefined);
  };

  return (
    <ValeRoot
      open={isOpen}
      onOpenChange={(value) => setIsOpen(value)}
      onClose={() => cleanUp()}
    >
      <ValeContent>
        <ValeIcon />

        <div className="h-[calc(100vh-7rem)] overflow-y-auto">
          <div className=" mx-auto flex h-full max-w-2xl flex-col space-y-1 p-2 ">
            <div className="py-8">
              <ValeTitle className="flex items-center justify-between gap-2 ">
                Create Product
              </ValeTitle>
              <ValeDescription className="text-muted-foreground">
                Description
              </ValeDescription>
            </div>
            <ProductForm botId={botId!} setIsOpen={setIsOpen} />
          </div>
        </div>
      </ValeContent>
    </ValeRoot>
  );
}
