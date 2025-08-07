'use client';
import { useEffect, useState } from 'react';
import apiClient from './axios'; // Assuming this path is correct for your project
import Link from 'next/link';
import { FaShoppingBag, FaTags, FaPhone, FaMapMarkerAlt, FaEnvelope, FaChevronDown, FaArrowLeft, FaGift, FaStar } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get('api/products'),
          apiClient.get('api/categories')
        ]);
        setProducts(productsRes.data.products.data);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased" dir="rtl">
      {/* Floating gradient blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-900 rounded-full">
              <FaGift className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-300">عروض حصرية</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              اكتشف <span className="text-blue-500">الجودة</span> في المنتجات
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mr-0">
              تسوق مجموعة مختارة من المنتجات المميزة المصممة لرفع مستوى حياتك بأناقة وعملية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">تسوق الآن</Link>
              <Link href="/products" className="px-8 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-all">عرض المنتجات</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/shop.jpg"
              alt="المنتجات المميزة"
              className="rounded-lg shadow-lg w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6" id="categories">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">تصفح <span className="text-blue-500">التصنيفات</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">استكشف مجموعتنا المتنوعة من التصنيفات المصممة حسب احتياجاتك.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href={`/categories/${category.id}`} key={category.id} className="group bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <div className="w-16 h-16 mb-4 rounded-full bg-blue-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-500">{category.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-blue-500 transition-colors">{category.name}</h3>
                <p className="text-gray-500 text-sm">استكشف الآن</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">أحدث <span className="text-blue-500">المنتجات</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">اكتشف أحدث الإضافات لدينا، المصممة بجودة وابتكار.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="group bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center">
                    <FaStar className="w-3 h-3 mr-1" /> جديد
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-500">{product.price.toLocaleString()} د.إ</span>
                    <Link href={`/products/${product.id}`} className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center">
                      التفاصيل <FaArrowLeft className="mr-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
              عرض جميع المنتجات <FaChevronDown className="mr-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center bg-gray-800 rounded-lg p-10 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">انضم إلى مجتمعنا</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            اشترك في نشرتنا الإخبارية للحصول على عروض حصرية، تحديثات المنتجات الجديدة، ونصائح الأناقة مباشرة إلى بريدك الإلكتروني.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-grow px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">اشترك</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}