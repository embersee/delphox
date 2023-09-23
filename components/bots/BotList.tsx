"use client";

import { CompleteBot, CompleteBotWithCommands } from "@/lib/db/schema/bot";
import { trpc } from "@/lib/trpc/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

import Link from "next/link";
import { useValeStore } from "./CreateBotVale";

import { ArrowUpRightIcon, ChevronRightSquare, Settings2 } from "lucide-react";

export default function BotList({ bots }: { bots: CompleteBotWithCommands[] }) {
  const { data: b } = trpc.bots.getBotsWithCommands.useQuery(undefined, {
    initialData: { bots },
    refetchOnMount: false,
  });

  return (
    <ul className="space-y-2">
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
    <li className="flex justify-between items-center p-2 pl-4 rounded-md bg-secondary/30 hover:bg-secondary/60 transition-colors">
      <div className="w-full flex items-center justify-between space-x-4">
        <Link
          href={`https://t.me/${bot.username.substring(1)}`}
          className="flex text-md font-medium items-center hover:underline group capitalize"
          target="_blank"
        >
          <span>{bot.displayName}</span>
          <ArrowUpRightIcon className="h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <div className="space-x-4 self-end flex items-center">
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
            variant="secondary"
            className="space-x-2"
            onClick={() => editCommands()}
          >
            <ChevronRightSquare className=" h-4 w-4" />
            <span>Commands</span>
          </Button>
          <Button
            variant="secondary"
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
