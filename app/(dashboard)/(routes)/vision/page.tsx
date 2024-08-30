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
import React, { useState } from "react";
import axios from "axios";
import Empty from "../../_components/empty";
import Loader from "../../_components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "../../_components/user-avatar";
import BotAvatar from "../../_components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { headers } from "next/headers";

interface MessageProps {
  role: string;
  content: string;
}

const VisionModel = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const promodal = useProModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchma>>({
    resolver: zodResolver(formSchma),
    defaultValues: {
      prompt: "",
    },
  });
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (!image) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err: any) {
      console.log("Error while uploading image", err);
    }
    const file = event.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
    }
  };

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
    } catch (err: any) {
      if (err?.response?.status === 403) {
        promodal.onOpen();
      }
    } finally {
      setIsUpdating(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Vision Model"
        description="Upload image and ask questions about it"
        icon={MessageSquare}
        color="text-green-600"
        bgColor="bg-green-600/50"
      />

      {image ? (
        <div className="w-full flex justify-center">
          <Image src={image} alt="image" height={200} width={200} />
        </div>
      ) : (
        <div>
          <Input
            disabled={isUpdating}
            type="file"
            id="picture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="w-full flex justify-center">
            <label
              id="text-input"
              htmlFor="picture"
              className="pr-1 text-blue-600"
            >
              Upload{" "}
            </label>{" "}
            image to and ask question about it
          </div>
        </div>
      )}

      <div className="px-4 lg:px-8 pt-4">
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
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Input
                        disabled={isUpdating}
                        placeholder="ask something..."
                      />
                    </div>
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

export default VisionModel;
