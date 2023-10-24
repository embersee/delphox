
"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (

      <Button
        variant="ghost"
        className="flex items-center space-x-1"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-3 w-3" />
        <span>Back</span>
      </Button>


  );
}
