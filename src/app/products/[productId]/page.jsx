'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShoppingCart, FaUser, FaPhoneAlt, FaBoxOpen, FaShippingFast, FaCoins } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ProductDetails() {
  const router = useRouter();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [wilayas, setWilayas] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderData, setOrderData] = useState({
    customer_name: '',
    phone: '',
    wilaya: '',
    address: '',
    product_id: productId,
    quantity: 1,
    delivery_method: 'home',
    total_price: totalPrice,
  });

  // Fetch product & wilayas
  useEffect(() => {
    apiClient.get(`api/products/${productId}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error('خطأ في جلب المنتج:', err));

    apiClient.get('api/wilayas')
      .then((res) => setWilayas(res.data.wilayas))
      .catch((err) => console.error('خطأ في جلب الولايات:', err));
  }, [productId]);

  // Calculate delivery
  useEffect(() => {
    if (!orderData.wilaya) {
      setDeliveryPrice(0);
      return;
    }
    const w = wilayas.find((w) => w.name === orderData.wilaya);
    if (!w) return;
    setDeliveryPrice(
      orderData.delivery_method === 'home'
        ? w.home_delivery_price || 0
        : w.desk_delivery_price || 0
    );
  }, [orderData.wilaya, orderData.delivery_method, wilayas]);

  // Calculate total
  useEffect(() => {
    if (!product) return;
    setTotalPrice(Number(product.price) * Number(orderData.quantity) + Number(deliveryPrice));
    setOrderData((prev) => ({ ...prev, total_price: totalPrice }));
  }, [product, orderData.quantity, deliveryPrice, totalPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post('api/order', orderData)
      .then((res) => {
        console.log('تم إنشاء الطلب:', res.data.order.id);
        router.push(`/orders/${res.data.order.id}`);
      })
      .catch((err) => console.error('خطأ في إرسال الطلب:', err));
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200 animate-pulse text-lg" dir="rtl">
        <svg className="w-10 h-10 animate-spin mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" className="opacity-75" />
        </svg>
        جاري تحميل تفاصيل المنتج...
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

      {/* Product Details Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Column: Order Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-md space-y-6">
            <h2 className="text-xl font-bold flex items-center text-gray-200">
              <FaShoppingCart className="mr-2 text-blue-500" />
              املأ البيانات للتوصيل
            </h2>

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={orderData.customer_name}
                onChange={e =>
                  setOrderData({ ...orderData, customer_name: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FaPhoneAlt className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                type="tel"
                placeholder="رقم الهاتف"
                value={orderData.phone}
                onChange={e =>
                  setOrderData({ ...orderData, phone: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                required
              />
            </div>

            {/* Wilaya */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <select
                value={orderData.wilaya}
                onChange={e =>
                  setOrderData({ ...orderData, wilaya: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                required
              >
                <option value="">اختر الولاية</option>
                {wilayas.map(w => (
                  <option key={w.id} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-2 right-3 text-gray-400" />
              <textarea
                placeholder="العنوان التفصيلي"
                rows={3}
                value={orderData.address}
                onChange={e =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
                className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 resize-none"
              />
            </div>

            {/* Quantity & Method */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FaBoxOpen className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={orderData.quantity}
                  onChange={e =>
                    setOrderData({
                      ...orderData,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                  required
                />
              </div>
              <div className="relative">
                <FaShippingFast className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                <select
                  value={orderData.delivery_method}
                  onChange={e =>
                    setOrderData({
                      ...orderData,
                      delivery_method: e.target.value,
                    })
                  }
                  className="w-full pr-10 pl-4 py-3 bg-gray-700 rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                  required
                >
                  <option value="home">توصيل للمنزل</option>
                  <option value="desk">استلام من المكتب</option>
                </select>
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3 border border-gray-600">
                <span className="text-gray-400">سعر التوصيل:</span>
                <span className="font-bold text-gray-200">{deliveryPrice.toLocaleString()} د.إ</span>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3 border border-gray-600">
                <span className="text-gray-400">السعر الإجمالي:</span>
                <span className="font-bold text-blue-500">{totalPrice.toLocaleString()} د.إ</span>
              </div>
            </div>

            {/* Submit */}
            <button className="w-full py-3 bg-blue-500 rounded-lg font-bold text-white hover:bg-blue-600 transition-all">
              إرسال الطلب
            </button>
          </form>

          {/* Right Column: Product Details */}
          <div className="space-y-6">
            <div className="relative h-96 overflow-hidden rounded-lg shadow-md">
              <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name || 'صورة المنتج'}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-200">{product.name || 'منتج بدون عنوان'}</h1>
            <p className="text-gray-400 text-lg">{product.description || 'لا يوجد وصف متاح.'}</p>
            <div className="flex items-baseline space-x-reverse space-x-2">
              <span className="text-3xl font-bold text-blue-500">{product.price?.toLocaleString() || 'غير متوفر'} د.إ</span>
              <FaCoins className="text-blue-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}