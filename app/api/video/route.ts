import { checkApiLimt, updateApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export const POST = async (req: Request) => {
  const isPro = await checkSubscription();
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("You are not authenticated", { status: 401 });
    }

    if (!prompt) {
      console.log("messages are requred");
      return new NextResponse("Messages are requred", { status: 400 });
    }

    const freeTrail = await checkApiLimt();
    if (!freeTrail && !isPro) {
      return new NextResponse("Freetrail is expired", { status: 403 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );
    !isPro && (await updateApiLimit());

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internel server error", { status: 500 });
  }
};
