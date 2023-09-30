import { getImage } from "@/lib/api/images/queries";
import { z } from "zod";

export const imageSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  priority: z.string().optional(),
});

export const insertImageSchema = imageSchema
  .extend({
    // productId: z.string(),
  })
  .omit({ id: true });

export const insertImageParams = imageSchema
  .extend({
    productId: z.string(),
  })
  .omit({ id: true });

export const updateImageSchema = imageSchema.extend({
  id: z.string().cuid(),
  productId: z.string(),
});

export const updateImageParams = updateImageSchema.extend({});
export const imageIdSchema = updateImageSchema.pick({ id: true });

// Types for image - used to type API request params and within Components
export type Image = z.infer<typeof updateImageSchema>;
export type NewImage = z.infer<typeof imageSchema>;
export type NewImageParams = z.infer<typeof insertImageParams>;
export type UpdateImageParams = z.infer<typeof updateImageParams>;
export type ImageId = z.infer<typeof imageIdSchema>["id"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteImage = Awaited<
  ReturnType<typeof getImage>
>["image"][number];

export type PartialCompleteImage = Partial<
  Awaited<ReturnType<typeof getImage>>
>["image"];
