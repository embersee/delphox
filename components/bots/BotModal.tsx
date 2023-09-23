"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BotForm from "./BotForm";
import { CompleteBot } from "@/lib/db/schema/bot";
import Link from "next/link";
import { Activation } from "./ActivateBot";
import { Badge } from "../ui/badge";

export default function BotModal({
  bot,
  emptyState,
}: {
  bot?: CompleteBot;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!bot?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Bot
          </Button>
        ) : (
          <Button
            variant={editing ? "ghost" : "outline"}
            size={editing ? "sm" : "icon"}
          >
            {editing ? "Edit" : "+"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="flex justify-between items-center">
            {editing ? "Edit" : "Create"} Bot
            <div className="flex items-center gap-2">
              {bot?.active ? (
                <Badge variant="outline" className=" h-8 border-green-300">
                  Bot: Active
                </Badge>
              ) : (
                <Badge variant="outline" className=" h-8 border-orange-300">
                  Bot: Inactive
                </Badge>
              )}
              {bot ? <Activation bot={bot} /> : null}
            </div>
          </DialogTitle>
          <DialogDescription>
            Please get the required information about your bot from{" "}
            <Link href="https://t.me/BotFather" target="_blank">
              @BotFather
            </Link>{" "}
            in the Telegram app.
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 pb-5">
          {/* <BotForm closeModal={closeModal} bot={bot} /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
