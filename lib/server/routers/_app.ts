import { router } from "../trpc";
import { botsRouter } from "./bots";
import { categoryRouter } from "./categories";
import { commandsRouter } from "./commands";
import { productRouter } from "./products";
import { storeRouter } from "./stores";

export const appRouter = router({
  bots: botsRouter,
  commands: commandsRouter,
  stores: storeRouter,
  products: productRouter,
  categorys: categoryRouter,
});

export type AppRouter = typeof appRouter;
