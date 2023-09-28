import { getCustomer } from "@/lib/api/customers/queries";
import { z } from "zod";

export const customerSchema = z.object({
  telegramId: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  // BotCustomer: z.array(botSchema),
});

export const insertCustomerSchema = customerSchema.extend({
  botId: z.string(),
});

export const insertCustomerParams = customerSchema.extend({
  botId: z.string(),
});

export const updateCustomerSchema = customerSchema.extend({
  botId: z.string(),
});

export const updateCustomerParams = updateCustomerSchema.extend({});
export const customerIdSchema = updateCustomerSchema.pick({ telegramId: true });

// Types for customer - used to type API request params and within Components
export type Customer = z.infer<typeof updateCustomerSchema>;
export type NewCustomer = z.infer<typeof customerSchema>;
export type NewCustomerParams = z.infer<typeof insertCustomerParams>;
export type UpdateCustomerParams = z.infer<typeof updateCustomerParams>;
export type CustomerId = z.infer<typeof customerIdSchema>["telegramId"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteCustomer = Awaited<
  ReturnType<typeof getCustomer>
>["customers"][number];

export type PartialCompleteCustomer = Partial<
  Awaited<ReturnType<typeof getCustomer>>
>["customers"];
