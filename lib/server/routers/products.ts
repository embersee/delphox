import {
  productIdSchema,
  insertProductParams,
  updateProductParams,
} from "@/lib/db/schema/product";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getProduct, getProductById } from "@/lib/api/products/queries";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api/products/mutations";

export const productRouter = router({
  getProduct: protectedProcedure.query(async () => {
    return getProduct();
  }),

  getProductById: publicProcedure
    .input(productIdSchema)
    .query(async ({ input }) => {
      return getProductById(input.id);
    }),

  createProduct: protectedProcedure
    .input(insertProductParams)
    .mutation(async ({ input }) => {
      return createProduct(input);
    }),

  updateProduct: protectedProcedure
    .input(updateProductParams)
    .mutation(async ({ input }) => {
      return updateProduct(input.id, input);
    }),

  deleteProduct: protectedProcedure
    .input(productIdSchema)
    .mutation(async ({ input }) => {
      return deleteProduct(input.id);
    }),
});