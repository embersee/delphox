import {
  productIdSchema,
  createProductSchema,
  updateProductParams,
} from "@/server/schema/product";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";

import { db } from "@/server/db";

export const productRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getProduct: protectedProcedure.query(async ({ ctx: { session } }) => {
    const p = await db.product.findMany({
      where: {
        Bot: {
          userId: session?.user.id,
        },
      },
      include: {
        Categories: true,
      },
    });

    return { product: p };
  }),

  getProductById: publicProcedure
    .input(productIdSchema)
    .query(async ({ input: product }) => {
      const p = await db.product.findFirst({
        where: {
          id: product.id,
        },
      });

      return { product: p };
    }),

  /*
   * MUTATIONS
   */

  createProduct: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ input }) => {
      const { product, images, categories } = input;

      if (images && categories) {
        await db.product.create({
          data: {
            ...product,
            Images: {
              createMany: {
                data: images,
              },
            },
            Categories: {
              createMany: {
                data: categories,
              },
            },
          },
          include: {
            Images: true,
            Categories: true,
          },
        });
        return { success: true };
      }

      if (!images && categories) {
        await db.product.create({
          data: {
            ...product,

            Categories: {
              createMany: {
                data: categories,
              },
            },
          },
          include: {
            Categories: true,
          },
        });
        return { success: true };
      }
      if (images && !categories) {
        await db.product.create({
          data: {
            ...product,

            Images: {
              createMany: {
                data: images,
              },
            },
          },
          include: {
            Images: true,
          },
        });
        return { success: true };
      }
      await db.product.create({
        data: product,
      });

      return { success: true };
    }),

  updateProduct: protectedProcedure
    .input(updateProductParams)
    .mutation(async ({ input: product }) => {
      await db.product.update({
        data: product,
        where: {
          id: product.id,
        },
      });

      return { success: true };
    }),

  deleteProduct: protectedProcedure
    .input(productIdSchema)
    .mutation(async ({ input: product }) => {
      await db.product.delete({
        where: {
          id: product.id,
        },
      });

      return { success: true };
    }),
});
