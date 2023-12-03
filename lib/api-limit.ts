import { auth } from "@clerk/nextjs";
import db from "./db";
import { UserApiLimit } from "@prisma/client";
const API_COUNT_LIMIT = 5;

export const updateApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return;

  const apiUserLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (apiUserLimit) {
    await db.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: apiUserLimit.count + 1,
      },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimt = async () => {
  const { userId } = auth();
  if (!userId) return false;

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userLimit || userLimit?.count < API_COUNT_LIMIT) return true;
  return false;
};

export const apiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) return 0;

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userLimit) return 0;

  return userLimit.count;
};
