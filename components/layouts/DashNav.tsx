import Link from "next/link";
import { ThemeToggle } from "@/components/utils/ThemeToggle";
import SignOut from "@/components/auth/SignOut";

import { getUserAuth } from "@/lib/auth/utils";
import { Profile } from "../ui/profile";

export default async function DashNav() {
  const { session } = await getUserAuth();
  return (
    <nav className="flex h-16 justify-between items-center px-10">
      <Link href="/">delphox</Link>
      <Link href="/dash">Dash</Link>

      {session?.user ? (
        <div className="space-x-2 flex items-center">
          <Profile
            name={session.user.name as string}
            image={session.user.image as string}
          />
          <SignOut />
          <ThemeToggle />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
