import { getUser } from "@/lib/api/auth/queries";
import { redirect } from "next/navigation";

export default async function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();

  if (!user) return redirect("/");

  if (user.registered) {
    redirect("/dash");
  }

  return <>{children}</>;
}
