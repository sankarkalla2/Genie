"use client";

import Heading from "@/components/ui/heading";
import { ImageIcon, Loader2, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";
import {
  amountOptions,
  resulutionOptions,
  formSchma,
} from "./_components/form-schema";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { url } from "inspector";
import { useProModal } from "@/hooks/use-pro-modal";

interface MessageProps {
  role: string;
  content: string;
}

const ConversationPage = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const promodal = useProModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchma>>({
    resolver: zodResolver(formSchma),
    defaultValues: {
      prompt: "",
      resolution: "512x512",
      amount: "5",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchma>) => {
    try {
      setIsUpdating(true);
      setImages([]);
      console.log(values);

      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image?.url);
      console.log(urls);
      setImages(urls);
      form.reset();
    } catch (err: any) {
      console.log(err);

      if (err?.response?.status === 403) {
        promodal.onOpen();
      }
    } finally {
      form.reset();
      setIsUpdating(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image Generation"
        description="get images by writing your thoughts to out ai model"
        icon={ImageIcon}
        color="text-sky-600"
        bgColor="bg-sky-600/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
            grid
            w-full
            grid-cols-12
            rounded-md
            gap-2
            md:p-0
            items-center
            lg:border
            lg:p-6
          "
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="give me images..."
                      {...field}
                      className="py-6 md:p-6 outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl>
                    <Select
                      disabled={isUpdating}
                      defaultValue={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="select quantity"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>No of Images</SelectLabel>
                          {amountOptions.map((option) => (
                            <SelectItem key={option.label} value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormControl>
                    <Select
                      disabled={isUpdating}
                      defaultValue={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="select quantity"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Resolution Size</SelectLabel>
                          {resulutionOptions.map((option) => (
                            <SelectItem value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isUpdating}
              type="submit"
              className="w-full col-span-12"
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="mt-4">
          {isUpdating && <Loader />}
          {images.length === 0 && !isUpdating && <Empty />}
          {images.map((src) => (
            <Card className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image src={src} alt="img" fill />
              </div>

              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="ghost">
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
