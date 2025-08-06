import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: ''
  });
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    //if (user) {
      fetchTasksFromBackend();
    //}
  }, []);

  const fetchTasksFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Add check if response is not an array
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        console.warn("Unexpected response format from /api/tasks", data);
        setTasks([]);
      }

    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("status", taskData.status);
      formData.append("priority", taskData.priority);
      formData.append("dueDate", taskData.dueDate);
      formData.append("assignedTo", taskData.assignedTo);
      formData.append("assignedToName", taskData.assignedToName);

      taskData.documents.forEach((doc) => {
        formData.append("documents", doc.file);
      });

      const res = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create task");
      }

      const newTask = await res.json();
      console.log("newtask",newTask)
      setTasks((prev) => [...prev, newTask]);

    } catch (err) {
      console.error("❌ Error creating task:", err.message);
    }
  };

  const updateTask = (id, taskData) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === id ? { ...task, ...taskData } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      createTask,
      updateTask,
      deleteTask,
      filters,
      setFilters,
      sortBy,
      setSortBy
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
