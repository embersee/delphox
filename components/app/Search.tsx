"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export default function Search() {
  return (
    <>
      <Input className=" backdrop-blur-[1px]" />
      <SearchIcon className="h-8" />
    </>
  );
}
