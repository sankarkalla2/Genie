import { API_COUNT_LIMIT } from "@/constants";

import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { apiLimitCount } from "@/lib/api-limit";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeTrailProps {
  apiLimit: number;
}

const FreeTrail = ({ apiLimit = 0 }: FreeTrailProps) => {
  const [mounted, setIsMounted] = useState(false);
  const promodal = useProModal();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Card className="bg-slate-700 text-white shadow-md px-4 py-3 flex flex-col items-center gap-y-2">
      <h3>
        {apiLimit}/{API_COUNT_LIMIT} generations
      </h3>
      <Progress value={(apiLimit / API_COUNT_LIMIT) * 100} className="h-2" />

      <Button
        onClick={promodal.onOpen}
        variant="premium"
        className="w-full shadow-md mt-2"
        size="sm"
      >
        Upgrade <Zap className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
};

export default FreeTrail;
