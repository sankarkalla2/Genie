"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

interface SubscrioptionButtonProps {
  isSubscribed: boolean;
}

const SubscriptionButton = ({ isSubscribed }: SubscrioptionButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
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
      <Button
        disabled={isEditing}
        onClick={handleSubmit}
        variant={isSubscribed ? "default" : "premium"}
      >
        {isSubscribed ? "Manage Subscription" : "Upgrade"}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
