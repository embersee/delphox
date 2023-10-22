import { z } from "zod";
import { insertImageParams } from "./image";
import { insertCategoryParams } from "./category";
import { RouterOutputs } from "@/trpc/shared";
import { NonNullableFields } from "../types";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  price: z.coerce.number().min(100),
  discount: z.coerce.number().optional(),
  stock: z.coerce.number().min(1),
  status: z
    .enum(["ACTIVE", "INACTIVE", "ARCHIVED"])
    .optional()
    .default("INACTIVE"),
  priority: z.coerce.number().optional(),

  // Categories: z.array(categorySchema).optional(),
  // Images: z.array(imageSchema).optional(),
});

export const insertProductSchema = productSchema
  .extend({
    storeId: z.string().cuid(),
  })
  .omit({ id: true });

export const insertProductParams = productSchema
  .extend({
    storeId: z.string().cuid(),
  })
  .omit({ id: true });

export const updateProductSchema = productSchema.extend({
  id: z.string().cuid(),
  storeId: z.string(),
});

export const updateProductParams = updateProductSchema.extend({});
export const productIdSchema = updateProductSchema.pick({ id: true });

// Types for product - used to type API request params and within Components
export type Product = z.infer<typeof updateProductSchema>;
export type NewProduct = z.infer<typeof productSchema>;
export type NewProductParams = z.infer<typeof insertProductParams>;
export type UpdateProductParams = z.infer<typeof updateProductParams>;
export type ProductId = z.infer<typeof productIdSchema>["id"];

export const createProductSchema = z.object({
  product: insertProductParams,
  images: z.array(insertImageParams).optional(),
  categories: z.array(insertCategoryParams).optional(),
});

export type CreateNewProduct = z.infer<typeof createProductSchema>;
