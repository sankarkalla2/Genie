import React from "react";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-lg h-full w-full ">{children}</div>
    </main>
  );
};

export default LandingPageLayout;
