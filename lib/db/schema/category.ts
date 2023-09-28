import { getCategoryByBot } from "@/lib/api/categories/queries";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  productId: z.string().optional(),
  storeId: z.string().optional(),
});

export const insertCategorySchema = categorySchema
  .extend({
    storeId: z.string(),
  })
  .omit({ id: true });

export const insertCategoryParams = categorySchema
  .extend({
    name: z.string(),
    productId: z.string(),
    storeId: z.string(),
  })
  .omit({ id: true });

export const updateCategorySchema = categorySchema.extend({
  id: z.string().cuid(),
  // productId: z.string(),
  storeId: z.string(),
});

export const updateCategoryParams = updateCategorySchema.extend({});
export const categoryIdSchema = updateCategorySchema.pick({ id: true });

// Types for category - used to type API request params and within Components
export type Category = z.infer<typeof updateCategorySchema>;
export type NewCategory = z.infer<typeof categorySchema>;
export type NewCategoryParams = z.infer<typeof insertCategoryParams>;
export type UpdateCategoryParams = z.infer<typeof updateCategoryParams>;
export type CategoryId = z.infer<typeof categoryIdSchema>["id"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteCategory = Awaited<
  ReturnType<typeof getCategoryByBot>
>["category"][number];

export type PartialCompleteCategory = Partial<
  Awaited<ReturnType<typeof getCategoryByBot>>
>["category"];
