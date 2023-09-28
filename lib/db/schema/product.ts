import { getProduct } from "@/lib/api/products/queries";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
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
    storeId: z.string(),
  })
  .omit({ id: true });

export const insertProductParams = productSchema
  .extend({
    storeId: z.string(),
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

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteProduct = Awaited<
  ReturnType<typeof getProduct>
>["product"][number];

export type PartialCompleteProduct = Partial<
  Awaited<ReturnType<typeof getProduct>>
>["product"];
