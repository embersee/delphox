import { getOrder, getOrderById } from "@/lib/api/orders/queries";

import {
  orderIdSchema,
  insertOrderParams,
  updateOrderParams,
} from "@/lib/db/schema/order";
import { commandIdSchema } from "@/lib/db/schema/command";

import { protectedProcedure, publicProcedure, router } from "../trpc";
import {
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/lib/api/orders/mutations";

export const orderRouter = router({
  getOrder: protectedProcedure.query(async () => {
    return getOrder();
  }),

  getOrderById: publicProcedure
    .input(orderIdSchema)
    .query(async ({ input }) => {
      return getOrderById(input.cartId);
    }),

  createOrder: protectedProcedure
    .input(insertOrderParams)
    .mutation(async ({ input }) => {
      return createOrder(input);
    }),

  updateOrder: protectedProcedure
    .input(updateOrderParams)
    .mutation(async ({ input }) => {
      return updateOrder(input.cartId, input);
    }),

  deleteOrder: protectedProcedure
    .input(commandIdSchema)
    .mutation(async ({ input }) => {
      return deleteOrder(input.id);
    }),
});
