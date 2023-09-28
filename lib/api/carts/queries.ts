import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { cartIdSchema } from "@/lib/db/schema/cart";
import { CartId } from "@/lib/db/schema/cart";

export const getCart = async () => {
  const { session } = await getUserAuth();
  const c = await db.cart.findMany({
    where: {
      customerTelegramId: session?.user.id,
    },
  });

  return { carts: c };
};

export const getCartById = async (id: CartId) => {
  const { customerTelegramId: telegramId } = cartIdSchema.parse({ id });

  const c = await db.cart.findFirst({
    where: {
      customerTelegramId: telegramId,
    },
    include: {
      ProductsInCart: true,
    },
  });

  return { carts: c };
};
