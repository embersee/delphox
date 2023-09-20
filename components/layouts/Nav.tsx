"use client";

import Link from "next/link";
import { ThemeToggle } from "../utils/ThemeToggle";

export default function Nav() {
  return (
    <nav className="flex h-16 justify-between items-center px-10">
      <Link href="/">delphox</Link>

      <ThemeToggle />
    </nav>
  );
}
