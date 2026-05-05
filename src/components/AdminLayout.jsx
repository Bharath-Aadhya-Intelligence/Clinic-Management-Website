import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ListChecks, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/admin/login" />;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Medicines', icon: ShoppingBag, path: '/admin/medicines' },
    { name: 'Orders', icon: ListChecks, path: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
        <div className="p-8">
          <Link to="/" className="text-xl font-bold text-primary flex items-center space-x-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="h-8 w-8" />
            <span>Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
          </h2>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-primary flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Site
            </Link>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
