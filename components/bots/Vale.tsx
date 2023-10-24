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

import { Badge } from "../ui/badge";
import Link from "next/link";
import CommandForm from "./CommandForm";

import { CompleteBotWithCommands } from "@/server/schema/bot";

type ValeStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  commands: boolean;
  openCommands: (commands: boolean) => void;

  bot?: CompleteBotWithCommands["bot"];
  setBot: (bot?: CompleteBotWithCommands["bot"]) => void;
};

export const useValeStore = create<ValeStore>()((set) => ({
  isOpen: false,

  setIsOpen: (isOpen) => set({ isOpen }),
  commands: false,
  openCommands: (commands) => set({ commands: commands }),
  closeVale: () => set({ isOpen: false }),
  bot: undefined,
  setBot: (bot) => set({ bot }),
}));

export function CreateProjectVale() {
  const { isOpen, setIsOpen, bot, setBot, commands, openCommands } =
    useValeStore();

  const editing = !!bot?.id;

  const existingCommands = bot?.Command;

  const cleanUp = () => {
    setBot(undefined), openCommands(false);
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
                {editing ? "Edit" : "Create"} {commands ? "Commands" : "Bot"}
                <div>
                  {bot ? (
                    bot?.active ? (
                      <Badge variant="outline" className=" border-green-300">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className=" border-orange-300">
                        Inactive
                      </Badge>
                    )
                  ) : null}
                </div>
              </ValeTitle>
              <ValeDescription className="text-muted-foreground">
                {commands ? (
                  <>
                    Configure the commands your bot will emit whenever users
                    interact with it.
                  </>
                ) : (
                  <>
                    Please get the required information about your bot from{" "}
                    <Link href="https://t.me/BotFather" target="_blank">
                      @BotFather
                    </Link>{" "}
                    in the Telegram app.
                  </>
                )}
              </ValeDescription>
            </div>
            {commands ? (
              <CommandForm
                setIsOpen={setIsOpen}
                commands={existingCommands ?? []}
                botId={bot?.id!}
              />
            ) : (
              <BotForm setIsOpen={setIsOpen} bot={bot!} />
            )}
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
