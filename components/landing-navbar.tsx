"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between text-white">
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-8 mr-2">
          <Image fill src="/genius.png" alt="logo" />
        </div>

        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Genie
        </h1>
      </Link>

      <div>
        <Button>
        <Link href={"/dashboard"}>Get started</Link>
        </Button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
