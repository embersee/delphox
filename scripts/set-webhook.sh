#!/usr/bin/env bash

# Get script parent folder to point to .env file and get BOT_TOKEN dynamically
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )

# Get BOT_TOKEN dynamically from local .env file
BOT_TOKEN=$(grep BOT_TOKEN ${PARENT_PATH}/../.env | cut -d '=' -f2)
if test -z "${BOT_TOKEN}"
then
  echo "❌ ERROR: I haven't been able to recover BOT_TOKEN from your local .env variables file."
  exit 1
fi

# Get BOT_TOKEN dynamically from local .env file
VERCEL_URL=$(grep BOT_TOKEN ${PARENT_PATH}/../.env | cut -d '=' -f2)
if test -z "${VERCEL_URL}"
then
  echo "❌ ERROR: I haven't been able to recover VERCEL_URL from your local .env variables file."
  exit 1
fi

# Set our NGROK remote url to our development
curl -F "url=${VERCEL_URL}/api/bot/${BOT_TOKEN}/" https://api.telegram.org/bot${BOT_TOKEN}/setWebhook && echo "\nWebhook set! 🕸️🪝\n"