'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSearch, FaStar } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    apiClient.get('/api/products')
      .then(res => setProducts(res.data.products.data))
      .catch(() => setError('فشل في جلب المنتجات.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200 animate-pulse text-lg" dir="rtl">
        <svg className="w-10 h-10 animate-spin mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" className="opacity-75" />
        </svg>
        جاري التحميل...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500" dir="rtl">
        <p className="text-lg">{error}</p>
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

      {/* Section Title */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            تصفح <span className="text-blue-500">منتجاتنا</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            اكتشف مجموعتنا المتنوعة من المنتجات عالية الجودة المصممة لكل الأذواق.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="flex justify-center mb-10 px-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="ابحث في المنتجات..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
      </div>

      {/* Products Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img
                  src={`http://localhost:8000/storage/${product.image}`}
                  alt={product.name || 'صورة المنتج'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center">
                  <FaStar className="w-3 h-3 mr-1" /> جديد
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-blue-500 transition-colors">
                    {product.name || 'منتج بدون عنوان'}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 text-center text-sm">
                    {product.description || 'لا يوجد وصف متاح.'}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-500">
                    {product.price !== undefined ? `${product.price.toLocaleString()} د.إ` : 'السعر غير متاح'}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center"
                  >
                    التفاصيل
                    <svg
                      className="mr-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center p-12 bg-gray-800 rounded-lg shadow-md">
              <FaSearch className="w-12 h-12 text-gray-500 mb-4 mx-auto" />
              <p className="text-xl font-medium text-gray-400">
                لا توجد منتجات تطابق "<span className="text-blue-500">{searchTerm}</span>"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}