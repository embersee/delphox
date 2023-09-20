import { getUser } from "@/lib/api/auth/queries";
import { redirect } from "next/navigation";

export default async function Dash() {
  const { user } = await getUser();

  if (user && !user.registered) {
    redirect("/registration");
  }

  return (
    <div>
      <h1>Dash</h1>
      <p>{"user: " + JSON.stringify(user)}</p>
    </div>
  );
}
