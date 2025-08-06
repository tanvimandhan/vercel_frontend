import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
   
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://vercel-backend-2-aznm.onrender.com/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log(1)
      const res = await axios.post('https://vercel-backend-2-aznm.onrender.com/api/auth/login', {
        email,
        password,
      });

      
      
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        console.log(res.data.user)
        //console.log(user)
        navigate('/dashboard'); // Add this line
        return { success: true };
    
    } catch (err) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      const res = await axios.post('https://vercel-backend-2-aznm.onrender.com/api/auth/register', {
        email,
        password,
        name,
      });

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  const createTask = async (taskData) => {
    const res = await fetch('https://vercel-backend-2-aznm.onrender.com/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        throw new Error('Failed to create task');
      }

      return await res.json();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading,createTask }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

