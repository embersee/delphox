import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";

export const getUser = async () => {
  const { session } = await getUserAuth();

  const u = await db.user.findFirst({
    where: {
      id: session?.user.id!,
    },
  });

  return { user: u };
};
