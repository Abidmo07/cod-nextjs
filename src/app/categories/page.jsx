'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get('/api/categories')
      .then(res => setCategories(res.data.categories))
      .catch(() => setError('فشل في جلب التصنيفات.'))
      .finally(() => setLoading(false));
  }, []);

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
            تصفح <span className="text-blue-500">التصنيفات</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            استكشف مجموعة واسعة من التصنيفات لتلبية جميع احتياجاتك وأذواقك.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="group bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={`http://localhost:8000/storage/${cat.image}`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-200 group-hover:text-blue-500 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">استكشف الآن</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}