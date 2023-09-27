import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db";
import { Bot } from "grammy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = await req.body;

  console.log(message);

  if (message !== env.WEBHOOK_SECRET)
    return res.status(418).json({ "I'm a": "teapot" });

  const setUp = async () => {
    console.info("Pulling telegram tokens for webhooks setup...\n");
    const tokens = await db.bot.findMany({
      select: {
        botToken: true,
      },
    });

    if (!tokens.length) return res.status(418).json({ "I'm a": "teapot" });
    console.info("...Found tokens to attack to webhooks...\n");

    tokens?.forEach(async (t) => {
      // Webhook URL generation
      const url = `${env.VERCEL_URL}/api/bot/${t.botToken}`;

      // Webhook setup options
      const options = { secret_token: env.WEBHOOK_SECRET };

      const bot = new Bot(t.botToken);
      // Installing a webhook
      if (await bot.api.setWebhook(url, options)) {
        // Checking the webhook installation
        const { url } = await bot.api.getWebhookInfo();

        console.info("Webhook set to URL:", url);
        console.info("Secret token:", env.WEBHOOK_SECRET);
      }
    });
    console.info("Setup complete!");
  };

  setUp();

  res.status(200).json({ status: "200" });
}
