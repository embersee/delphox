import {
  varchar,
  text,
  int,
  serial,
  mysqlTable,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getBots } from "@/lib/api/bots/queries";

export const bots = mysqlTable(
  "bots",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 256 }).notNull(),
    botId: varchar("bot_id", { length: 256 }).notNull(),
    botToken: text("bot_token").notNull(),
    ownerId: int("owner_id").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (bots) => {
    return {
      botIdIndex: uniqueIndex("bot_id_idx").on(bots.botId),
    };
  }
);

// Schema for bots - used to validate API requests
export const insertBotSchema = createInsertSchema(bots);

export const insertBotParams = createSelectSchema(bots, {
  ownerId: z.coerce.number(),
}).omit({
  id: true,
  userId: true,
});

export const updateBotSchema = createSelectSchema(bots);

export const updateBotParams = createSelectSchema(bots, {
  ownerId: z.coerce.number(),
}).omit({
  userId: true,
});

export const botIdSchema = updateBotSchema.pick({ id: true });

// Types for bots - used to type API request params and within Components
export type Bot = z.infer<typeof updateBotSchema>;
export type NewBot = z.infer<typeof insertBotSchema>;
export type NewBotParams = z.infer<typeof insertBotParams>;
export type UpdateBotParams = z.infer<typeof updateBotParams>;
export type BotId = z.infer<typeof botIdSchema>["id"];

// this type infers the return from getBots() - meaning it will include any joins
export type CompleteBot = Awaited<ReturnType<typeof getBots>>["bots"][number];
