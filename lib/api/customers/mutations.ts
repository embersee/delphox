import { db } from "@/lib/db";

import {
  CustomerId,
  NewCustomerParams,
  UpdateCustomerParams,
  updateCustomerSchema,
  insertCustomerSchema,
  customerIdSchema,
} from "@/lib/db/schema/customer";

import { TRPCError } from "@trpc/server";

export const createCustomer = async (customer: NewCustomerParams) => {
  const newCustomer = insertCustomerSchema.parse({ ...customer });

  try {
    await db.customer.create({
      data: newCustomer,
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const updateCustomer = async (
  id: CustomerId,
  bot: UpdateCustomerParams,
) => {
  const { telegramId: customerId } = customerIdSchema.parse({ id });
  const newCustomer = updateCustomerSchema.parse({ ...bot });
  try {
    await db.customer.update({
      data: newCustomer,
      where: {
        telegramId: customerId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};

export const deleteCustomer = async (id: CustomerId) => {
  const { telegramId: customerId } = customerIdSchema.parse({ id });
  try {
    await db.customer.delete({
      where: {
        telegramId: customerId,
      },
    });

    return { success: true };
  } catch (err) {
    const message = "Error, please try again";

    throw new TRPCError({ message, code: "BAD_REQUEST" });
  }
};
