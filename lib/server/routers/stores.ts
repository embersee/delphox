import {
  storeIdSchema,
  insertStoreParams,
  updateStoreParams,
} from "@/lib/db/schema/store";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getStore, getStoreById } from "@/lib/api/stores/queries";
import {
  createStore,
  updateStore,
  deleteStore,
} from "@/lib/api/stores/mutations";

export const storeRouter = router({
  getStore: protectedProcedure.query(async () => {
    return getStore();
  }),

  getStoreById: publicProcedure
    .input(storeIdSchema)
    .query(async ({ input }) => {
      return getStoreById(input.id);
    }),

  createStore: protectedProcedure
    .input(insertStoreParams)
    .mutation(async ({ input }) => {
      return createStore(input);
    }),

  updateStore: protectedProcedure
    .input(updateStoreParams)
    .mutation(async ({ input }) => {
      return updateStore(input.id, input);
    }),

  deleteStore: protectedProcedure
    .input(storeIdSchema)
    .mutation(async ({ input }) => {
      return deleteStore(input.id);
    }),
});
