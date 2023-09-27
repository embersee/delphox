"use client";

import Link from "next/link";
import { ThemeToggle } from "../utils/ThemeToggle";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <nav className="flex h-16 items-center justify-between px-10">
      <Link href="/">
        <Button variant="ghost" className="text-xl">
          Delphox
        </Button>
      </Link>

      <ThemeToggle />
    </nav>
  );
}
