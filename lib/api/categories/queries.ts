import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

export const getCategoryByStore = async (storeId: string) => {
  const c = await db.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  return { category: c };
};

export const getCategoryByBot = async () => {
  const { session } = await getUserAuth();
  const c = await db.category.findMany({
    where: {
      Store: {
        Bot: {
          userId: session?.user.id,
        },
      },
    },
  });

  return { category: c };
};

export const getCategoryById = async (categoryId: string) => {
  const c = await db.command.findFirst({
    where: {
      id: categoryId,
    },
  });

  return { category: c };
};
