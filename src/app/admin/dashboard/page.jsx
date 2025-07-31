  'use client';

  import { useRouter } from 'next/navigation';
  import { useEffect, useState } from 'react';
  import apiClient from '@/app/axios';
  import {
    FaShoppingCart,
    FaBox,
    FaUsers,
    FaChartLine,
    FaArrowUp,
    FaArrowDown,
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
  } from 'react-icons/fa';

  export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user,setUser]=useState()
     useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get('/api/user')
        .then(res => setUser(res.data))
        .catch(() => router.replace('/auth/login'))
        .finally(() => setLoading(false));
    });
  }, []);
  

    
    // Mock data for dashboard stats
    const stats = [
      {
        title: 'إجمالي الطلبات',
        value: '1,284',
        change: '+12.5%',
        trend: 'up',
        icon: FaShoppingCart,
        color: 'from-blue-500 to-blue-600',
      },
      {
        title: 'المنتجات النشطة',
        value: '356',
        change: '+8.2%',
        trend: 'up',
        icon: FaBox,
        color: 'from-purple-500 to-purple-600',
      },
      {
        title: 'العملاء الجدد',
        value: '89',
        change: '-3.1%',
        trend: 'down',
        icon: FaUsers,
        color: 'from-green-500 to-green-600',
      },
      {
        title: 'الإيرادات',
        value: '45,231 ر.س',
        change: '+15.3%',
        trend: 'up',
        icon: FaChartLine,
        color: 'from-orange-500 to-orange-600',
      },
    ];

    const recentOrders = [
      { id: '#12345', customer: 'أحمد محمد', amount: '250 ر.س', status: 'completed', time: 'منذ 5 دقائق' },
      { id: '#12346', customer: 'فاطمة علي', amount: '180 ر.س', status: 'pending', time: 'منذ 15 دقيقة' },
      { id: '#12347', customer: 'عبدالله سعد', amount: '420 ر.س', status: 'processing', time: 'منذ ساعة' },
      { id: '#12348', customer: 'نورة خالد', amount: '95 ر.س', status: 'completed', time: 'منذ ساعتين' },
    ];

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed':
          return <FaCheckCircle className="text-green-500" />;
        case 'pending':
          return <FaClock className="text-yellow-500" />;
        case 'processing':
          return <FaExclamationCircle className="text-blue-500" />;
        default:
          return null;
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'completed':
          return 'مكتمل';
        case 'pending':
          return 'قيد الانتظار';
        case 'processing':
          return 'قيد المعالجة';
        default:
          return status;
      }
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">جارٍ التحميل...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name}! 👋</h1>
          <p className="text-blue-100">
            إليك نظرة عامة على أداء متجرك اليوم
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <span className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">الطلبات الأخيرة</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/products/new')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              >
                إضافة منتج جديد
              </button>
              <button
                onClick={() => router.push('/admin/orders')}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:border-gray-300 transition-all duration-200 font-medium"
              >
                عرض جميع الطلبات
              </button>
              <button
                onClick={() => router.push('/admin/analytics')}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:border-gray-300 transition-all duration-200 font-medium"
              >
                تقارير التحليلات
              </button>
            </div>

            {/* Activity Feed */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-600 mb-3">النشاط الأخير</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="flex-1 text-sm">
                    <p className="text-gray-700">تم إضافة منتج جديد</p>
                    <p className="text-gray-500 text-xs">منذ 10 دقائق</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <div className="flex-1 text-sm">
                    <p className="text-gray-700">طلب جديد #12349</p>
                    <p className="text-gray-500 text-xs">منذ 25 دقيقة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                  <div className="flex-1 text-sm">
                    <p className="text-gray-700">تحديث المخزون</p>
                    <p className="text-gray-500 text-xs">منذ ساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }