import { useTasks } from '@/contexts/TaskContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download, Trash2, Pencil } from 'lucide-react';

export function TaskDetails({ taskId, onClose }) {
  const { tasks, deleteTask, updateTask } = useTasks();

  const task = tasks.find(t => t._id === taskId || t.id === taskId);
  if (!task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-600 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'todo': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      deleteTask(taskId);
      onClose();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleUpdate = (taskId) => {
    const newStatus =
      task.status === 'todo' ? 'in-progress' :
      task.status === 'in-progress' ? 'completed' :
      'completed';

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(data => updateTask(taskId, data))
      .catch(err => console.error("Failed to update task", err));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{task.title}</span>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Description</h4>
            <p className="text-muted-foreground">{task.description}</p>
          </div>

          {/* Task Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold">Assigned To</h4>
              <p className="text-muted-foreground">{task.assignedToName}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Due Date</h4>
              <p className="text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Created</h4>
              <p className="text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Priority</h4>
              <p className="capitalize text-muted-foreground">{task.priority}</p>
            </div>
          </div>

          {/* Documents */}
          {task.documents?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Attached Documents</h4>
              <div className="space-y-3">
                {task.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)} • PDF</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => handleUpdate(task._id)} className="bg-gray-800 text-black hover:bg-gray-700 ">
              <Pencil className="w-4 h-4 mr-2" />
              Update Status
            </Button>

            <Button variant="destructive" onClick={() => handleDelete(task._id)} className="text-black bg-gray-400">
              <Trash2 className="w-4 h-4 mr-2 text-black" />
              Delete
            </Button>

            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
