import { Heart, LayoutDashboard, ClipboardList, TrendingUp, Target, Heart as HeartMenu, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserProfileCard } from "./UserProfileCard";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Assessments", icon: ClipboardList, path: "/assessments" },
  { title: "Progress", icon: TrendingUp, path: "/progress" },
  { title: "Goals", icon: Target, path: "/goals" },
  { title: "Wellness", icon: HeartMenu, path: "/wellness" },
  { title: "Profile", icon: User, path: "/profile" },
];

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MindEase</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "text-sidebar-foreground hover:bg-accent/50",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <UserProfileCard />
      </div>
    </aside>
  );
}
