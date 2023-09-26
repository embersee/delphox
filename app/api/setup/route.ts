import { env } from "@/lib/env.mjs";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getURL } from "vercel-grammy";
import { Bot } from "grammy";

export async function POST(res: NextApiResponse, req: NextRequest) {
  const { message } = await req.json();

  console.log(message);

  if (message !== env.WEBHOOK_SECRET) return res.status(418);

  const setUp = async () => {
    console.info("Pulling telegram tokens for webhooks setup...\n");
    const tokens = await db.bot.findMany({
      select: {
        botToken: true,
      },
    });

    if (tokens.length) {
      console.info("...Found tokens to attack to webhooks...\n");
    }

    tokens?.forEach(async (t) => {
      // Webhook URL generation
      const url = getURL({ path: `api/bot/${t.botToken}` });

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

  setUp().then(() => res.status(200));
}
