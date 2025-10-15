import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  title: string;
  score: number;
  date: string;
  status: string;
  variant: "primary" | "success" | "purple";
}

export function AssessmentCard({ title, score, date, status, variant }: AssessmentCardProps) {
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20",
    success: "bg-success/10 border-success/20",
    purple: "bg-purple/10 border-purple/20",
  };

  return (
    <div className={cn("p-4 rounded-lg border-2 transition-all hover:shadow-md", variantClasses[variant])}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Score: {score}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-card text-xs font-medium text-foreground">
          {status}
        </div>
      </div>
    </div>
  );
}
