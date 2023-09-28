import { router } from "../trpc";
import { botsRouter } from "./bots";
import { cartRouter } from "./carts";
import { categoryRouter } from "./categories";
import { commandsRouter } from "./commands";
import { customerRouter } from "./customers";
import { imageRouter } from "./images";
import { orderRouter } from "./orders";
import { productRouter } from "./products";
import { storeRouter } from "./stores";

export const appRouter = router({
  bots: botsRouter,
  commands: commandsRouter,
  stores: storeRouter,
  products: productRouter,
  categories: categoryRouter,
  images: imageRouter,
  customers: customerRouter,
  carts: cartRouter,
  orders: orderRouter,
});

export type AppRouter = typeof appRouter;
