import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { commandIdSchema } from "@/lib/db/schema/command";
import { CommandId } from "@/lib/db/schema/command";

export const getCommands = async () => {
  const { session } = await getUserAuth();
  const c = await db.command.findMany({
    where: {
      Bot: {
        userId: session?.user.id,
      },
    },
  });

  return { commands: c };
};

export const getCommandsById = async (id: CommandId) => {
  const { id: commandId } = commandIdSchema.parse({ id });

  const c = await db.command.findFirst({
    where: {
      id: commandId,
    },
  });

  return { commands: c };
};
