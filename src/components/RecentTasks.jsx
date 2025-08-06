import { MoreVertical, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const recentTasks = [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create wireframes and mockups for the updated homepage",
    priority: "High",
    status: "In Progress",
    assignee: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    dueDate: "Today",
    project: "Website Redesign"
  },
  {
    id: 2,
    title: "Update user documentation",
    description: "Revise API documentation based on recent changes",
    priority: "Medium",
    status: "Todo",
    assignee: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    dueDate: "Tomorrow",
    project: "Documentation"
  },
  {
    id: 3,
    title: "Fix mobile navigation bug",
    description: "Address reported issue with dropdown menu on iOS devices",
    priority: "High",
    status: "In Review",
    assignee: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    dueDate: "Today",
    project: "Mobile App"
  },
  {
    id: 4,
    title: "Prepare quarterly report",
    description: "Compile metrics and insights for Q4 presentation",
    priority: "Low",
    status: "Todo",
    assignee: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    dueDate: "Next Week",
    project: "Analytics"
  }
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High": return "destructive";
    case "Medium": return "warning";
    case "Low": return "secondary";
    default: return "secondary";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress": return "primary";
    case "In Review": return "warning";
    case "Todo": return "secondary";
    case "Done": return "success";
    default: return "secondary";
  }
};

export function RecentTasks() {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Tasks
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                    <DropdownMenuItem>Assign to</DropdownMenuItem>
                    <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getPriorityColor(task.priority) } className="text-xs">
                  {task.priority}
                </Badge>
                <Badge variant={getStatusColor(task.status) } className="text-xs">
                  {task.status}
                </Badge>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {task.project}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                    <AvatarFallback className="text-xs bg-gradient-primary text-white">
                      {task.assignee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {task.dueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}