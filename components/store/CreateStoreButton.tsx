"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "./Vale";

export default function CreateStoreButton({ botId }: { botId: string }) {
  const { setIsOpen, setBotId } = useStore();

  const handleClick = () => {
    setBotId(botId);
    setIsOpen(true);
  };

  return (
    <Button
      variant="highlight"
      size="lg"
      className="mt-6"
      onClick={() => handleClick()}
    >
      <PlusCircleIcon className="mr-1  h-4" />
      <span>Create Store</span>
    </Button>
  );
}
