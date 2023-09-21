"use client";
import { CompleteBot } from "@/lib/db/schema/bots";
import { trpc } from "@/lib/trpc/client";
import BotModal from "./BotModal";
import Link from "next/link";
import { Button } from "../ui/button";
import { Activation } from "./ActivateBot";

export default function BotList({ bots }: { bots: CompleteBot[] }) {
  const { data: b } = trpc.bots.getBots.useQuery(undefined, {
    initialData: { bots },
    refetchOnMount: false,
  });

  if (b.bots.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="space-y-2">
      {b.bots.map((bot) => (
        <Bot bot={bot} key={bot.id} />
      ))}
    </ul>
  );
}

const Bot = ({ bot }: { bot: CompleteBot }) => {
  return (
    <li className="flex justify-between items-center p-2 rounded-md bg-secondary/30">
      <div className="w-full flex items-center space-x-4">
        <Button variant="secondary">{bot.displayName}</Button>

        <Link
          href={`https://t.me/${bot.username.substring(1)}`}
          className="flex text-sm"
          target="_blank"
        >
          {bot.username} 🔗
        </Link>
        <Button variant="secondary">
          Status: {bot.active ? "active" : "inactive"}
        </Button>
      </div>
      <div className="flex space-x-2">
        <Activation bot={bot} />
        <BotModal bot={bot} />
      </div>
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center page">
      <h3 className="mt-2 text-sm font-semibold">No bots</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new bot.
      </p>
      <div className="mt-6">
        <BotModal emptyState={true} />
      </div>
    </div>
  );
};
