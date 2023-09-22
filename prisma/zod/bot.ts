import * as z from "zod"
import { CompleteCommand, relatedCommandSchema, CompleteUser, relatedUserSchema } from "./index"

export const botSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  displayName: z.string(),
  botToken: z.string(),
  active: z.boolean(),
  description: z.string(),
  shortDescription: z.string(),
  menuButton: z.string(),
})

export interface CompleteBot extends z.infer<typeof botSchema> {
  command: CompleteCommand[]
  User: CompleteUser
}

/**
 * relatedBotSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBotSchema: z.ZodSchema<CompleteBot> = z.lazy(() => botSchema.extend({
  command: relatedCommandSchema.array(),
  User: relatedUserSchema,
}))
