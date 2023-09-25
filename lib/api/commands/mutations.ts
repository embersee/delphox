import { db } from "@/lib/db";

import {
  CommandId,
  NewCommandParams,
  UpdateCommandParams,
  updateCommandSchema,
  insertCommandSchema,
  commandIdSchema,
} from "@/lib/db/schema/command";

import { TRPCError } from "@trpc/server";

export const createCommand = async (command: NewCommandParams) => {
  const newCommand = insertCommandSchema.parse({ ...command });

  try {
    await db.command.create({
      data: newCommand,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateCommand = async (
  id: CommandId,
  bot: UpdateCommandParams
) => {
  const { id: commandId } = commandIdSchema.parse({ id });
  const newCommand = updateCommandSchema.parse({ ...bot });
  try {
    await db.command.update({
      data: newCommand,
      where: {
        id: commandId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteCommand = async (id: CommandId) => {
  const { id: commandId } = commandIdSchema.parse({ id });
  try {
    await db.command.delete({
      where: {
        id: commandId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
