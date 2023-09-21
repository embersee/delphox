import DashNav from "@/components/layouts/DashNav";
import { getUser } from "@/lib/api/auth/queries";
import { checkAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  checkAuth();

  return (
    <>
      <DashNav />
      <main>{children}</main>
    </>
  );
}
