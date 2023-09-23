import { getCommands } from "@/lib/api/commands/queries";

import { z } from "zod";

export const commandSchema = z.object({
  id: z.string(),
  command: z.string(),
  content: z.string(),
  botId: z.string(),
});

export const insertCommandSchema = commandSchema
  .extend({ botId: z.string() })
  .omit({
    id: true,
  });

export const insertCommandParams = commandSchema
  .extend({
    command: z.string(),
    content: z.string(),
    botId: z.string(),
  })
  .omit({
    id: true,
  });

export const updateCommandSchema = commandSchema.extend({
  id: z.string().cuid(),
  botId: z.string().cuid(),
});

export const updateCommandParams = updateCommandSchema.extend({});
export const commandIdSchema = updateCommandSchema.pick({ id: true });

// Types for command - used to type API request params and within Components
export type Command = z.infer<typeof updateCommandSchema>;
export type NewCommand = z.infer<typeof commandSchema>;
export type NewCommandParams = z.infer<typeof insertCommandParams>;
export type UpdateCommandParams = z.infer<typeof updateCommandParams>;
export type CommandId = z.infer<typeof commandIdSchema>["id"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteCommand = Awaited<
  ReturnType<typeof getCommands>
>["commands"][number];

export type PartialCompleteCommand = Partial<
  Awaited<ReturnType<typeof getCommands>>
>["commands"];
