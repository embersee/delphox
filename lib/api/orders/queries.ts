import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { orderIdSchema } from "@/lib/db/schema/order";
import { OrderId } from "@/lib/db/schema/order";
import { CustomerId, customerIdSchema } from "@/lib/db/schema/customer";

export const getOrder = async () => {
  const { session } = await getUserAuth();
  const c = await db.order.findMany({
    where: {
      Bot: {
        userId: session?.user.id,
      },
    },
  });

  return { orders: c };
};

export const getOrderByCustomer = async (id: CustomerId) => {
  const { telegramId } = customerIdSchema.parse({ id });
  const c = await db.order.findMany({
    where: {
      Cart: {
        customerTelegramId: telegramId,
      },
    },
  });

  return { orders: c };
};

export const getOrderById = async (id: OrderId) => {
  const { cartId } = orderIdSchema.parse({ id });

  const c = await db.order.findFirst({
    where: {
      cartId,
    },
    include: {
      Cart: true,
    },
  });

  return { orders: c };
};
