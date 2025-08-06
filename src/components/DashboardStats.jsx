import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Tasks",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "In Progress",
    value: "8",
    change: "+5%",
    trend: "up", 
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-100"
  },
  {
    title: "Completed Today",
    value: "6",
    change: "+20%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    title: "Overdue",
    value: "2",
    change: "-15%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-100"
  }
];

export function DashboardStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-2xl border border-border bg-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-md ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground mb-1">{stat.value}</div>
            <p
              className={`text-sm font-medium flex items-center gap-1 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 transition-transform ${
                  stat.trend === "down" ? "rotate-180" : ""
                }`}
              />
              {stat.change} from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
