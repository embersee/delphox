import { db } from "@/lib/db";
import {
  NewImageParams,
  insertImageSchema,
  ImageId,
  UpdateImageParams,
  imageIdSchema,
  updateImageSchema,
} from "@/lib/db/schema/image";

import { TRPCError } from "@trpc/server";

export const createImage = async (image: NewImageParams) => {
  const newImage = insertImageSchema.parse({ ...image });

  try {
    await db.image.create({
      data: newImage,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateImage = async (id: ImageId, bot: UpdateImageParams) => {
  const { id: imageId } = imageIdSchema.parse({ id });
  const newImage = updateImageSchema.parse({ ...bot });
  try {
    await db.image.update({
      data: newImage,
      where: {
        id: imageId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteImage = async (id: ImageId) => {
  const { id: imageId } = imageIdSchema.parse({ id });
  try {
    await db.image.delete({
      where: {
        id: imageId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
