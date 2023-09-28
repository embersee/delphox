import { getProduct } from "@/lib/api/products/queries";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number(),
  discount: z.number().optional(),
  stock: z.number(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]),
  priority: z.number().optional(),
});

export const insertProductSchema = productSchema.extend({
  storeId: z.string(),
});

export const insertProductParams = productSchema.extend({
  storeId: z.string(),
});

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
