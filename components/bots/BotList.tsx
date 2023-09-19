"use client";
import { CompleteBot } from "@/lib/db/schema/bots";
import { trpc } from "@/lib/trpc/client";
import BotModal from "./BotModal";


export default function BotList({ bots }: { bots: CompleteBot[] }) {
  const { data: b } = trpc.bots.getBots.useQuery(undefined, {
    initialData: { bots },
    refetchOnMount: false,
  });

  if (b.bots.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bots.map((bot) => (
        <Bot bot={bot} key={bot.id} />
      ))}
    </ul>
  );
}

const Bot = ({ bot }: { bot: CompleteBot }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bot.username}</div>
      </div>
      <BotModal bot={bot} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No bots</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new bot.
      </p>
      <div className="mt-6">
        <BotModal emptyState={true} />
      </div>
    </div>
  );
};

