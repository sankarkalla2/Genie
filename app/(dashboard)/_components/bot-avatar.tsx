import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const BotAvatar = () => {
  return (
    <Avatar className="border h-8 w-8 self-start bg-red-50">
      <AvatarImage src="/genius.png" />
      <AvatarFallback>GN</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
