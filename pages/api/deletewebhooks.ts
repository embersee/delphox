import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db";
import { Bot } from "grammy";
import { WebhookInfo } from "grammy/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = await req.body;

  console.log(message);

  if (message !== env.WEBHOOK_SECRET)
    return res.status(400).json({ message: "wrong secret" });

  const setUp = async () => {
    console.info("Pulling telegram tokens for webhooks setup...\n");
    const tokens = await db.bot.findMany({
      select: {
        botToken: true,
      },
    });

    if (!tokens.length) return res.status(418).json({ "I'm a": "teapot" });
    console.info("...Found tokens to find webhooks info...\n");

    tokens?.forEach(async (t) => {
      // Webhook URL generation
      const url = `${env.NEXTAUTH_URL}/api/bot/${t.botToken}`;

      // Webhook setup options
      // const options = { secret_token: env.WEBHOOK_SECRET };

      const bot = new Bot(t.botToken);

      // Checking the webhook installation
      const info = await bot.api.deleteWebhook();

      console.info("Webhook info:", JSON.stringify(info, null, 4));
    });
    console.info("Lookup complete!");
  };

  await setUp();

  res.status(200).json({ status: 200 });
}
