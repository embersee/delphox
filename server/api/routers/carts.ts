import {
  cartIdSchema,
  insertCartParams,
  updateCartParams,
} from "@/server/schema/cart";

import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";
import { db } from "@/server/db";

export const cartRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getCart: protectedProcedure.query(async ({ ctx: { session } }) => {
    const c = await db.cart.findMany({
      where: {
        customerTelegramId: session.user.id,
      },
    });

    return { carts: c };
  }),

  getCartById: publicProcedure
    .input(cartIdSchema)
    .query(async ({ input: { customerTelegramId: telegramId } }) => {
      const c = await db.cart.findFirst({
        where: {
          customerTelegramId: telegramId,
        },
        include: {
          ProductsInCart: true,
        },
      });

      return { carts: c };
    }),

  /*
   * MUTATIONS
   */

  createCart: protectedProcedure
    .input(insertCartParams)
    .mutation(async ({ input: cart }) => {
      await db.cart.create({
        data: cart,
      });

      return { success: true };
    }),

  updateCart: protectedProcedure
    .input(updateCartParams)
    .mutation(async ({ input: cart }) => {
      await db.cart.update({
        data: cart,
        where: {
          customerTelegramId: cart.customerTelegramId,
        },
      });

      return { success: true };
    }),

  deleteCart: protectedProcedure
    .input(cartIdSchema)
    .mutation(async ({ input: { customerTelegramId: telegramId } }) => {
      await db.cart.delete({
        where: {
          customerTelegramId: telegramId,
        },
      });

      return { success: true };
    }),
});
