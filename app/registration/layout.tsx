import { getUser } from "@/lib/api/auth/queries";
import { checkAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  checkAuth();

  return <main>{children}</main>;
}
