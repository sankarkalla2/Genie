"use client";

import Heading from "@/components/ui/heading";
import { Loader2, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchma } from "../../_components/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpenAI } from "openai";
import { useRouter } from "next/navigation";
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
      const response = await axios.post("/api/conversation", {
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
        title="conversation"
        description="get chat with out latest ai model"
        icon={MessageSquare}
        color="text-pink-600"
        bgColor="bg-pink-600/50"
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
                      placeholder="who is founder of java.."
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
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
