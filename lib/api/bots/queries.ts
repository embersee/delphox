import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { botIdSchema } from "@/lib/db/schema/bot";
import { BotId } from "@/lib/db/schema/bot";

export const getBots = async () => {
  const { session } = await getUserAuth();
  const b = await db.bot.findMany({
    where: {
      userId: session?.user.id!,
    },
  });

  return { bots: b };
};

export const getBotsWithCommands = async () => {
  const { session } = await getUserAuth();
  const b = await db.bot.findMany({
    where: {
      userId: session?.user.id!,
    },
    include: {
      command: true,
    },
  });

  return { bots: b };
};

export const getBotById = async (id: BotId) => {
  const { session } = await getUserAuth();
  const { id: botId } = botIdSchema.parse({ id });

  const b = await db.bot.findFirst({
    where: {
      id: botId,
      userId: session?.user.id!,
    },
  });

  return { bot: b };
};
