
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import Index from "./Pages/Index";
import { SidebarProvider } from "./components/ui/sidebar";
import { TaskList } from "./components/tasks/TaskList";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          
          <Sonner />
          
          <Routes>
            {/* ✅ Public routes without SidebarProvider */}
            <Route
              path="/"
              element={
                <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
                  <RegisterForm />
                </div>
              }
            />
            <Route path="/login" element={<LoginForm />} />

            {/* ✅ Private route WITH layout */}
            <Route
              path="/tasks"
              element={
                <SidebarProvider>
                  <div className=" w-full">
                    <TaskList />
                  </div>
                  
                </SidebarProvider>
              }
            />
            <Route path="/dashboard" element={<Index/>}/>
            
          </Routes>
        

        </TaskProvider>
      </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;