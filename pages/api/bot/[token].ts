import { Bot, webhookCallback } from "grammy";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const botToken = req.url?.split("/").pop(); // Получаем токен из URL

  if (!botToken) return res.send(400);

  const bot = new Bot(botToken);

  const commands = await db.command.findMany({
    where: {
      Bot: {
        botToken: botToken,
      },
    },
  });

  console.log(commands);

  const botUsername = (await bot.api.getMe()).username;

  // Проверяем токен в Redis

  commands?.forEach((c) => {
    bot.command(c.command, async (ctx) => {
      await ctx.reply(c.content);

      console.log({
        using: `${c.command}`,
        from: ctx.message?.from.username,
        to: botUsername,
        token: botToken,
      });
    });
  });

  // Используем webhookCallback для обработки запроса
  return webhookCallback(bot, "next-js")(req, res);
};
