import {
  imageIdSchema,
  insertImageParams,
  updateImageParams,
} from "@/server/schema/image";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "../trpc";

import { db } from "@/server/db";

export const imageRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getImageById: publicProcedure
    .input(imageIdSchema)
    .query(async ({ input: image }) => {
      const i = await db.image.findFirst({
        where: {
          id: image.id,
        },
      });

      return { image: i };
    }),

  /*
   * MUTATIONS
   */

  updateImage: protectedProcedure
    .input(updateImageParams)
    .mutation(async ({ input: image }) => {
      await db.image.update({
        data: image,
        where: {
          id: image.id,
        },
      });

      return { success: true };
    }),

  deleteImage: protectedProcedure
    .input(imageIdSchema)
    .mutation(async ({ input: image }) => {
      await db.image.delete({
        where: {
          id: image.id,
        },
      });

      return { success: true };
    }),
});
