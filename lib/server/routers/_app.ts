import { router } from "../trpc";
import { botsRouter } from "./bots";
import { categoryRouter } from "./categories";
import { commandsRouter } from "./commands";
import { customerRouter } from "./customers";
import { imageRouter } from "./images";
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
});

export type AppRouter = typeof appRouter;
