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
import StoreForm from "./StoreForm";

type ValeStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  botId?: BotId;
  setBotId: (botId?: BotId) => void;
};

export const useStore = create<ValeStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  botId: undefined,
  setBotId: (botId?: BotId) => set({ botId }),
}));

export function StoreVale() {
  const { isOpen, setIsOpen, setBotId, botId } = useStore();

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
          <div className=" mx-auto flex h-full max-w-2xl flex-col space-y-1 ">
            <div className="py-8">
              <ValeTitle className="flex items-center justify-between gap-2 ">
                Create Store
              </ValeTitle>
              <ValeDescription className="text-muted-foreground">
                Description
              </ValeDescription>
            </div>
            <StoreForm botId={botId!} setIsOpen={setIsOpen} />
          </div>
        </div>
      </ValeContent>
    </ValeRoot>
  );
}
