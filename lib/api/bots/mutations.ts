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
import { getUserAuth } from "@/lib/auth/utils";
import { TRPCError } from "@trpc/server";

export const createBot = async (bot: NewBotParams) => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({ message: "Please log in.", code: "UNAUTHORIZED" });
  }

  const newBot = insertBotSchema.parse({ ...bot, userId: session?.user.id! });

  try {
    await db.insert(bots).values(newBot);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateBot = async (id: BotId, bot: UpdateBotParams) => {
  const { session } = await getUserAuth();
  const { id: botId } = botIdSchema.parse({ id });
  const newBot = updateBotSchema.parse({ ...bot, userId: session?.user.id! });
  try {
    await db
      .update(bots)
      .set(newBot)
      .where(and(eq(bots.id, botId!), eq(bots.userId, session?.user.id!)));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteBot = async (id: BotId) => {
  const { session } = await getUserAuth();
  const { id: botId } = botIdSchema.parse({ id });
  try {
    await db
      .delete(bots)
      .where(and(eq(bots.id, botId!), eq(bots.userId, session?.user.id!)));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
