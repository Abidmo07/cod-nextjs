'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle, FaHome, FaExclamationTriangle } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ThankYou() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wilaya, setWilaya] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiClient.get(`/api/orders/${orderId}`);
        console.log('تم جلب الطلب:', res.data);
        setOrder(res.data.order);
        setWilaya(res.data.wilayaOrder);
      } catch (err) {
        console.error('خطأ في جلب الطلب:', err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!order || !order.wilaya) return;
    if (order.wilaya === wilaya.name) {
      if (order.delivery_method === 'home') {
        setDeliveryPrice(wilaya.home_delivery_price || 0);
      } else {
        setDeliveryPrice(wilaya.desk_delivery_price || 0);
      }
    }
  }, [order, wilaya]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200 animate-pulse text-lg" dir="rtl">
        <svg className="w-10 h-10 animate-spin mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" className="opacity-75" />
        </svg>
        جاري تحميل تفاصيل الطلب...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-red-500" dir="rtl">
        <FaExclamationTriangle className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-2">الطلب غير موجود</h1>
        <p className="text-lg text-center">تعذر استرجاع تفاصيل الطلب. يرجى التحقق من معرف الطلب أو المحاولة لاحقًا.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all flex items-center"
        >
          <FaHome className="mr-2 w-5 h-5" /> العودة إلى الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased" dir="rtl">
      {/* Floating gradient blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Navbar */}
    <Navbar />

      {/* Order Confirmation Section */}
      <section className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-gray-800 rounded-lg shadow-md max-w-lg w-full p-8 space-y-8 text-center">
          {/* Success Icon and Heading */}
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-blue-500 w-20 h-20 mb-4 animate-bounce" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-200">شكرًا على طلبك!</h1>
            <p className="text-lg text-gray-400 mt-2">تم تأكيد طلبك بنجاح.</p>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-700 rounded-lg p-6 text-right space-y-4 border border-gray-600">
            <h2 className="text-xl font-bold text-gray-200 mb-4 border-b pb-3 border-gray-500">ملخص الطلب</h2>
            <div className="flex justify-between items-center border-b pb-3 border-gray-600">
              <span className="text-gray-400 font-medium">المنتج:</span>
              <span className="font-semibold text-gray-200">{order.product?.name || 'غير متوفر'}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3 border-gray-600">
              <span className="text-gray-400 font-medium">الكمية:</span>
              <span className="font-semibold text-gray-200">{order.quantity || 'غير متوفر'}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3 border-gray-600">
              <span className="text-gray-400 font-medium">طريقة التوصيل:</span>
              <span className="font-semibold text-gray-200">
                {order.delivery_method === 'home' ? 'توصيل للمنزل' : 'استلام من المكتب'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-3 border-gray-600">
              <span className="text-gray-400 font-medium">سعر التوصيل:</span>
              <span className="font-semibold text-gray-200">{deliveryPrice.toLocaleString()} د.إ</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3 border-gray-600">
              <span className="text-gray-400 font-medium">سعر المنتج:</span>
              <span className="font-semibold text-gray-200">{order.product?.price?.toLocaleString() || 'غير متوفر'} د.إ</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-400 font-bold text-xl">الإجمالي:</span>
              <span className="font-extrabold text-blue-500 text-2xl">{order.total_price?.toLocaleString() || 'غير متوفر'} د.إ</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <button
            onClick={() => router.push('/')}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaHome className="w-5 h-5" /> متابعة التسوق
          </button>
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}