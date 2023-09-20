import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

export const getUser = async () => {
  const { session } = await getUserAuth();

  const u = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id!),
  });

  return { user: u };
};
