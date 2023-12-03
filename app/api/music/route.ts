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
      return new NextResponse("Freetrail is  expired", { status: 403 });
    }
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
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
