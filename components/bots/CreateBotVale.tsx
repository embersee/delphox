"use client";

import {
  ValeContent,
  ValeDescription,
  ValeIcon,
  ValeRoot,
  ValeTitle,
} from "@/components/ui/vale";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";
import { create } from "zustand";
import BotForm from "./BotForm";
import { CompleteBot } from "@/lib/db/schema/bot";
import { Badge } from "../ui/badge";
import { Activation } from "./ActivateBot";
import Link from "next/link";

type ValeStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bot?: CompleteBot;
  setBot: (bot?: CompleteBot) => void;
};

export const useValeStore = create<ValeStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  closeVale: () => set({ isOpen: false }),
  bot: undefined,
  setBot: (bot) => set({ bot }),
  // setIsOpen: (isOpen) => set((state) => ({ isOpen: !state.isOpen })),
}));

export function CreateProjectVale() {
  const { isOpen, setIsOpen, bot, setBot } = useValeStore();

  const editing = !!bot?.id;
  return (
    <ValeRoot
      open={isOpen}
      onOpenChange={(value) => setIsOpen(value)}
      onClose={() => setBot(undefined)}
    >
      <ValeContent>
        <ValeIcon />

        <div className="h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="container max-w-4xl space-y-1 ">
            <ValeTitle className="flex items-center justify-between gap-2">
              {editing ? "Edit" : "Create"} Bot
              <div>
                {bot?.active ? (
                  <Badge variant="outline" className=" h-8 border-green-300">
                    Status: Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className=" h-8 border-orange-300">
                    Status: Inactive
                  </Badge>
                )}
              </div>
            </ValeTitle>
            <ValeDescription className="text-muted-foreground">
              Please get the required information about your bot from{" "}
              <Link href="https://t.me/BotFather" target="_blank">
                @BotFather
              </Link>{" "}
              in the Telegram app.
            </ValeDescription>
            <BotForm setIsOpen={setIsOpen} bot={bot} />
          </div>
        </div>
      </ValeContent>
    </ValeRoot>
  );
}

interface CreateBotValeTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function CreateProjectValeTrigger({
  asChild,
  ...props
}: CreateBotValeTriggerProps) {
  const { setIsOpen, isOpen } = useValeStore();

  const Comp = asChild ? Slot : "button";

  return <Comp onClick={() => setIsOpen(!isOpen)} {...props} />;
}
