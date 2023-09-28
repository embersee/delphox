import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

export const getStore = async () => {
  const { session } = await getUserAuth();
  const s = await db.store.findMany({
    where: {
      Bot: {
        userId: session?.user.id,
      },
    },
  });

  return { store: s };
};

export const getStoreById = async (storeId: string) => {
  const s = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return { store: s };
};
