import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  console.log("called");
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, resolution = "512x512", amount = "5" } = body;

    if (!userId) {
      return new NextResponse("You are not authenticated", { status: 401 });
    }

    if (!openai.apiKey) {
      console.log("error");
      return new NextResponse("Openai key is not configured", { status: 500 });
    }

    if (!prompt) {
      console.log("messages are requred");
      return new NextResponse("Messages are requred", { status: 400 });
    }

    const response = await openai.images.generate({
      n: parseInt(amount, 10),
      prompt,
      size: resolution,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internel server error", { status: 500 });
  }
};
