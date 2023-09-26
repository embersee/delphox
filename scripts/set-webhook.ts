import { env } from "@/lib/env.mjs";
import { Bot } from "grammy";
import { getURL } from "vercel-grammy";

const { VERCEL_URL, WEBHOOK_SECRET } = env;

// List of allowed environments
const allowedEnvs = [
  "production",
  //  "preview"
];

// Exit in case of unsuitable environments
if (!allowedEnvs.includes(VERCEL_URL)) process.exit();

const setUp = async () => {
  const tokens = await db?.bot.findMany({
    select: {
      botToken: true,
    },
  });

  tokens?.forEach(async (t) => {
    // Webhook URL generation
    const url = getURL({ path: `api/bot/${t.botToken}` });

    // Webhook setup options
    const options = { secret_token: WEBHOOK_SECRET };

    const bot = new Bot(t.botToken);
    // Installing a webhook
    if (await bot.api.setWebhook(url, options)) {
      // Checking the webhook installation
      const { url } = await bot.api.getWebhookInfo();

      console.info("Webhook set to URL:", url);
      console.info("Secret token:", WEBHOOK_SECRET);
    }
  });
};

setUp();
