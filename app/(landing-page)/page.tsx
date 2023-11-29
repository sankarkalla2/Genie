"use client";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div>SignIn here</div>
    </div>
  );
}
