"use client";
import { useAuth } from "@clerk/nextjs";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingMain = () => {
  return (
    <div className="py-36 text-white text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
      <h1 className="">The Best AI Generation Tool</h1>

      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        <TypeWriterComponent
          options={{
            strings: [
              "Chatbot",
              "Photo Generation",
              "Music Generation",
              "Code Generation",
              "Video Generation",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <p className="text-sm font-normal text-muted-foreground">
        Create ai generation 10x faster
      </p>
      <Button variant="premium">Start Generating For Free</Button>
      <p className="text-sm text-muted-foreground font-normal">No credit card requred</p>
    </div>
  );
};

export default LandingMain;
