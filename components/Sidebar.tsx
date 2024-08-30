"use client";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageDown,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Settings2,
  VideoIcon,
  Bot,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { apiLimitCount } from "@/lib/api-limit";
import FreeTrail from "./free-trail";

const monserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const dashboardRoutes = [
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
  {
    label: "Vision Pro",
    href: "/vision",
    color: "text-green-500",
    icon: Bot,
  },
  {
    label: "Settings",
    href: "/settings",
    color: "text-white",
    icon: Settings,
  },
];

interface SidebarProps {
  apiLimit: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimit = 0, isPro }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="h-full text-white space-y-4 py-4 flex flex-col bg-black">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-4 gap-2 mb-6">
          <div className="relative w-8 h-8">
            <Image src="/genius.png" fill alt="genieimg" />
          </div>
          <h1 className={cn("text-2xl font-bold", monserrat.className)}>
            Genie
          </h1>
        </Link>
        <div className="space-y-2">
          {dashboardRoutes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "flex items-center p-3 gap-2 w-full text-sm justify-start font-medium text-white hover:bg-slate-800 rounded-lg transition",
                pathname.includes(route.href) && "bg-slate-700"
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full p-5">
        {!isPro && <FreeTrail apiLimit={apiLimit} />}
      </div>
    </div>
  );
};

export default Sidebar;
