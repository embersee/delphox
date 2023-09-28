import {
  createCommand,
  updateCommand,
  deleteCommand,
} from "@/lib/api/commands/mutations";
import { getCommands, getCommandsById } from "@/lib/api/commands/queries";
import { botIdSchema } from "@/lib/db/schema/bot";
import {
  commandIdSchema,
  insertCommandParams,
  updateCommandParams,
} from "@/lib/db/schema/command";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const commandsRouter = router({
  getCommands: protectedProcedure.query(async () => {
    return getCommands();
  }),

  getCommandById: publicProcedure
    .input(botIdSchema)
    .query(async ({ input }) => {
      return getCommandsById(input.id);
    }),

  createCommand: protectedProcedure
    .input(insertCommandParams)
    .mutation(async ({ input }) => {
      return createCommand(input);
    }),

  updateCommand: protectedProcedure
    .input(updateCommandParams)
    .mutation(async ({ input }) => {
      return updateCommand(input.id, input);
    }),

  deleteCommand: protectedProcedure
    .input(commandIdSchema)
    .mutation(async ({ input }) => {
      return deleteCommand(input.id);
    }),
});
