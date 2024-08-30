import Heading from "@/components/ui/heading";
import { checkSubscription } from "@/lib/subscription";
import { SettingsIcon } from "lucide-react";
import SubscriptionButton from "../../_components/subscription-button";

const Settings = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="">
      <div>
        <Heading
          title="Settings"
          description="Manage your subscription"
          icon={SettingsIcon}
          bgColor="bg-gray-600/10"
          color="text-gray-700"
        />
      </div>

      <div className=" p-4 text-muted-foreground">
        {isPro
          ? "You are currently in pro plan"
          : "You are currently in free plan"}
        

        <SubscriptionButton isSubscribed ={isPro}/>
      </div>
    </div>
  );
};

export default Settings;
