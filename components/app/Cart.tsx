"use client";

import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import { useShowPopup } from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";

export default function Cart() {
  const { setOpen, totalItems } = useCartStore();
  const showPopup = useShowPopup();

  useEffect(() => {
    if (window == undefined) return;
    if (totalItems > 0) {
      Telegram.WebApp.MainButton.setText("Purchase");
      Telegram.WebApp.MainButton.show();
    } else {
      Telegram.WebApp.MainButton.hide();
    }
  }, [totalItems]);

  const handleClick = () => {
    if (!totalItems) {
      showPopup({
        title: "Oops! 😭",
        message: "Your cart is empty!",
        buttons: [{ type: "ok" }],
      });
      return;
    }

    setOpen(true);
  };

  return (
    <Button onClick={handleClick} className=" space-x-2">
      {totalItems > 0 && <span>{totalItems}</span>}
      <ShoppingBasket />
    </Button>
  );
}
