import { varchar, text, serial, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getBots } from "@/lib/api/bots/queries";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const bots = mysqlTable("bots", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  displayName: varchar("display_name", { length: 256 }),
  botToken: varchar("bot_token", { length: 256 }).notNull().unique(),
  userId: varchar("user_id", { length: 256 }),
});

//👇 This code block defines which columns in the two tables are related
export const botsRelations = relations(bots, ({ one }) => ({
  user: one(users, {
    fields: [bots.userId],
    references: [users.telegram_id],
  }),
}));

// Schema for bots - used to validate API requests
export const insertBotSchema = createInsertSchema(bots);

export const insertBotParams = createSelectSchema(bots, {
  id: z.coerce.number(),
}).omit({
  id: true,
  userId: true,
});

export const updateBotSchema = createSelectSchema(bots);

export const updateBotParams = createSelectSchema(bots, {
  id: z.coerce.number(),
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
