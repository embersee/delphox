import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { customerIdSchema } from "@/lib/db/schema/customer";
import { CustomerId } from "@/lib/db/schema/customer";

export const getCustomer = async () => {
  const { session } = await getUserAuth();
  const c = await db.customer.findMany({
    where: {
      BotCustomer: {
        some: {
          userId: session?.user.id,
        },
      },
    },
  });

  return { customers: c };
};

export const getCustomerById = async (id: CustomerId) => {
  const { telegramId } = customerIdSchema.parse({ id });

  const c = await db.customer.findFirst({
    where: {
      telegramId,
    },
    include: {
      Cart: true,
      BotCustomer: true,
    },
  });

  return { customers: c };
};
