"use client";
import LandingMain from "@/components/landing-main";
import LandingNavbar from "@/components/landing-navbar";
import PricingPlans from "@/components/pricing";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingMain />
      <PricingPlans />
    </div>
  );
}
