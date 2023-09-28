import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

export const getProduct = async () => {
  const { session } = await getUserAuth();
  const p = await db.product.findMany({
    where: {
      Store: {
        Bot: {
          userId: session?.user.id,
        },
      },
    },
  });

  return { product: p };
};

export const getProductById = async (productId: string) => {
  const p = await db.product.findFirst({
    where: {
      id: productId,
    },
  });

  return { product: p };
};
