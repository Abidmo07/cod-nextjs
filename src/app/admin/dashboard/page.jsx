'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import {
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaListUl,
  FaCheckDouble,
  FaUndoAlt,
  FaDollarSign,
} from 'react-icons/fa';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);

  // analytics computations
  const totalOrders     = orders.length;
  const completedOrders = orders.filter(o => o.status === 'livré').length;
  const retourOrders    = orders.filter(o => o.status === 'retour').length;
  const retourCost="200";
  const loss=orders.filter(o => o.status === 'retour').length*retourCost;
  const Revenue    = orders.filter(o=>o.status === 'livré' ).reduce((sum, o) => sum + Number(o.quantity*o.product.price), 0);
  const totalRevenue=Revenue-loss;

  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get('/api/user')
        .then(res => setUser(res.data))
        .catch(() => router.replace('/auth/login'))
        .finally(() => setLoading(false));
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get('/api/orders');
        setOrders(data.orders.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const calculateDuration = (time) => {
    const now = new Date(), then = new Date(time);
    const mins = Math.floor((now - then) / 60000);
    if (mins < 1) return 'منذ بضع ثوان';
    if (mins < 60) return mins === 1 ? 'منذ دقيقة واحدة' : `منذ ${mins} دقائق`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs === 1 ? 'منذ ساعة واحدة' : `منذ ${hrs} ساعات`;
    const days = Math.floor(hrs / 24);
    return days === 1 ? 'منذ يوم واحد' : `منذ ${days} أيام`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 lg:px-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name}! 👋</h1>
        <p className="text-blue-100">إليك نظرة عامة على أداء متجرك اليوم</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-full">
            <FaListUl className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">إجمالي الطلبات</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-full">
            <FaCheckDouble className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">الطلبات المسلّمة</p>
            <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
          </div>
        </div>

        {/* Returned Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-red-50 rounded-full">
            <FaUndoAlt className="text-red-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">الطلبات المعادة</p>
            <p className="text-2xl font-bold text-gray-900">{retourOrders}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-yellow-50 rounded-full">
            <FaDollarSign className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">إجمالي المبيعات</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalRevenue.toLocaleString()} د.ج
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">الطلبات الأخيرة</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوقت
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orders.slice(-4).map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {order.total_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center gap-2">
                        {order.status === 'livré' && <FaCheckCircle className="text-green-500" />}
                        {order.status === 'retour' && <FaExclamationCircle className="text-red-500" />}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateDuration(order.updated_at)}
                    </td>
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
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition duration-200 font-medium"
            >
              إضافة منتج جديد
            </button>
            <button
              onClick={() => router.push('/admin/orders')}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:border-gray-300 transition duration-200 font-medium"
            >
              عرض جميع الطلبات
            </button>
            <button
              onClick={() => router.push('/admin/analytics')}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:border-gray-300 transition duration-200 font-medium"
            >
              تقارير التحليلات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
