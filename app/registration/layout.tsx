import DashNav from "@/components/layouts/DashNav";
import { checkAuth } from "@/lib/auth/utils";

export default async function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <>
      <DashNav />
      <main>{children}</main>
    </>
  );
}
