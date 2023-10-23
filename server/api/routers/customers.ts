import {
  customerIdSchema,
  insertCustomerParams,
  updateCustomerParams,
} from "@/server/schema/customer";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";

import { db } from "@/server/db";

export const customerRouter = createTRPCRouter({
  getCustomers: protectedProcedure.query(async ({ ctx: { session } }) => {
    const c = await db.customer.findMany({
      where: {
        BotCustomer: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    return { customers: c };
  }),

  getCustomerById: publicProcedure
    .input(customerIdSchema)
    .query(async ({ input: { telegramId } }) => {
      const c = await db.customer.findFirst({
        where: {
          telegramId,
        },
        include: {
          Cart: true,
          BotCustomer: true,
        },
      });

      return { customers: c };
    }),

  createCustomer: protectedProcedure
    .input(insertCustomerParams)
    .mutation(async ({ input: customer }) => {
      await db.customer.create({
        data: customer,
      });

      return { success: true };
    }),

  updateCustomer: protectedProcedure
    .input(updateCustomerParams)
    .mutation(async ({ input: customer }) => {
      await db.customer.update({
        data: customer,
        where: {
          telegramId: customer.telegramId,
        },
      });

      return { success: true };
    }),

  deleteCustomer: protectedProcedure
    .input(customerIdSchema)
    .mutation(async ({ input: { telegramId } }) => {
      await db.customer.delete({
        where: {
          telegramId,
        },
      });

      return { success: true };
    }),
});
