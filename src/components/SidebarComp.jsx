
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  Users,
  FolderOpen,
  Star,
  Plus,
  X,
  Menu,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Team", url: "/team", icon: Users },
];

const quickActions = [
  { title: "Starred", url: "/starred", icon: Star },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function SidebarComp() {
  const { state, setState } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const getNavClasses = (active) =>
    active
      ? "bg-primary/90 text-white font-semibold shadow-inner border-l-4 border-primary"
      : "hover:bg-muted hover:text-foreground transition-colors";

  return (
    <div className="flex min-h-screen">
      {/* Floating toggle button when sidebar is collapsed */}
      {collapsed && (
        <button
          onClick={() => setState("expanded")}
          className="fixed top-4 left-4 z-50 bg-white border border-border shadow-lg p-2 rounded-md hover:bg-muted transition"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      {/* Sidebar visible only when expanded */}
      {!collapsed && (
        <Sidebar className="w-64" collapsible="icon">
          <SidebarContent className="bg-gradient-to-b from-white to-muted border-r border-border shadow-sm transition-all duration-300">
            {/* Logo & Toggle */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground text-lg tracking-tight">
                    TaskFlow
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Productivity Suite
                  </p>
                </div>
              </div>
              <button
                onClick={() => setState("collapsed")}
                className="ml-auto text-muted-foreground hover:text-primary transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Add Task */}
            <div className="p-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity text-white shadow-md"
                onClick={() => navigate("/tasks")}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 pt-2 pb-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${getNavClasses(isActive(item.url))}`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Quick Access */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 pt-4 pb-1">
                Quick Access
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {quickActions.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${getNavClasses(isActive(item.url))}`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
}
