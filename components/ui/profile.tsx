import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";

export const Profile = ({ name, image }: { name: string; image: string }) => {
  return (
    <Button size="sm" variant="ghost" className="flex items-center space-x-2 ">
      <p>@{name}</p>
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </Button>
  );
};
