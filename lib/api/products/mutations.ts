import { db } from "@/lib/db";
import {
  NewCategoryParams,
  insertCategorySchema,
} from "@/lib/db/schema/category";
import { NewImageParams, insertImageSchema } from "@/lib/db/schema/image";

import {
  ProductId,
  NewProductParams,
  UpdateProductParams,
  updateProductSchema,
  insertProductSchema,
  productIdSchema,
} from "@/lib/db/schema/product";

import { TRPCError } from "@trpc/server";

export const createProduct = async ({
  product,
  categories,
  images,
}: {
  product: NewProductParams;
  categories?: NewCategoryParams[];
  images?: NewImageParams[];
}) => {
  const newProduct = insertProductSchema.parse({ ...product });
  const NewCategory = insertCategorySchema.optional().parse({ ...categories });
  const newImage = insertImageSchema.optional().parse({ ...images });

  try {
    if (newImage && NewCategory)
      return await db.product.create({
        data: {
          ...newProduct,
          Images: {
            createMany: {
              data: newImage,
            },
          },
          Categories: {
            createMany: {
              data: NewCategory,
            },
          },
        },
        include: {
          Images: true,
          Categories: true,
        },
      });

    if (!newImage && NewCategory)
      return await db.product.create({
        data: {
          ...newProduct,

          Categories: {
            createMany: {
              data: NewCategory,
            },
          },
        },
        include: {
          Categories: true,
        },
      });

    if (newImage && !NewCategory)
      return await db.product.create({
        data: {
          ...newProduct,

          Images: {
            createMany: {
              data: newImage,
            },
          },
        },
        include: {
          Images: true,
        },
      });

    return await db.product.create({
      data: newProduct,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateProduct = async (
  id: ProductId,
  bot: UpdateProductParams,
) => {
  const { id: productId } = productIdSchema.parse({ id });
  const newProduct = updateProductSchema.parse({ ...bot });
  try {
    await db.product.update({
      data: newProduct,
      where: {
        id: productId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteProduct = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
