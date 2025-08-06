import { useState } from 'react';
import HeaderComp from '../components/layout/HeaderComp';
import SidebarComp from '../components/SidebarComp';
// //import { Header } from '@/components/layout/Header';
// import { TaskList } from '@/components/tasks/TaskList';
// import { UserManagement } from '@/components/users/UserManagement';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className=" flex min-h-screen bg-background w-full">
      <HeaderComp/>
      <SidebarComp/>
      {/* <div >      
        <main className="container mx-auto px-4 py-6">
          <p>tasklist</p>
          <p>usermanagement</p>
        </main> */}
      {/* </div> */}
    </div>
    
  );
}