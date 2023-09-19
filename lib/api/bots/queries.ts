import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BotId, botIdSchema, bots } from "@/lib/db/schema/bots";

export const getBots = async () => {
  // const { session } = await getUserAuth();
  const b = await db.select().from(bots);
  // .where(eq(bots.userId, session?.user.id!));
  return { bots: b };
};

export const getBotById = async (id: BotId) => {
  const { session } = await getUserAuth();
  const { id: botId } = botIdSchema.parse({ id });
  const [b] = await db
    .select()
    .from(bots)
    .where(and(eq(bots.id, botId), eq(bots.userId, session?.user.id!)));
  return { bot: b };
};
