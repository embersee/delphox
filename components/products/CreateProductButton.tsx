"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useProductStore } from "./Vale";

export default function CreateProductButton({ botId }: { botId: string }) {
  const { setIsOpen, setBotId } = useProductStore();

  const handleClick = () => {
    setBotId(botId);
    setIsOpen(true);
  };

  return (
    <Button variant="highlight" size="lg" onClick={() => handleClick()}>
      <PlusCircleIcon className="mr-1 h-4" />
      <span>Create Product</span>
    </Button>
  );
}
