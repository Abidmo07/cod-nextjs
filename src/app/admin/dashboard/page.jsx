'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch the authenticated user
  useEffect(() => {
    apiClient
      .get('api/user')
      .then(res => setUser(res.data))
      .catch(() => {
        router.replace('/admin/auth/login');
      });
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post('/logout');
      router.replace('/admin/auth/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-800">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {user ? (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">مرحباً، {user.name}!</h2>
            <p className="text-gray-700">
              هذا هو ملخص الطلبات والمنتجات الخاصة بك. قم بإضافة الوظائف الإضافية هنا!
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">جارٍ التحميل...</p>
        )}
      </main>
    </div>
  );
}
