import * as z from "zod"
import { CompleteBot, relatedBotSchema } from "./index"

export const commandSchema = z.object({
  id: z.string(),
  command: z.string(),
  content: z.string(),
  botId: z.string().nullish(),
})

export interface CompleteCommand extends z.infer<typeof commandSchema> {
  Bot?: CompleteBot | null
}

/**
 * relatedCommandSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommandSchema: z.ZodSchema<CompleteCommand> = z.lazy(() => commandSchema.extend({
  Bot: relatedBotSchema.nullish(),
}))
