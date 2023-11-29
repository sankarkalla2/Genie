"use client";

import Heading from "@/components/ui/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchma } from "../../_components/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpenAI } from "openai";
import { useRouter } from "next/navigation";
import MarkDown from "react-markdown";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import Empty from "../../_components/empty";
import Loader from "../../_components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "../../_components/user-avatar";
import BotAvatar from "../../_components/bot-avatar";
import Markdown from "react-markdown";

interface MessageProps {
  role: string;
  content: string;
}

const ConversationPage = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchma>>({
    resolver: zodResolver(formSchma),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchma>) => {
    try {
      setIsUpdating(true);
      const userMessage: MessageProps = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((curr) => [...curr, response.data, userMessage]);
      form.reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Code"
        description="get code by spcifying text"
        icon={Code}
        color="text-violet-700"
        bgColor="bg-violet-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
            grid
            w-full
            lg:px-6
            grid-cols-12
            rounded-md
            gap-2
            md:p-0
            items-center
          "
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-10">
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="Write code for a number is prime or not..."
                      {...field}
                      className="py-6 md:p-6 outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isUpdating}
              type="submit"
              className="w-full col-span-12 md:col-span-2"
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="mt-4">
          {isUpdating && <Loader />}
          {messages.length === 0 && !isUpdating && <Empty />}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-5 flex items-center gap-x-4 rounded-md shadow-sm",
                  message.role === "user" ? "border" : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                <Markdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="bg-black/10 p-2 rounded-lg overflow-auto my-2">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code {...props} className="p-1 rounded-lg" />
                    ),
                  }}
                  className="text-sm overflow-hidden"
                >
                  {message.content}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
