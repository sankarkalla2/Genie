import { auth } from "@clerk/nextjs";
import db from "./db";

export const checkSubscription = async () => {
  const DAY_IN_MS = 86_400_000;
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
