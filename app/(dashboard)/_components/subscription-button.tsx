"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface SubscrioptionButtonProps {
  isSubscribed: boolean;
}

const SubscriptionButton = ({ isSubscribed }: SubscrioptionButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUser();
  const handleSubmit = async () => {
    try {
      console.log("called");
      setIsEditing(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (err: any) {
      console.log(`Webhook error`, err.message);
    } finally {
      setIsEditing(false);
    }
  };
  return (
    <div className="mt-4">
      <Button variant={isSubscribed ? "default" : "premium"}>
        {isSubscribed && (
          <a
            href={`
https://billing.stripe.com/p/login/test_bIYg2Vd6zgVpevS144?prefilled_email=${user?.emailAddresses[0].emailAddress}`}
          >
            Cancel subscription
          </a>
        )}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
