import { db } from "@/lib/db";
import {
  CategoryId,
  NewCategory,
  UpdateCategoryParams,
  categoryIdSchema,
  updateCategorySchema,
} from "@/lib/db/schema/category";

import { TRPCError } from "@trpc/server";

export const createCategory = async (category: NewCategory) => {
  try {
    await db.category.create({
      data: category,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateCategory = async (
  id: CategoryId,
  category: UpdateCategoryParams,
) => {
  const { id: categoryId } = categoryIdSchema.parse({ id });
  const newCategory = updateCategorySchema.parse({ ...category });
  try {
    await db.command.update({
      data: newCategory,
      where: {
        id: categoryId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteCategory = async (id: CategoryId) => {
  const { id: categoryId } = categoryIdSchema.parse({ id });
  try {
    await db.command.delete({
      where: {
        id: categoryId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
