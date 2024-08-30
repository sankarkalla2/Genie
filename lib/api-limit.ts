import { auth, currentUser, EmailAddress } from "@clerk/nextjs/server";
import db from "./db";
import { UserApiLimit } from "@prisma/client";
const API_COUNT_LIMIT = 5;

export const updateApiLimit = async () => {
  const user = await currentUser();

  console.log(user?.emailAddresses[0].emailAddress);
  if (!user?.emailAddresses[0].emailAddress) return;

  const apiUserLimit = await db.userApiLimit.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (apiUserLimit) {
    await db.userApiLimit.update({
      where: {
        email: user?.emailAddresses[0].emailAddress,
      },
      data: {
        count: apiUserLimit.count + 1,
      },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        email: user?.emailAddresses[0].emailAddress,
        count: 1,
      },
    });
  }
};

export const checkApiLimt = async () => {
  const user = await currentUser();
  if (!user?.emailAddresses[0].emailAddress) return false;

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (!userLimit || userLimit?.count < API_COUNT_LIMIT) return true;
  return false;
};

export const apiLimitCount = async () => {
  const user = await currentUser();

  if (!user?.emailAddresses[0].emailAddress) return 0;

  const userLimit = await db.userApiLimit.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (!userLimit) return 0;

  return userLimit.count;
};
