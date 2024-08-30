"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import { Check, CheckCheck, CheckCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_00g3eW5e59bNg7ubIK?prefilled_email=gowrisanarkalla4@gmail.com"
        : "",
    priceId: "prod_QksyL8vgVzLDue",
    price: 19,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_dR66r87mdew74oMfZ1"
        : "",
    priceId: "prod_Qkt83TbMD0you1",
    price: 99,
    duration: "/year",
  },
];
const PricingPlans = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return;
  return (
    <div className="flex w-full items-center justify-center">
      <Tabs defaultValue="month" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="month">Pay Monthly</TabsTrigger>
          <TabsTrigger value="year">Pay Yearly (60%off)</TabsTrigger>
        </TabsList>
        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-4xl font-bold">
                  $19/
                  <span className="text-muted-foreground text-sm">month</span>
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> Unlimted Ai
                  Respones
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> 24/7 customer
                  support
                </div>
                <div className=" flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> Access to future
                  ai models
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link
                  className="w-full"
                  target="_blank"
                  href={`https://buy.stripe.com/test_00g3eW5e59bNg7ubIK?prefilled_email=${user?.emailAddresses[0].emailAddress}`}
                >
                  Subscribe
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="year">
          <Card className="">
            <CardHeader>
              <CardTitle>
                <h2 className="text-4xl font-bold">
                  $99/
                  <span className="text-muted-foreground text-sm">month</span>
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> Unlimted Ai
                  Respones
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> 24/7 customer
                  support
                </div>
                <div className=" flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> Access to future
                  ai models
                </div>
                <div className=" flex items-center gap-x-2 text-sm">
                  <Check className="text-violet-600 w-5 h-5" /> 60% off compared
                  to montly subscription
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingPlans;
