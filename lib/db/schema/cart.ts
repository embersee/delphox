import { getCart } from "@/lib/api/carts/queries";
import { z } from "zod";
import { productSchema } from "./product";

export const cartSchema = z.object({
  customerTelegramId: z.string(),
  storeId: z.string(),
});

export const insertCartSchema = cartSchema.extend({});

export const insertCartParams = cartSchema.extend({
  products: z.array(productSchema.pick({ id: true })).optional(),
});

export const updateCartSchema = cartSchema.extend({
  // id: z.string(),
});

export const updateCartParams = updateCartSchema.extend({
  products: z.array(productSchema.pick({ id: true })),
});
export const cartIdSchema = updateCartSchema.pick({ customerTelegramId: true });

// Types for cart - used to type API request params and within Components
export type Cart = z.infer<typeof updateCartSchema>;
export type NewCart = z.infer<typeof cartSchema>;
export type NewCartParams = z.infer<typeof insertCartParams>;
export type UpdateCartParams = z.infer<typeof updateCartParams>;
export type CartId = z.infer<typeof cartIdSchema>["customerTelegramId"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteCart = Awaited<ReturnType<typeof getCart>>["carts"][number];

export type PartialCompleteCart = Partial<
  Awaited<ReturnType<typeof getCart>>
>["carts"];
