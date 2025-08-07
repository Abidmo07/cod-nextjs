"use client";

import apiClient from "@/app/axios"; // Ensure this path is correct for your project
import { useParams } from "next/navigation"; // For accessing route parameters
import React, { useEffect, useState } from "react";
import Link from "next/link"; // For navigation
import { FaSearch, FaExclamationTriangle, FaAngleRight } from "react-icons/fa"; // Importing necessary icons

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState(""); // To display the category title

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch category details and its products
        const res = await apiClient.get(`/api/categories/${categoryId}`);
        setCategoryProducts(res.data.Category_products);
        // Set category name for title, with a fallback if not available
        setCategoryName(res.data.category?.name || "التصنيف");
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError("فشل في جلب المنتجات لهذا التصنيف.");
        setCategoryName("خطأ"); // Indicate error in category title
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    } else {
      setLoading(false); // If no categoryId, stop loading
      setError("معرف التصنيف غير موجود.");
      setCategoryName("خطأ");
    }
  }, [categoryId]);

  // --- Loading State (Dark Theme) ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 font-sans" dir="rtl">
        <svg className="animate-spin h-12 w-12 text-yellow-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 8.015v-4.707z"></path>
        </svg>
        <p className="text-lg text-gray-300">جارٍ تحميل المنتجات...</p>
      </div>
    );
  }

  // --- Error State (Dark Theme) ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 font-sans" dir="rtl">
        <FaExclamationTriangle className="text-red-400 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-red-400 mb-2">خطأ</h1>
        <p className="text-red-400 text-lg text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-300 ease-in-out"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-x-hidden font-sans"
      dir="rtl"
    >
      {/* Floating Blobs - Key visual elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* --- Header/Navbar --- */}
      <header className="relative z-10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
              متجر الأناقة
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">الرئيسية</a>
            <a href="/products" className="text-gray-300 hover:text-white transition-colors">منتجاتنا</a>
            {/* Active link for Categories is highlighted */}
            <a href="/categories" className="text-gray-300 hover:text-white transition-colors font-semibold text-yellow-400">التصنيفات</a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">عن المتجر</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">تواصل معنا</a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-800 border border-gray-700">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </button>
        </div>
      </header>

      {/* --- Page Title Section --- */}
      <section className="text-center pt-24 pb-16 px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          استكشف <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500">منتجات</span> {categoryName}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          تصفح أحدث الساعات والإكسسوارات الفاخرة من تصنيف: <span className="text-yellow-400 font-semibold">{categoryName}</span>
        </p>
      </section>

      {/* --- Products Grid - Using User's Provided Card Structure --- */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid with specified classes, including auto-rows-fr for consistent height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-8 pb-20">
          {categoryProducts.map((product) => (
            
            <div
              key={product.id}
             
              // Applying the user's provided card structure and classes
              className="group relative flex flex-col h-full bg-gradient-to-br from-gray-850/95 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Hover gradient overlay as specified */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-purple-500/15 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>

              {/* Image section - using h-48 as requested */}
              <div className="h-48 bg-gray-800 overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${product.image}`}
                  alt={product.name || 'Product Image'} // Fallback for alt text
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy" // Performance optimization
                />
              </div>

              {/* Details section */}
              <div className="p-6 flex-1 flex flex-col justify-between"> {/* flex-1 and justify-between for layout */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300 text-center">
                  {product.name || 'Untitled Product'} {/* Fallback for name */}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed text-center">
                  {product.description || 'No description available.'} {/* Fallback for description */}
                </p>

                {/* Footer: price above button */}
                <div className="mt-auto flex flex-col items-center gap-3">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                    {product.price !== undefined ? `${product.price} دج` : 'Price unavailable'}
                  </span>
                  {/* Button using the user's provided style */}
                  <Link
                    href={`/products/${product.id}`}
                    className="px-5 py-2.5 bg-gray-700 hover:bg-yellow-400 text-white hover:text-gray-900 font-medium rounded-lg transition-colors flex items-center"
                  >
                    عرض التفاصيل
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

          {/* Empty state message */}
          {categoryProducts.length === 0 && (
            <div className="col-span-full text-center p-12 bg-gray-800/70 rounded-2xl border border-gray-700 flex flex-col items-center">
              {/* Using FaSearch icon as a generic indicator for no results */}
              <FaSearch className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-xl font-medium text-gray-400">
                لا توجد منتجات في تصنيف "<span className="text-yellow-400 font-bold">{categoryName}</span>".
              </p>
              <p className="text-gray-500 mt-2">
                نعتذر، يبدو أنه لا توجد منتجات معروضة حاليًا لهذا التصنيف.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Footer --- */}
      {/* Re-using the consistent footer from previous examples */}
      <footer className="pt-16 pb-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Footer Column 1: Logo & Social */}
            <div>
              <div className="flex items-center space-x-reverse space-x-2 mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-xl font-bold">متجر الأناقة</h3>
              </div>
              <p className="text-gray-400 mb-6">
                متجر متخصص في بيع الساعات والأكسسوارات الفاخرة بجودة عالية.
              </p>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                    <span className="sr-only">Social media link {i}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Footer Column 2: Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">الروابط</h4>
              <ul className="space-y-4">
                {['الرئيسية', 'المنتجات', 'التصنيفات', 'عن المتجر', 'تواصل معنا'].map((item) => (
                  <li key={item}>
                    <a href={item === 'الرئيسية' ? '/' : `#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-yellow-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Column 3: Categories (Placeholder for this page context) */}
            <div>
              <h4 className="text-lg font-bold mb-6">التصنيفات</h4>
              <ul className="space-y-4">
                {['ساعات رجالية', 'ساعات نسائية', 'أساور', 'قلائد', 'خواتم'].slice(0, 5).map((catName, index) => (
                  <li key={index}>
                    <a href="/categories" className="text-gray-400 hover:text-yellow-400 transition-colors">{catName}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Column 4: Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">اتصل بنا</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  الجزائر العاصمة
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +213 555 123 456
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@store.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} متجر الأناقة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}