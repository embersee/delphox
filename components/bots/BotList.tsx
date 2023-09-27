"use client";

import { CompleteBot, CompleteBotWithCommands } from "@/lib/db/schema/bot";
import { trpc } from "@/lib/trpc/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

import Link from "next/link";
import { useValeStore } from "./Vale";

import { ArrowUpRightIcon, ChevronRightSquare, Settings2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function BotList({ bots }: { bots: CompleteBotWithCommands[] }) {
  const { data: b } = trpc.bots.getBotsWithCommands.useQuery(undefined, {
    initialData: { bots },
    refetchOnMount: false,
  });

  const [animationParent] = useAutoAnimate();

  return (
    <ul ref={animationParent} className="space-y-2">
      {b.bots.map((bot) => (
        <Bot bot={bot} key={bot.id} />
      ))}
    </ul>
  );
}

const Bot = ({ bot }: { bot: CompleteBotWithCommands }) => {
  const { setBot, setIsOpen, openCommands } = useValeStore();

  const editBot = () => {
    setBot(bot);
    setIsOpen(true);
  };

  const editCommands = () => {
    setBot(bot);
    setIsOpen(true);
    openCommands(true);
  };

  return (
    <li className="flex items-center justify-between rounded-md bg-secondary/30 p-2 pl-4 transition-colors hover:bg-secondary/60">
      <div className="flex w-full items-center justify-between space-x-4">
        <Link
          href={`/dash/bot/${bot.id}`}
          className="text-md group flex items-center font-medium capitalize hover:underline"
        >
          <span>{bot.displayName}</span>
          <ArrowUpRightIcon className="h-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>

        <div className="flex items-center space-x-4 self-end">
          {bot.active ? (
            <Badge variant="outline" className=" border-green-300">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className=" border-orange-300">
              Inactive
            </Badge>
          )}

          <Button
            variant="ghost"
            className="space-x-2"
            onClick={() => editCommands()}
          >
            <ChevronRightSquare className=" h-4 w-4" />
            <span>Commands</span>
            <span>{bot.Command.length > 0 && bot.Command.length}</span>
          </Button>
          <Button
            variant="ghost"
            className="space-x-2"
            onClick={() => editBot()}
          >
            <Settings2 className=" h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
      </div>
    </li>
  );
};
