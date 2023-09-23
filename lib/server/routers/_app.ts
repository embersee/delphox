import { router } from "../trpc";
import { botsRouter } from "./bots";
import { commandsRouter } from "./commands";

export const appRouter = router({
  bots: botsRouter,
  commands: commandsRouter,
});

export type AppRouter = typeof appRouter;
