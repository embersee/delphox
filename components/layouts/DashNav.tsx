import Link from "next/link";
import { ThemeToggle } from "@/components/utils/ThemeToggle";

import { getUserAuth } from "@/lib/auth/utils";
import { Profile } from "../ui/profile";
import { Button } from "../ui/button";

export default async function DashNav() {
  const { session } = await getUserAuth();
  if (!session) return null;
  return (
    <nav className="nav mx-auto mt-4 flex max-w-7xl items-center justify-between p-2 ">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="link" className="text-xl decoration-from-font">
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
        <div className="flex items-center space-x-2">
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
