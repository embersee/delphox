import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/lib/env.mjs";

import * as auth from "@/lib/db/schema/auth";
import * as bots from "@/lib/db/schema/bots";

// create the connection
const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection, {
  schema: {
    ...auth,
    ...bots,
  },
});
