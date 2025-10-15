import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function UserProfileCard() {
  return (
    <div className="bg-success/10 border-2 border-success/20 rounded-xl p-4 flex items-center gap-4">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">Sarah Johnson</h4>
        <Badge variant="secondary" className="mt-1">Premium Member</Badge>
      </div>
    </div>
  );
}
