import DashNav from "@/components/layouts/DashNav";
import { checkAuth } from "@/lib/auth/utils";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <>
      <DashNav />
      <section className="m-4">{children}</section>
    </>
  );
}
