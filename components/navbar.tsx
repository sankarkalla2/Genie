import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import MobileSidebarMenu from "@/components/mobile-sidebar-menu";
import { apiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async() => {

  const isPro  = await checkSubscription()
  const apiLimit = await apiLimitCount();
  return (
    <div className="w-full bg-slate-50 p-4 flex items-center">
      <MobileSidebarMenu isSubscribed={isPro} apiLimit={apiLimit}/>
      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
