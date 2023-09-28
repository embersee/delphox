"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useProductStore } from "./Vale";

export default function CreateProductButton({ storeId }: { storeId: string }) {
  const { setIsOpen, setStoreId } = useProductStore();

  const handleClick = () => {
    setStoreId(storeId);
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
      <span>Create Product</span>
    </Button>
  );
}
