import { db } from "@/lib/db";

import {
  ProductId,
  NewProductParams,
  UpdateProductParams,
  updateProductSchema,
  insertProductSchema,
  productIdSchema,
} from "@/lib/db/schema/product";

import { TRPCError } from "@trpc/server";

export const createProduct = async (product: NewProductParams) => {
  const newProduct = insertProductSchema.parse({ ...product });

  try {
    await db.product.create({
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
