import { router } from "../trpc";
import { botsRouter } from "./bots";

export const appRouter = router({
  bots: botsRouter,
});

export type AppRouter = typeof appRouter;
