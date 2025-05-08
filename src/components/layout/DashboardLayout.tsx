
import { useState, ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  User,
  FolderKanban,
  Users,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarNavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarNavItem = ({ 
  icon: Icon, 
  label, 
  href,
  active,
  onClick 
}: SidebarNavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-academe-100 dark:hover:bg-academe-900/20",
        active && "bg-academe-100 text-academe-700 dark:bg-academe-900/20 dark:text-academe-300"
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const sidebarItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/dashboard" 
    },
    { 
      icon: FolderKanban, 
      label: "Projects", 
      href: "/dashboard/projects" 
    },
    { 
      icon: Users, 
      label: "Groups", 
      href: "/dashboard/groups" 
    },
    { 
      icon: ClipboardList, 
      label: "Tasks", 
      href: "/dashboard/tasks" 
    },
    { 
      icon: FileText, 
      label: "Reports", 
      href: "/dashboard/reports", 
      hidden: user?.role === "student" && user?.role !== "mentor" && user?.role !== "leader"
    },
    { 
      icon: User, 
      label: "Profile", 
      href: "/dashboard/profile" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      href: "/dashboard/settings" 
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo & user info */}
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center mb-4">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-academe-500 to-academe-700">
              Academe
            </span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems
            .filter(item => !item.hidden)
            .map(item => (
              <SidebarNavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
                onClick={closeSidebarIfMobile}
              />
            ))
          }
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container py-4 md:py-6 px-4 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
