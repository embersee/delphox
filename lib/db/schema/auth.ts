import {
  timestamp,
  mysqlTable,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/mysql-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { bots } from "./bots";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  telegram_id: varchar("telegram_id", { length: 255 }).notNull(),
  displayName: varchar("display_name", { length: 256 }),
  name: varchar("name", { length: 255 }),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).default(""),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

//👇 This code block will tell Drizzle that users & bots are related!
export const usersRelations = relations(users, ({ many }) => ({
  bots: many(bots),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type NewUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;
