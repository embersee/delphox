"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BotSidebar({
  username,
  botId,
}: {
  username: string;
  botId: string;
}) {
  const router = useRouter();
  return (
    <section className="space-y-4">
      <Button
        variant="ghost"
        className="flex items-center space-x-1"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-3 w-3" />
        <span>Back</span>
      </Button>
      <div className="nav flex h-full w-56 flex-col space-y-4 p-4">
        <div>
          <h2>{username}</h2>
        </div>

        <Button>Orders</Button>
        <Button>Shop</Button>
        <Button>Items</Button>
        <Button>Links</Button>
        <Button>Commands</Button>
        <Button>Configuration</Button>
      </div>
    </section>
  );
}
