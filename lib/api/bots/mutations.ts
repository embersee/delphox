import { db } from "@/lib/db";

import {
  BotId,
  NewBotParams,
  UpdateBotParams,
  updateBotSchema,
  insertBotSchema,
  botIdSchema,
} from "@/lib/db/schema/bot";

import { TRPCError } from "@trpc/server";

interface User {
  name?: string | null | undefined;
  image?: string | null | undefined;
  id: string;
  username: string;
}

export const createBot = async (bot: NewBotParams, user: User) => {
  const newBot = insertBotSchema.parse({ ...bot, userId: user.id });

  try {
    await db.bot.create({
      data: newBot,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateBot = async (
  id: BotId,
  bot: UpdateBotParams,
  user: User
) => {
  const { id: botId } = botIdSchema.parse({ id });
  const newBot = updateBotSchema.parse({ ...bot, userId: user.id });
  try {
    await db.bot.update({
      data: newBot,
      where: {
        id: botId,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteBot = async (id: BotId, user: User) => {
  const { id: botId } = botIdSchema.parse({ id });
  try {
    await db.bot.delete({
      where: {
        id: botId,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
