import { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileUpload } from './FileUpload';
import { useToast } from '@/hooks/use-toast';


export function TaskForm({ taskId, onClose }) {
  const { tasks, createTask, updateTask } = useTasks();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' ,
    priority: 'medium',
    dueDate: '',
    assignedTo: user?.id || '',
    assignedToName: user?.name || '',
    documents: [] 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskId) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
        title: task.title || '',
        description: task.description || '',
        status: ['todo', 'in-progress', 'completed'].includes(task.status) 
          ? task.status 
          : 'todo', // Default to 'todo' if invalid
        priority: ['low', 'medium', 'high'].includes(task.priority)
          ? task.priority
          : 'medium', // Default to 'medium' if invalid
        dueDate: task.dueDate || '',
        assignedTo: task.assignedTo || user?.id || '',
        assignedToName: task.assignedToName || user?.name || '',
        documents: Array.isArray(task.documents) ? task.documents : [] // Ensure always array
      });
      }
    }
  }, [taskId, tasks]);

  const validateForm = () => {
    const newErrors= {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    console.log("handlesubmit token",token)
    e.preventDefault();
    console.log(2)
    const formDataToSend = new FormData();
    console.log(formData)
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("priority", formData.priority);
    formDataToSend.append("dueDate", formData.dueDate);
    formDataToSend.append("assignedTo", formData.assignedTo);
    formDataToSend.append("assignedToName", formData.assignedToName);
//     for (let [key, value] of formDataToSend.entries()) {
//   console.log(`${key}:`, value);
// }

    formData.documents.forEach((doc) => {
      formDataToSend.append("documents", doc.file); // 👈 file object
    });
//     for (let [key, value] of formDataToSend.entries()) {
//   console.log(`${key}:`, value);
// }
console.log("token",token)

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Task creation failed");
      }

      const newTask = await response.json();
      console.log("✅ Task created:", newTask);
      // Optional: reset form or navigate
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentsChange = (documents) => {
    setFormData(prev => ({ ...prev, documents }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{taskId ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the task
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
  {/* Status Dropdown */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Status</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formData.status}
      onChange={(e) => handleChange('status', e.target.value)}
    >
      <option value="">Select status</option>
      <option value="todo">To Do</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  {/* Priority Dropdown */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Priority</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formData.priority}
      onChange={(e) => handleChange('priority', e.target.value)}
    >
      <option value="">Select priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
</div>

          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
            {errors.dueDate && (
              <p className="text-sm text-destructive">{errors.dueDate}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assignedToName">Assigned To</Label>
            <Input
              id="assignedToName"
              value={formData.assignedToName}
              onChange={(e) => handleChange('assignedToName', e.target.value)}
              placeholder="Enter assignee name"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Documents (PDF only, max 3)</Label>
            <FileUpload
              documents={formData.documents}
              onChange={handleDocumentsChange}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="text-black">
              {taskId ? 'Update Task' : 'Create Task'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}