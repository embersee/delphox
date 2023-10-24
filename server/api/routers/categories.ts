import {
  categoryIdSchema,
  insertCategoryParams,
  updateCategoryParams,
} from "@/server/schema/category";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import { db } from "@/server/db";

export const categoryRouter = createTRPCRouter({
  /*
   * QUERIES
   */
  getCategoryByBot: protectedProcedure.query(async ({ ctx: { session } }) => {
    const c = await db.category.findMany({
      where: {
        Bot: {
          userId: session?.user.id,
        },
      },
    });

    return { category: c };
  }),

  getCategoryById: protectedProcedure
    .input(categoryIdSchema)
    .query(async ({ input: category }) => {
      const c = await db.command.findFirst({
        where: {
          id: category.id,
        },
      });

      return { category: c };
    }),

  /*
   * MUTATIONS
   */

  createCategory: protectedProcedure
    .input(insertCategoryParams)
    .mutation(async ({ input: category }) => {
      await db.category.create({
        data: category,
      });

      return { success: true };
    }),

  updateCategory: protectedProcedure
    .input(updateCategoryParams)
    .mutation(async ({ input: category }) => {
      await db.command.update({
        data: category,
        where: {
          id: category.id,
        },
      });

      return { success: true };
    }),

  deleteCategory: protectedProcedure
    .input(categoryIdSchema)
    .mutation(async ({ input: category }) => {
      await db.command.delete({
        where: {
          id: category.id,
        },
      });

      return { success: true };
    }),
});
