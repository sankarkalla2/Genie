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
    const { messages } = body;

    if (!userId) {
      return new NextResponse("You are not authenticated", { status: 401 });
    }

    if (!openai.apiKey) {
      console.log("error");
      return new NextResponse("Openai key is not configured", { status: 500 });
    }

    if (!messages) {
      console.log("messages are requred");
      return new NextResponse("Messages are requred", { status: 400 });
    }

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages,
      model: "gpt-3.5-turbo",
    };

    const resonse: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    console.log(resonse);

    return NextResponse.json(resonse.choices[0].message, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internel server error", { status: 500 });
  }
};
