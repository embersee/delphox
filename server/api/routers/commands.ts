import { botIdSchema } from "@/server/schema/bot";
import {
  commandIdSchema,
  insertCommandParams,
  updateCommandParams,
} from "@/server/schema/command";

import { db } from "@/server/db";

import { protectedProcedure, createTRPCRouter } from "../trpc";

export const commandsRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  getCommands: protectedProcedure.query(async ({ ctx: { session } }) => {
    const c = await db.command.findMany({
      where: {
        Bot: {
          userId: session?.user.id,
        },
      },
      select: {
        command: true,
        content: true,
        botId: true,
      },
    });

    return { commands: c };
  }),

  getCommandById: protectedProcedure
    .input(commandIdSchema)
    .query(async ({ input: command }) => {
      const c = await db.command.findFirst({
        where: {
          id: command.id,
        },
      });

      return { commands: c };
    }),

  /*
   * MUTATIONS
   */

  createCommand: protectedProcedure
    .input(insertCommandParams)
    .mutation(async ({ input: command }) => {
      await db.command.create({
        data: command,
      });

      return { success: true };
    }),

  updateCommand: protectedProcedure
    .input(updateCommandParams)
    .mutation(async ({ input: command }) => {
      await db.command.update({
        data: command,
        where: {
          id: command.id,
        },
      });

      return { success: true };
    }),

  deleteCommand: protectedProcedure
    .input(commandIdSchema)
    .mutation(async ({ input: command }) => {
      await db.command.delete({
        where: {
          id: command.id,
        },
      });

      return { success: true };
    }),
});
