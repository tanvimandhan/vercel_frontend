import { useTasks } from '@/contexts/TaskContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function TaskFilters() {
  const { filters, setFilters, sortBy, setSortBy } = useTasks();

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      assignedTo: ''
    });
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters & Sorting</h3>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* Status Filter */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Status</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={filters.status}
      onChange={(e) => handleFilterChange('status', e.target.value)}
    >
      <option value="">All statuses</option>
      <option value="todo">To Do</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  {/* Priority Filter */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Priority</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={filters.priority}
      onChange={(e) => handleFilterChange('priority', e.target.value)}
    >
      <option value="">All priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  {/* Assigned To Filter */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={filters.assignedTo}
      onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
    >
      <option value="">All users</option>
      <option value="me">Assigned to me</option>
    </select>
  </div>

  {/* Sort By Filter */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Sort By</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="dueDate">Due Date</option>
      <option value="priority">Priority</option>
      <option value="status">Status</option>
      <option value="title">Title</option>
      <option value="createdAt">Created Date</option>
    </select>
  </div>
</div>

    </div>
  );
}