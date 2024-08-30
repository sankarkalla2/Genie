import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { custom, date } from "zod";

export async function POST(req: Request) {
  const body = await req.text();

  console.log(body);
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  eventType = event.type;
  console.log(eventType);

  try {
    switch (eventType) {
      case "checkout.session.completed":
        //first payment successfull and subscription is created grant access to the product

        const session = event.data.object as Stripe.Checkout.Session;

        const cusomerId = session.customer;
        const paymentIntetId = session.payment_intent;
        const amountTotal = session.amount_total;
        const currency = session.currency;
        const customerEmail = session.customer_details?.email;

        console.log(customerEmail);
        const isUserExisted = await db.userSubscription.findUnique({
          where: {
            email: customerEmail as string,
          },
        });

        if (!isUserExisted) {
          await db.userSubscription.create({
            data: {
              email: customerEmail as string,
              stripeCustomerId: cusomerId as string,
              stripeSubscriptionId: paymentIntetId as string,
              stripeCurrentPeriodEnd: new Date(session.expires_at * 1000),
            },
          });
          console.log("ljfa");
        } else {
          await db.userSubscription.update({
            where: {
              email: customerEmail as string,
            },
            data: {
              stripeCustomerId: cusomerId as string,
              stripeSubscriptionId: paymentIntetId as string,
              stripeCurrentPeriodEnd: new Date(session.expires_at * 1000),
            },
          });

          console.log("ljfla");
        }
      case "customer.subscription.updated": {
        const session = event.data.object as Stripe.Checkout.Session;

        await db.userSubscription.update({
          where: {
            stripeCustomerId: session.customer as string,
          },
          data: {
            stripeCurrentPeriodEnd: new Date(session.expires_at * 1000),
          },
        });
      }
      case "customer.subscription.deleted": {
        const session = event.data.object as Stripe.Checkout.Session;

        await db.userSubscription.update({
          where: {
            stripeCustomerId: session.customer as string,
          },
          data: {
            stripeCurrentPeriodEnd: new Date("2022-03-25"),
          },
        });

        console.log("customer subscription deleted");
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({});
}
//   const session = event.data.object as Stripe.Checkout.Session;

//   if (event.type === "checkout.session.completed") {
//     const subscription = await stripe.subscriptions.retrieve(
//       session.subscription as string
//     );

//     if (!session?.metadata?.userId) {
//       return new NextResponse("User id is required", { status: 400 });
//     }

//     await db.userSubscription.create({
//       data: {
//         userId: session?.metadata?.userId,
//         stripeSubscriptionId: subscription.id,
//         stripeCustomerId: subscription.customer as string,
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000
//         ),
//       },
//     });
//   }

//   if (event.type === "invoice.payment_succeeded") {
//     const subscription = await stripe.subscriptions.retrieve(
//       session.subscription as string
//     );

//     await db.userSubscription.update({
//       where: {
//         stripeSubscriptionId: subscription.id,
//       },
//       data: {
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000
//         ),
//       },
//     });
//   }

//   return new NextResponse(null, { status: 200 });
// }
