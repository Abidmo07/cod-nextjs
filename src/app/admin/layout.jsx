'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaBoxOpen,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaBell,
} from 'react-icons/fa';
import { MdCategory } from "react-icons/md";
import apiClient from '../axios';

export default function AdminLayout({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch user on load
  useEffect(() => {
    apiClient.get('/api/user')
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        router.replace('/auth/login');
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
      router.replace('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navItems = [
    { href: '/admin/products', icon: FaBoxOpen, label: 'Products' },
    { href: '/admin/orders', icon: FaClipboardList, label: 'Orders' },
    { href: '/admin/dashboard', icon: FaChartLine, label: 'Analytics' },
    { href: '/admin/categories', icon: MdCategory, label: 'Categories' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 to-gray-800
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
      `}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">AdminHub</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}
                  `}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          {user && (
            <div className="relative p-4 border-t border-gray-700">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center w-full gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/50 text-gray-300 hover:text-white"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-white text-xl" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute bottom-16 left-4 right-4 bg-gray-800 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <FaBars className="text-xl" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
