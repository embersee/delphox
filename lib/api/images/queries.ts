import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";

export const getImage = async () => {
  const { session } = await getUserAuth();
  const i = await db.image.findMany({
    where: {
      Product: {
        Store: {
          Bot: {
            userId: session?.user.id,
          },
        },
      },
    },
  });

  return { image: i };
};

export const getImageById = async (imageId: string) => {
  const i = await db.image.findFirst({
    where: {
      id: imageId,
    },
  });

  return { image: i };
};
