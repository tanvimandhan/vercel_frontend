// import React, { useState } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const loginUser = async (e) => {
//     // e.preventDefault();
//     // try {
//     //   const res = await axios.post("http://localhost:5000/api/auth/login", {
//     //     email,
//     //     password,
//     //   });
//     //   localStorage.setItem("token", res.data.token);
//     //   alert("Login successful!");
//     //   // Optionally redirect here
//     // } catch (err) {
//     //   alert("Invalid credentials");
//     // }
//   };

//   return (
//     <form onSubmit={loginUser} className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Login
//       </button>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarComp from "../components/SidebarComp";
import HeaderComp from "../components/layout/HeaderComp";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentTasks } from "@/components/RecentTasks";
import { ProjectOverview } from "@/components/ProjectOverview";

const Index = () => {
  const [userName, setUserName] = useState("");

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
        setUserName(data.name); // Expecting { name: "Tanvi Mandhan" }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-surface">
        <SidebarComp />

        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderComp />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userName || "there"}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your tasks today.
                </p>
              </div>

              <DashboardStats />

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <RecentTasks />
                </div>
                <div className="lg:col-span-1">
                  <ProjectOverview />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
