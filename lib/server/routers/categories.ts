import {
  categoryIdSchema,
  insertCategoryParams,
  updateCategoryParams,
} from "@/lib/db/schema/category";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import {
  getCategoryByBot,
  getCategoryById,
} from "@/lib/api/categories/queries";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api/categories/mutations";

export const categoryRouter = router({
  getCategoryByBot: protectedProcedure.query(async () => {
    return getCategoryByBot();
  }),

  getCategoryById: publicProcedure
    .input(categoryIdSchema)
    .query(async ({ input }) => {
      return getCategoryById(input.id);
    }),

  createCategory: protectedProcedure
    .input(insertCategoryParams)
    .mutation(async ({ input }) => {
      return createCategory(input);
    }),

  updateCategory: protectedProcedure
    .input(updateCategoryParams)
    .mutation(async ({ input }) => {
      return updateCategory(input.id, input);
    }),

  deleteCategory: protectedProcedure
    .input(categoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteCategory(input.id);
    }),
});
