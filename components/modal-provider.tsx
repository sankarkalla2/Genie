"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const promodal = useProModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const aiTools = [
    {
      label: "Dashboard",
      href: "/dashboard",
      color: "text-sky-600",
      icon: LayoutDashboard,
    },
    {
      label: "Conversation",
      href: "/conversation",
      color: "text-pink-600",
      icon: MessageSquare,
    },
    {
      label: "Image Generation",
      href: "/image",
      color: "text-sky-600",
      icon: ImageIcon,
    },
    {
      label: "Music Generation",
      href: "/music",
      color: "text-red-600",
      icon: Music,
    },

    {
      label: "Video Generation",
      href: "/video",
      color: "text-emerald-600",
      icon: VideoIcon,
    },
    {
      label: "Code Generation",
      href: "/code",
      color: "text-violet-600",
      icon: Code,
    },
  ];

  const onSubscribe = async () => {
    try {
      const resposnse = await axios.get("/api/stripe");
      console.log(resposnse.data);

      window.location.href = resposnse.data.url;
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Dialog open={promodal.isOpen} onOpenChange={promodal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center font-bold py-1 justify-center pb-4 space-x-3">
            <div>Upgrade to Genie</div>
            <div className="uppercase">
              <Badge variant="premium">pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-y-2 pb-4">
              {aiTools.map((tool) => (
                <div
                  key={tool.href}
                  className="w-full shadow-sm border rounded-lg p-4 flex gap-x-2 justify-between items-center"
                >
                  <div className="flex items-center gap-x-2">
                    <tool.icon className={cn("", tool.color)} />
                    {tool.label}
                  </div>
                  <ArrowRight />
                </div>
              ))}
            </div>

            <Button
              onClick={onSubscribe}
              type="button"
              variant="premium"
              className="w-full flex gap-x-2"
            >
              Upgrade <Zap className="w-4 h-4" />
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProvider;
