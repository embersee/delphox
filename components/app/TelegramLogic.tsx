"use client";
import { useEffect } from "react";

export default function TelegramLogic() {
  useEffect(() => {
    if (window == undefined) return;

    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
  }, []);
  return <></>;
}
