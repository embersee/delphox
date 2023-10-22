import {
  orderIdSchema,
  insertOrderParams,
  updateOrderParams,
} from "@/server/schema/order";

import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";
import { db } from "@/server/db";

export const orderRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getOrder: protectedProcedure.query(async ({ ctx: { session } }) => {
    const c = await db.order.findMany({
      where: {
        Bot: {
          userId: session.user.id,
        },
      },
    });

    return { orders: c };
  }),

  getOrderById: publicProcedure
    .input(orderIdSchema)
    .query(async ({ input: { cartId } }) => {
      const c = await db.order.findFirst({
        where: {
          cartId,
        },
        include: {
          Cart: true,
        },
      });

      return { orders: c };
    }),

  /*
   * MUTATIONS
   */

  createOrder: protectedProcedure
    .input(insertOrderParams)
    .mutation(async ({ input: order }) => {
      await db.order.create({
        data: order,
      });

      return { success: true };
    }),

  updateOrder: protectedProcedure
    .input(updateOrderParams)
    .mutation(async ({ input: order }) => {
      await db.order.update({
        data: order,
        where: {
          cartId: order.cartId,
        },
      });

      return { success: true };
    }),

  deleteOrder: protectedProcedure
    .input(orderIdSchema)
    .mutation(async ({ input: { cartId } }) => {
      await db.order.delete({
        where: {
          cartId,
        },
      });

      return { success: true };
    }),
});
