import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { Bot } from "grammy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message } = await req.query;

  if (message !== env.WEBHOOK_SECRET)
    return res.status(400).json({ message: "wrong secret" });

  console.log("Secret was correct: ", message);

  const setUp = async () => {
    console.info("Pulling telegram tokens for webhooks setup...\n");
    const tokens = await db.bot.findMany({
      select: {
        botToken: true,
      },
    });

    if (!tokens.length)
      return res.status(400).json({ message: "wrong secret" });

    console.info("...Found tokens to attack to webhooks...\n");

    const results = await Promise.all(
      tokens?.map(async (t) => {
        // Webhook URL generation
        const url = `${env.NEXTAUTH_URL}/api/bot/${t.botToken}`;

        // Webhook setup options
        const options = { secret_token: env.WEBHOOK_SECRET };

        const bot = new Bot(t.botToken);

        // Installing a webhook
        await bot.api.setWebhook(url, options);

        // Checking the webhook installation
        const info = await bot.api.getWebhookInfo();

        console.info("Webhook set to URL:", url);
        console.info("Secret token:", env.WEBHOOK_SECRET);

        return info;
      }),
    );
    console.info("Setup complete!");

    return results;
  };

  const info = await setUp();

  res.status(200).json({ message: "setup complete!", info });
}
