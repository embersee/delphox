import { getBotById, getBots } from "@/lib/api/bots/queries";
import { publicProcedure, router } from "../trpc";
import {
  botIdSchema,
  insertBotParams,
  updateBotParams,
} from "@/lib/db/schema/bots";
import { createBot, deleteBot, updateBot } from "@/lib/api/bots/mutations";

export const botsRouter = router({
  getBots: publicProcedure.query(async () => {
    return getBots();
  }),
  getBotById: publicProcedure.input(botIdSchema).query(async ({ input }) => {
    return getBotById(input.id);
  }),
  createBot: publicProcedure
    .input(insertBotParams)
    .mutation(async ({ input }) => {
      return createBot(input);
    }),
  updateBot: publicProcedure
    .input(updateBotParams)
    .mutation(async ({ input }) => {
      return updateBot(input.id, input);
    }),
  deleteBot: publicProcedure
    .input(botIdSchema)
    .mutation(async ({ input }) => {
      return deleteBot(input.id);
    }),
});
