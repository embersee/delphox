"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CreateProjectValeTrigger } from "./Vale";

export default function CreateBotButton() {
  return (
    <CreateProjectValeTrigger asChild>
      <Button variant="highlight" size="lg">
        <PlusCircleIcon className="mr-1 h-4" />
        <span>Create Bot</span>
      </Button>
    </CreateProjectValeTrigger>
  );
}
