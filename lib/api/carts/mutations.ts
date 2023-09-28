import { db } from "@/lib/db";

import {
  CartId,
  NewCartParams,
  UpdateCartParams,
  updateCartSchema,
  insertCartSchema,
  cartIdSchema,
} from "@/lib/db/schema/cart";

import { TRPCError } from "@trpc/server";

export const createCart = async (cart: NewCartParams) => {
  const newCart = insertCartSchema.parse({ ...cart });

  try {
    await db.cart.create({
      data: newCart,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateCart = async (id: CartId, cart: UpdateCartParams) => {
  const { customerTelegramId: telegramId } = cartIdSchema.parse({ id });
  const newCart = updateCartSchema.parse({ ...cart });
  try {
    await db.cart.update({
      data: newCart,
      where: {
        customerTelegramId: telegramId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteCart = async (id: CartId) => {
  const { customerTelegramId: telegramId } = cartIdSchema.parse({ id });
  try {
    await db.cart.delete({
      where: {
        customerTelegramId: telegramId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
