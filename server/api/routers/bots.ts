import {
  botIdSchema,
  insertBotParams,
  updateBotParams,
} from "@/server/schema/bot";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const botsRouter = createTRPCRouter({
  /*
   * QUERIES
   */

  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello World!`,
    };
  }),

  getBot: protectedProcedure
    .input(botIdSchema)
    .query(async ({ input: bot, ctx: { session } }) => {
      const b = await db.bot.findFirst({
        where: {
          userId: session.user.id,
          id: bot.id,
        },
      });

      return { bot: b };
    }),

  getBots: protectedProcedure.query(async ({ ctx: { session } }) => {
    const b = await db.bot.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return { bots: b };
  }),

  getBotsWithCommands: protectedProcedure.query(
    async ({ ctx: { session } }) => {
      const b = await db.bot.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          Command: true,
        },
      });

      return { bots: b };
    },
  ),

  getBotById: protectedProcedure
    .input(botIdSchema)
    .query(async ({ input: { id }, ctx: { session } }) => {
      const b = await db.bot.findFirst({
        where: {
          id: id,
          userId: session.user.id,
        },
        include: {
          Store: {
            include: {
              Products: true,
            },
          },
        },
      });

      return { bot: b };
    }),

  getBotByIdWithCommands: protectedProcedure
    .input(botIdSchema)
    .query(async ({ input: { id }, ctx: { session } }) => {
      const b = await db.bot.findFirst({
        where: {
          id: id,
          userId: session.user.id,
        },
        include: {
          Command: true,
        },
      });

      return { bot: b };
    }),

  /*
   * MUTATIONS
   */

  createBot: protectedProcedure
    .input(insertBotParams)
    .mutation(async ({ input: bot, ctx: { session } }) => {
      await db.bot.create({
        data: { userId: session.user.id, ...bot },
      });

      return { success: true };
    }),

  updateBot: protectedProcedure
    .input(updateBotParams)
    .mutation(async ({ input: bot, ctx: { session } }) => {
      await db.bot.update({
        data: bot,
        where: {
          id: bot.id,
          userId: session.user.id,
        },
      });

      return { success: true };
    }),

  deleteBot: protectedProcedure
    .input(botIdSchema)
    .mutation(async ({ input: bot, ctx: { session } }) => {
      await db.bot.delete({
        where: {
          id: bot.id,
          userId: session.user.id,
        },
      });

      return { success: true };
    }),
});
