import { z } from "zod";

export const storeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  botId: z.string(),
});

export const insertStoreSchema = storeSchema.extend({
  botId: z.string(),
});

export const insertStoreParams = storeSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  botId: z.string(),
});

export const updateStoreSchema = storeSchema.extend({
  id: z.string().cuid(),
  botId: z.string(),
});

export const updateStoreParams = updateStoreSchema.extend({});
export const storeIdSchema = updateStoreSchema.pick({ id: true });

// Types for store - used to type API request params and within Components
export type Store = z.infer<typeof updateStoreSchema>;
export type NewStore = z.infer<typeof storeSchema>;
export type NewStoreParams = z.infer<typeof insertStoreParams>;
export type UpdateStoreParams = z.infer<typeof updateStoreParams>;
export type StoreId = z.infer<typeof storeIdSchema>["id"];
