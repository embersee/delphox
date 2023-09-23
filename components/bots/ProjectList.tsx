"use client";

import { CompleteBot } from "@/lib/db/schema/bot";
import { trpc } from "@/lib/trpc/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

import Link from "next/link";
import { useValeStore } from "./CreateBotVale";

import { Settings2 } from "lucide-react";

export default function ProjectList({ bots }: { bots: CompleteBot[] }) {
  const { data: b } = trpc.bots.getBots.useQuery(undefined, {
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

const Bot = ({ bot }: { bot: CompleteBot }) => {
  const { setBot, setIsOpen } = useValeStore();

  const editBot = () => {
    setBot(bot);
    setIsOpen(true);
  };

  return (
    <li className="flex justify-between items-center p-2 rounded-md bg-secondary/30">
      <div className="w-full flex items-center justify-between space-x-4">
        <Link
          href={`https://t.me/${bot.username.substring(1)}`}
          className="flex text-sm"
          target="_blank"
        >
          <Button variant="secondary">{bot.displayName}</Button>{" "}
        </Link>

        {bot.active ? (
          <Badge variant="outline" className=" border-green-300">
            Active
          </Badge>
        ) : (
          <Badge variant="outline" className=" border-orange-300">
            Inactive
          </Badge>
        )}

        <Button variant="secondary" onClick={() => editBot()}>
          <span>Edit</span>
          <Settings2 className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </li>
  );
};
