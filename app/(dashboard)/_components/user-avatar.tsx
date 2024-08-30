import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar = () => {
  const { user } = useUser()
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.[0]}
        {user?.lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
