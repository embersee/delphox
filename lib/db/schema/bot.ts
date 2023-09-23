import { getBots, getBotsWithCommands } from "@/lib/api/bots/queries";
import { z } from "zod";

const botSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  displayName: z.string(),
  botToken: z.string(),
  active: z.boolean(),
  description: z.string(),
  shortDescription: z.string(),
  menuButton: z.string(),
});

export const insertBotSchema = botSchema.omit({ id: true });

export const insertBotParams = botSchema
  .extend({
    id: z.coerce.string(),
    username: z.string().min(5).max(32).startsWith("@"),
    botToken: z
      .string()
      .min(1)
      .regex(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/),
    displayName: z.string().optional().default(""),
    description: z.string().max(512).optional().default(""),
    shortDescription: z.string().max(120).optional().default(""),
    menuButton: z.string().optional().default(""),
    active: z.boolean().default(false),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBotSchema = botSchema
  .extend({
    id: z.coerce.string(),
    menuButton: z.string().optional().default(""),
    active: z.boolean().default(false),
  })
  .omit({
    userId: true,
  });

export const updateBotParams = updateBotSchema.extend({});
export const botIdSchema = updateBotSchema.pick({ id: true });

// Types for bot - used to type API request params and within Components
export type Bot = z.infer<typeof updateBotSchema>;
export type NewBot = z.infer<typeof botSchema>;
export type NewBotParams = z.infer<typeof insertBotParams>;
export type UpdateBotParams = z.infer<typeof updateBotParams>;
export type BotId = z.infer<typeof botIdSchema>["id"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteBot = Awaited<ReturnType<typeof getBots>>["bots"][number];
export type EmptyBot = Partial<
  Awaited<ReturnType<typeof getBots>>["bots"][number]
>;

export type CompleteBotWithCommands = Awaited<
  ReturnType<typeof getBotsWithCommands>
>["bots"][number];
