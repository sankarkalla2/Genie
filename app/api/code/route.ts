import { checkApiLimt, updateApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  const instructionMessage = {
    role: "system",
    content:
      "you are code generator.you must answer only in markdown code spippets.use code commets for code explanations",
  };
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
    const freeTrail = await checkApiLimt();
    if (!freeTrail) {
      return new NextResponse("freeTrail is expired", { status: 403 });
    }

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [instructionMessage, ...messages],
      model: "gpt-3.5-turbo",
    };

    const resonse: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    await updateApiLimit();
    console.log(resonse);

    return NextResponse.json(resonse.choices[0].message, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internel server error", { status: 500 });
  }
};
