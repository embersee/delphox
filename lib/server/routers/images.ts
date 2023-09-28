import {
  imageIdSchema,
  insertImageParams,
  updateImageParams,
} from "@/lib/db/schema/image";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getImage, getImageById } from "@/lib/api/images/queries";
import {
  createImage,
  updateImage,
  deleteImage,
} from "@/lib/api/images/mutations";

export const imageRouter = router({
  getImage: protectedProcedure.query(async () => {
    return getImage();
  }),

  getImageById: publicProcedure
    .input(imageIdSchema)
    .query(async ({ input }) => {
      return getImageById(input.id);
    }),

  createImage: protectedProcedure
    .input(insertImageParams)
    .mutation(async ({ input }) => {
      return createImage(input);
    }),

  updateImage: protectedProcedure
    .input(updateImageParams)
    .mutation(async ({ input }) => {
      return updateImage(input.id, input);
    }),

  deleteImage: protectedProcedure
    .input(imageIdSchema)
    .mutation(async ({ input }) => {
      return deleteImage(input.id);
    }),
});
