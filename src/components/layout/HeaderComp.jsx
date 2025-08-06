// import React from "react";
// import { useAuth } from "../contexts/AuthContext";
// // adjust path as needed
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const { user, logout, isLoading,login } = useAuth();
//   const navigate = useNavigate();

//   if (isLoading) return null; // optional loading fallback

//   return (
//     <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
//       <h1
//         className="text-xl font-bold cursor-pointer text-blue-600"
//         onClick={() => navigate("/")}
//       >
//         MyApp
//       </h1>

//       <div className="flex items-center gap-4">
//         {user ? (
//           <>
//             <span className="text-sm text-gray-700">
//               {user.name || user.email}
//             </span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/");
//               }}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="text-blue-600 font-medium"
//             >
//               Login
//             </button>
            
//           </>
//         )}
//       </div>
//     </header>
//   );
// }
"use client";

import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function HeaderComp() {
  const [user, setUser] = useState();
  const [email,setEmail]=useState();
  const [role,setRole]=useState();
  

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
  console.log(user)
  navigate("/"); // or wherever your login page is
};


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("User fetch failed");

        const data = await res.json();
        console.log(data)
        // console.log(data.user.name)
        // console.log(data.user.email)
         setUser(data.name);
        setEmail(data.email);
        //setRole(data.role);
        // console.log(user)
        // console.log(email) // Expecting { name: "Tanvi Mandhan" }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUserData();
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("")
    : "JD";

  const avatarURL =
    user?.avatar ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Sidebar trigger and search */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks, projects..."
              className="w-64 lg:w-80 pl-10 pr-4 bg-muted/50 border border-border rounded-lg focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Right: icons and profile */}
        <div className="flex items-center gap-3">
          {/* Mobile search */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-muted">
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1.5 -right-1 h-5 w-5 text-xs rounded-full flex items-center justify-center p-0"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-lg">
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground mb-3">Notifications</h3>
                <div className="space-y-2">
                  {[
                    { title: "New task assigned", desc: "Design homepage mockup" },
                    { title: "Deadline reminder", desc: "Project proposal due tomorrow" },
                    { title: "Team update", desc: "Weekly standup in 1 hour" },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-muted/40 text-sm hover:bg-muted transition"
                    >
                      <div className="font-medium">{n.title}</div>
                      <div className="text-muted-foreground text-xs">{n.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/30 transition-all">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatarURL} alt={user || "User"} />
                  <AvatarFallback className="bg-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl shadow-xl" align="end">
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatarURL} alt={name || "User"} />
                  <AvatarFallback className="bg-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{user || "Loading..."}</p>
                  <p className="text-xs text-muted-foreground">{email || "Loading..."}</p>
                  {role && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      {role}
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
