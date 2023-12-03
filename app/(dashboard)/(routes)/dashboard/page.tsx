"use client";

import Link from "next/link";
import {
  ArrowBigRight,
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="space-y-4 mb-8 text-center">
        <h1 className=" text-center text-2xl md:text-4xl font-bold">
          Explore Power of AI
        </h1>
        <p className="text-sm text-muted-foreground lg:text-lg texl-light">
          Chat with ai model and get information you need.
        </p>
      </div>
      <div className="space-y-4 px-8 md:px-20 lg:px-32">
        {aiTools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="flex p-4 items-center justify-between cursor-pointer hover:bg-slate-100 hover:shadow-md transition"
          >
            <div className="flex items-center">
              <tool.icon className={cn("w-5 h-5 mr-2", tool.color)} />
              {tool.label}
            </div>
            <ArrowBigRight />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
