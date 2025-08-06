import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { UserForm } from './UserForm';

// Mock users data - replace with actual API calls
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin'  },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user'  },
];

export function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const handleEdit = (userId) => {
    setEditingUser(userId);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleCreateUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleUpdateUser = (userId, userData) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, ...userData } : u
    ));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((userData) => (
          <Card key={userData.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{userData.name}</CardTitle>
                <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                  {userData.role}
                </Badge>
              </div>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(userData.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(userData.id)}
                  className="text-destructive hover:text-destructive"
                  disabled={userData.id === user?.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <UserForm
          userId={editingUser}
          users={users}
          onCreate={handleCreateUser}
          onUpdate={handleUpdateUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}