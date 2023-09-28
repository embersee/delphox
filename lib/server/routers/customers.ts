import {
  customerIdSchema,
  insertCustomerParams,
  updateCustomerParams,
} from "@/lib/db/schema/customer";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getCustomer, getCustomerById } from "@/lib/api/customers/queries";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/lib/api/customers/mutations";

export const customerRouter = router({
  getCustomer: protectedProcedure.query(async () => {
    return getCustomer();
  }),

  getCustomerById: publicProcedure
    .input(customerIdSchema)
    .query(async ({ input }) => {
      return getCustomerById(input.telegramId);
    }),

  createCustomer: protectedProcedure
    .input(insertCustomerParams)
    .mutation(async ({ input }) => {
      return createCustomer(input);
    }),

  updateCustomer: protectedProcedure
    .input(updateCustomerParams)
    .mutation(async ({ input }) => {
      return updateCustomer(input.telegramId, input);
    }),

  deleteCustomer: protectedProcedure
    .input(customerIdSchema)
    .mutation(async ({ input }) => {
      return deleteCustomer(input.telegramId);
    }),
});
