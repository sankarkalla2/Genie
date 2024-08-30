import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  color: string;
  description: string;
}

const Heading = ({
  title,
  icon: Icon,
  bgColor,
  description,
  color,
}: HeadingProps) => {
  return (
    <div className="px-4 md:px-8 text-center mb-8">
      <div className="flex items-center gap-x-3">
        <div className={cn('p-1 rounded-sm',bgColor)}>
          <Icon className={cn("h-10 w-10", color)} />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground text-light">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
