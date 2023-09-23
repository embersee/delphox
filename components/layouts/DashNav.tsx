import Link from "next/link";
import { ThemeToggle } from "@/components/utils/ThemeToggle";

import { getUserAuth } from "@/lib/auth/utils";
import { Profile } from "../ui/profile";
import { Button } from "../ui/button";

export default async function DashNav() {
  const { session } = await getUserAuth();
  if (!session) return null;
  return (
    <nav className="flex p-2 nav max-w-7xl mx-auto mt-4 justify-between items-center ">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="ghost" className="text-xl">
            Delphox
          </Button>
        </Link>
        <Link href="/dash">
          <Button variant="link">Dashboard</Button>
        </Link>

        <Link href="/dash/orders">
          <Button variant="link">Orders</Button>
        </Link>
        <Link href="/dash/customize">
          <Button variant="link">Customize</Button>
        </Link>
        <Link href="/dash/support">
          <Button variant="link">Support</Button>
        </Link>
      </div>
      {session?.user && (
        <div className="space-x-2 flex items-center">
          <Profile
            name={session.user.name as string}
            image={session.user.image as string}
          />

          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
