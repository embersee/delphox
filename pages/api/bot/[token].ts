import { Bot, webhookCallback } from "grammy";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { env } from "@/env.mjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const botToken = req.url?.split("/").pop(); // Получаем токен из URL

  if (!botToken) return res.status(400).send({ message: "no token recieved." });

  const secret = req.headers["x-telegram-bot-api-secret-token"]?.toString();

  if (secret !== env.WEBHOOK_SECRET)
    return res.status(400).send({ message: "wrong secret recieved." });

  const bot = new Bot(botToken);

  const commands = await db.command.findMany({
    where: {
      Bot: {
        botToken: botToken,
      },
    },
    select: {
      command: true,
      content: true,
    },
  });

  // const info = bot.botInfo;
  // console.log("info: ", info);

  const botUsername = (await bot.api.getMe()).username;

  commands.forEach((c) => {
    bot.command(c.command, async (ctx) => {
      await ctx.reply(c.content);

      console.info(`event: `, {
        using: c.command,
        from: ctx.update.message?.from.username,
        to: botUsername,
        token: botToken,
      });
    });
  });

  // Используем webhookCallback для обработки запроса
  return webhookCallback(
    bot,
    "next-js",
    "throw",
    undefined,
    env.WEBHOOK_SECRET,
  )(req, res);
};
