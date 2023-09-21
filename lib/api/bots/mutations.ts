import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  BotId,
  NewBotParams,
  UpdateBotParams,
  updateBotSchema,
  insertBotSchema,
  bots,
  botIdSchema,
} from "@/lib/db/schema/bots";
import { TRPCError } from "@trpc/server";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id: string;
  telegram_id: string;
  first_name: string;
  last_name: string;
  registered?: boolean | undefined;
}

export const createBot = async (bot: NewBotParams, user: User) => {
  const newBot = insertBotSchema.parse({ ...bot, userId: user.id });

  try {
    await db.insert(bots).values(newBot);
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
    await db
      .update(bots)
      .set(newBot)
      .where(and(eq(bots.id, botId!), eq(bots.userId, user.id)));
    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteBot = async (id: BotId, user: User) => {
  const { id: botId } = botIdSchema.parse({ id });
  try {
    await db
      .delete(bots)
      .where(and(eq(bots.id, botId!), eq(bots.userId, user.id)));
    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
