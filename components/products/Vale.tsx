"use client";

import {
  ValeContent,
  ValeDescription,
  ValeIcon,
  ValeRoot,
  ValeTitle,
} from "@/components/ui/vale";
import { create } from "zustand";
import { BotId } from "@/server/schema/bot";
import StoreForm from "../store/StoreForm";
import ProductForm from "./ProductForm";
import { StoreId } from "@/server/schema/store";

type ValeStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  storeId?: StoreId;
  setStoreId: (storeId?: StoreId) => void;
};

export const useProductStore = create<ValeStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  storeId: undefined,
  setStoreId: (storeId?: StoreId) => set({ storeId }),
}));

export function ProductVale() {
  const { isOpen, setIsOpen, setStoreId, storeId } = useProductStore();

  const cleanUp = () => {
    setStoreId(undefined);
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
          <div className=" mx-auto flex h-full max-w-2xl flex-col space-y-1 ">
            <div className="py-8">
              <ValeTitle className="flex items-center justify-between gap-2 ">
                Create Product
              </ValeTitle>
              <ValeDescription className="text-muted-foreground">
                Description
              </ValeDescription>
            </div>
            <ProductForm storeId={storeId!} setIsOpen={setIsOpen} />
          </div>
        </div>
      </ValeContent>
    </ValeRoot>
  );
}
