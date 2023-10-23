import {
  storeIdSchema,
  insertStoreParams,
  updateStoreParams,
} from "@/server/schema/store";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";

import { db } from "@/server/db";

export const storeRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getStore: protectedProcedure.query(async ({ ctx: { session } }) => {
    const s = await db.store.findFirst({
      where: {
        Bot: {
          userId: session.user.id,
        },
      },
      include: {
        Products: true,
      },
    });

    return { store: s };
  }),

  getStoreById: publicProcedure
    .input(storeIdSchema)
    .query(async ({ input: store }) => {
      const s = await db.store.findFirst({
        where: {
          id: store.id,
        },
      });

      return { store: s };
    }),

  /*
   * MUTATIONS
   */

  createStore: protectedProcedure
    .input(insertStoreParams)
    .mutation(async ({ input: store }) => {
      await db.store.create({
        data: store,
      });

      return { success: true };
    }),

  updateStore: protectedProcedure
    .input(updateStoreParams)
    .mutation(async ({ input: store }) => {
      await db.store.update({
        data: store,
        where: {
          id: store.id,
        },
      });

      return { success: true };
    }),

  deleteStore: protectedProcedure
    .input(storeIdSchema)
    .mutation(async ({ input: store }) => {
      await db.store.delete({
        where: {
          id: store.id,
        },
      });

      return { success: true };
    }),
});
