import { createCart, updateCart, deleteCart } from "@/lib/api/carts/mutations";
import { getCart, getCartById } from "@/lib/api/carts/queries";
import {
  cartIdSchema,
  insertCartParams,
  updateCartParams,
} from "@/lib/db/schema/cart";
import { commandIdSchema } from "@/lib/db/schema/command";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const cartRouter = router({
  getCart: protectedProcedure.query(async () => {
    return getCart();
  }),

  getCartById: publicProcedure.input(cartIdSchema).query(async ({ input }) => {
    return getCartById(input.customerTelegramId);
  }),

  createCart: protectedProcedure
    .input(insertCartParams)
    .mutation(async ({ input }) => {
      return createCart(input);
    }),

  updateCart: protectedProcedure
    .input(updateCartParams)
    .mutation(async ({ input }) => {
      return updateCart(input.customerTelegramId, input);
    }),

  deleteCart: protectedProcedure
    .input(commandIdSchema)
    .mutation(async ({ input }) => {
      return deleteCart(input.id);
    }),
});
