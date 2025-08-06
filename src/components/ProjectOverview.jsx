import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    progress: 75,
    status: "On Track",
    teamSize: 5,
    deadline: "Dec 15, 2024",
    color: "bg-primary"
  },
  {
    id: 2,
    name: "Mobile App Development", 
    description: "Native iOS and Android app for customer portal",
    progress: 45,
    status: "In Progress",
    teamSize: 3,
    deadline: "Jan 30, 2025",
    color: "bg-success"
  },
  {
    id: 3,
    name: "API Integration",
    description: "Connect third-party services with existing platform",
    progress: 20,
    status: "Planning",
    teamSize: 2,
    deadline: "Feb 28, 2025",
    color: "bg-warning"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case "On Track": return "success";
    case "In Progress": return "primary";
    case "Planning": return "secondary";
    case "At Risk": return "warning";
    case "Delayed": return "destructive";
    default: return "secondary";
  }
};

export function ProjectOverview() {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Active Projects
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${project.color}`} />
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <Badge variant={getStatusColor(project.status)} className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.teamSize} members
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due {project.deadline}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}