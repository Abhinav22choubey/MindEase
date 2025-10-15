import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant: "warning" | "success" | "purple" | "primary";
}

export function StatCard({ title, value, icon: Icon, variant }: StatCardProps) {
  const variantClasses = {
    warning: "bg-warning/10 border-warning/20",
    success: "bg-success/10 border-success/20",
    purple: "bg-purple/10 border-purple/20",
    primary: "bg-primary/10 border-primary/20",
  };

  const iconVariants = {
    warning: "text-warning",
    success: "text-success",
    purple: "text-purple",
    primary: "text-primary",
  };

  return (
    <div className={cn(
      "p-6 rounded-xl border-2 transition-all hover:shadow-md",
      variantClasses[variant]
    )}>
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-lg bg-card", iconVariants[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
