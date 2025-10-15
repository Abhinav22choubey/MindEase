import { useState } from "react";
import { Bell, MessageCircle, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/Home", active: false },
    { name: "Dashboard", href: "/profile", icon: User }, // Dashboard / Profile link
    { name: "Notifications", href: "#notifications", icon: Bell },
    { name: "Messages", href: "/wchat", icon: MessageCircle },
    { name: "About", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login"); // redirect to login
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24 py-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MindEase
              </h1>
              <p className="text-xs text-muted-foreground">
                Mental Wellness Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  className={`relative transition-smooth ${
                    item.active
                      ? "bg-gradient-primary shadow-primary"
                      : "hover:bg-muted"
                  }`}
                  asChild
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                    {item.name === "Notifications" && (
                      <Badge className="ml-1 bg-secondary text-secondary-foreground text-xs">
                        3
                      </Badge>
                    )}
                    {item.name === "Messages" && (
                      <Badge className="ml-1 bg-accent text-accent-foreground text-xs">
                        2
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </nav>

          {/* Profile and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Desktop Profile */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hidden sm:flex border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-smooth"
            >
              <Link to="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start transition-smooth ${
                      item.active
                        ? "bg-gradient-primary shadow-primary"
                        : "hover:bg-muted"
                    }`}
                    asChild
                  >
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                      {item.name === "Notifications" && (
                        <Badge className="ml-auto bg-secondary text-secondary-foreground text-xs">
                          3
                        </Badge>
                      )}
                      {item.name === "Messages" && (
                        <Badge className="ml-auto bg-accent text-accent-foreground text-xs">
                          2
                        </Badge>
                      )}
                    </Link>
                  </Button>
                );
              })}

              {/* Mobile Profile / Dashboard / Logout */}
              <div className="pt-2 border-t space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    Dashboard
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
