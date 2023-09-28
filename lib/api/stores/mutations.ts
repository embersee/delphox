import { db } from "@/lib/db";

import {
  StoreId,
  NewStoreParams,
  UpdateStoreParams,
  updateStoreSchema,
  insertStoreSchema,
  storeIdSchema,
} from "@/lib/db/schema/store";

import { TRPCError } from "@trpc/server";

export const createStore = async (store: NewStoreParams) => {
  const newStore = insertStoreSchema.parse({ ...store });

  try {
    await db.store.create({
      data: newStore,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateStore = async (id: StoreId, bot: UpdateStoreParams) => {
  const { id: storeId } = storeIdSchema.parse({ id });
  const newStore = updateStoreSchema.parse({ ...bot });
  try {
    await db.store.update({
      data: newStore,
      where: {
        id: storeId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteStore = async (id: StoreId) => {
  const { id: storeId } = storeIdSchema.parse({ id });
  try {
    await db.store.delete({
      where: {
        id: storeId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
