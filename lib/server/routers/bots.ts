import {
  getBotById,
  getBots,
  getBotsWithCommands,
} from "@/lib/api/bots/queries";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import {
  botIdSchema,
  insertBotParams,
  updateBotParams,
} from "@/lib/db/schema/bot";
import { createBot, deleteBot, updateBot } from "@/lib/api/bots/mutations";

export const botsRouter = router({
  getBots: protectedProcedure.query(async () => {
    return getBots();
  }),
  getBotsWithCommands: protectedProcedure.query(async () => {
    return getBotsWithCommands();
  }),
  getBotById: publicProcedure.input(botIdSchema).query(async ({ input }) => {
    return getBotById(input.id);
  }),
  createBot: protectedProcedure
    .input(insertBotParams)
    .mutation(async ({ input, ctx }) => {
      return createBot(input, ctx.user);
    }),
  updateBot: protectedProcedure
    .input(updateBotParams)
    .mutation(async ({ input, ctx }) => {
      return updateBot(input.id, input, ctx.user);
    }),
  deleteBot: protectedProcedure
    .input(botIdSchema)
    .mutation(async ({ input, ctx }) => {
      return deleteBot(input.id, ctx.user);
    }),
});
