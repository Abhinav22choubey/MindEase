import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalItemProps {
  title: string;
  completed: boolean;
  timeLeft?: string;
}

export function GoalItem({ title, completed, timeLeft }: GoalItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            completed
              ? "bg-success border-success"
              : "border-muted-foreground"
          )}
        >
          {completed && <Check className="w-3 h-3 text-success-foreground" />}
        </div>
        <span className={cn(
          "text-sm font-medium",
          completed ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {title}
        </span>
      </div>
      {timeLeft && !completed && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{timeLeft}</span>
        </div>
      )}
    </div>
  );
}
