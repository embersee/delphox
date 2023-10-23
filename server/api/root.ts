import { createTRPCRouter } from "@/server/api/trpc";
import { botsRouter } from "./routers/bots";
import { cartRouter } from "./routers/carts";
import { categoryRouter } from "./routers/categories";
import { commandsRouter } from "./routers/commands";
import { customerRouter } from "./routers/customers";
import { imageRouter } from "./routers/images";
import { orderRouter } from "./routers/orders";
import { productRouter } from "./routers/products";
import { storeRouter } from "./routers/stores";
import { helloRouter } from "./routers/hello";

export const appRouter = createTRPCRouter({
  bots: botsRouter,
  commands: commandsRouter,
  stores: storeRouter,
  products: productRouter,
  categories: categoryRouter,
  images: imageRouter,
  customers: customerRouter,
  carts: cartRouter,
  orders: orderRouter,
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
