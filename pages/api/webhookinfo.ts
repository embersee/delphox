import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { Bot } from "grammy";
import { WebhookInfo } from "grammy/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = await req.query;

  console.log(message);

  if (message !== env.WEBHOOK_SECRET)
    return res.status(400).json({ message: "wrong secret" });

  const getInfo = async () => {
    console.info("Pulling telegram tokens for webhooks setup...\n");
    const tokens = await db.bot.findMany({
      select: {
        botToken: true,
      },
    });

    if (!tokens.length) return [];
    console.info("...Found tokens to find webhooks info...\n");

    const results = await Promise.all(
      tokens?.map(async (t) => {
        const bot = new Bot(t.botToken);

        // Checking the webhook installation
        const info = await bot.api.getWebhookInfo();

        return info;
      }),
    );
    console.info("Lookup complete!");
    return results;
  };

  const info: WebhookInfo[] = await getInfo();

  return res.status(200).json({ info });
}
