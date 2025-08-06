import { useState } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import { TaskFilters } from './TaskFilters';

export function TaskList() {
  const { tasks, deleteTask } = useTasks();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-muted';
    }
  };

  const mockTasks = [
    {
      id: '1',
      title: 'Design Landing Page',
      description: 'Create the initial design for the marketing landing page.',
      priority: 'high',
      status: 'in-progress',
      assignedTo: user?.id,
      assignedToName: user?.name || 'Tanvi Mandhan',
      dueDate: new Date().toISOString(),
      documents: [],
      createdBy: user?.id
    },
    {
      id: '2',
      title: 'Database Schema',
      description: 'Design the schema for task management.',
      priority: 'medium',
      status: 'todo',
      assignedTo: user?.id,
      assignedToName: user?.name || 'Tanvi Mandhan',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      documents: [],
      createdBy: user?.id
    }
  ];

  const displayTasks = tasks.length > 0 ? tasks : mockTasks;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-600 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'todo': return 'bg-gray-600 text-white';
      default: return 'bg-muted';
    }
  };

  const canEditTask = (task) => {
    return user?.role === 'admin' || task.assignedTo === user?.id || task.createdBy === user?.id;
  };

  const handleEdit = (taskId) => {
    setEditingTask(taskId);
    setShowForm(true);
  };

  const handleView = (taskId) => {
    setViewingTask(taskId);
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex justify-between items-center py-3 w-full">
        <h2 className="text-3xl font-bold text-primary">📝 My Tasks</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gray-800 hover:bg-gray-700 text-black"
        >
          <Plus className="w-4 h-4 mr-2 text-black" />
          New Task
        </Button>
      </div>

      <TaskFilters />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayTasks.map((task) => (
          <Card
            key={task.id}
            className="transition-shadow hover:shadow-lg shadow-md border border-muted bg-card rounded-xl"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={`capitalize px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <Badge className={`capitalize px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </Badge>
                </div>
              </div>
              <CardDescription className="mt-2">{task.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p><strong>👤 Assigned to:</strong> {task.assignedToName}</p>
              <p><strong>📅 Due date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              {task.documents.length > 0 && (
                <p><strong>📎 Documents:</strong> {task.documents.length} attached</p>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleView(task._id)}
                  className="bg-gray-800 hover:bg-gray-700 text-black"
                >
                  <Eye className="w-4 h-4 text-black" />
                </Button>

                {canEditTask(task) && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(task.id)}
                      className="bg-yellow-600 hover:bg-yellow-500 text-black"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-700 hover:bg-red-600 text-black"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <TaskForm
          taskId={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {viewingTask && (
        <TaskDetails
          taskId={viewingTask}
          onClose={() => setViewingTask(null)}
        />
      )}
    </div>
  );
}
