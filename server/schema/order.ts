import { z } from "zod";

export const orderSchema = z.object({
  comment: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  phonenumber: z.string().optional(),
  totalSum: z.number(),
  orderStatus: z.enum([
    "CREATED",
    "FAILED",
    "CANCELLED",
    "SUCCESSFUL",
    "DELIVERY",
    "COMPLETE",
  ]),
  paymentType: z.enum(["TELEGRAM", "SUPPORT", "IRL"]),
  paymentStatus: z.enum(["INCOMPLETE", "FAILED", "COMPLETE", "REFUNDED"]),
  cartId: z.string(),
  botId: z.string(),
});

export const insertOrderSchema = orderSchema.extend({});

export const insertOrderParams = orderSchema.extend({});

export const updateOrderSchema = orderSchema.extend({
  // id: z.string(),
});

export const updateOrderParams = updateOrderSchema.extend({});
export const orderIdSchema = updateOrderSchema.pick({ cartId: true });

// Types for order - used to type API request params and within Components
export type Order = z.infer<typeof updateOrderSchema>;
export type NewOrder = z.infer<typeof orderSchema>;
export type NewOrderParams = z.infer<typeof insertOrderParams>;
export type UpdateOrderParams = z.infer<typeof updateOrderParams>;
export type OrderId = z.infer<typeof orderIdSchema>["cartId"];
