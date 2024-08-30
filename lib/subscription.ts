import { auth } from "@clerk/nextjs";
import db from "./db";
import { currentUser } from "@clerk/nextjs/server";

export const checkSubscription = async () => {
  const DAY_IN_MS = 86_400_000;
  const { userId } = auth();
  const user = await currentUser();

  
  if (!user?.emailAddresses[0].emailAddress) return false;

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
