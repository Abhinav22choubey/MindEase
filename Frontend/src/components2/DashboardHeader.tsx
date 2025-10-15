import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Welcome back, Sarah Johnson
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your mental wellness overview for today
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            Take Assessment
          </Button>
        </div>
      </div>
    </header>
  );
}
