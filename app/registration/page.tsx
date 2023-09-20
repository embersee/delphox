import { getUser } from "@/lib/api/auth/queries";

export default async function Registration() {
  const { user } = await getUser();
  return (
    <div>
      <h1>Registration</h1>
      <p>{"user: " + JSON.stringify(user)}</p>
    </div>
  );
}
