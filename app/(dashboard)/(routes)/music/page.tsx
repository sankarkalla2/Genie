"use client";

import Heading from "@/components/ui/heading";
import { Loader2, MessageSquare, Music, Video, VideoIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [music, setMusic] = useState();
  const promodal = useProModal()
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchma>>({
    resolver: zodResolver(formSchma),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchma>) => {
    try {
      setMusic(undefined);
      setIsUpdating(true);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);

      form.reset();
    } catch (err:any) {
      console.log(err);
      promodal.onOpen()
    } finally {
      setIsUpdating(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Music Generation"
        description="get music by promting the music you love"
        icon={Music}
        color="text-red-600"
        bgColor="bg-red-600/10"
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
                      placeholder="violin duet"
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
          {!music && !isUpdating && <Empty />}
          <div className="flex flex-col-reverse gap-4">
            {music && <audio src={music} controls className="w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
