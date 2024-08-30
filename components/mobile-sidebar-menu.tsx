"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileSidebarMenuProps {
  apiLimit: number;
  isSubscribed: boolean;
}
const MobileSidebarMenu = ({
  apiLimit,
  isSubscribed,
}: MobileSidebarMenuProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isSubscribed} apiLimit={apiLimit} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarMenu;
