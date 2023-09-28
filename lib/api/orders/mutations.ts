import { db } from "@/lib/db";

import {
  OrderId,
  NewOrderParams,
  UpdateOrderParams,
  updateOrderSchema,
  insertOrderSchema,
  orderIdSchema,
} from "@/lib/db/schema/order";

import { TRPCError } from "@trpc/server";

export const createOrder = async (order: NewOrderParams) => {
  const newOrder = insertOrderSchema.parse({ ...order });

  try {
    await db.order.create({
      data: newOrder,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateOrder = async (id: OrderId, order: UpdateOrderParams) => {
  const { cartId } = orderIdSchema.parse({ id });
  const newOrder = updateOrderSchema.parse({ ...order });
  try {
    await db.order.update({
      data: newOrder,
      where: {
        cartId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteOrder = async (id: OrderId) => {
  const { cartId } = orderIdSchema.parse({ id });
  try {
    await db.order.delete({
      where: {
        cartId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
