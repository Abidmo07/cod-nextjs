'use client';
import { useEffect, useState } from 'react';
import apiClient from './axios'; // Ensure this path is correct for your project
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products
    apiClient.get('api/products')
      .then(res => setProducts(res.data.products.data))
      .catch(err => console.error('Error fetching products:', err));

    // Fetch categories
    apiClient.get('api/categories')
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden" dir="rtl">
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Navbar */}
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
            <a href="/" className="text-gray-300 hover:text-white">الرئيسية</a>
            <a href="/products" className="text-gray-300 hover:text-white">منتجاتنا</a>
            <a href="/categories" className="text-gray-300 hover:text-white">التصنيفات</a>
            <a href="/about" className="text-gray-300 hover:text-white">عن المتجر</a>
            <a href="/contact" className="text-gray-300 hover:text-white">تواصل معنا</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-800">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text Content */}
          <div className="text-center lg:text-right space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm">عروض جديدة</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              اكتشف عالم <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">الأناقة</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mr-0">
              ساعات وأكسسوارات فاخرة تُعبّر عن أناقتك وشخصيتك بأسلوب عصري ومبتكر
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-1 text-center"
              >
                تسوق الآن
              </a>
           
            </div>
          </div>
          
   
        </div>
      </section>

      {/* Categories Section - Redesigned */}
      <section id="التصنيفات" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              تصفح <span className="text-yellow-400">التصنيفات</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              اكتشف مجموعاتنا المختارة بعناية من ساعات وأكسسوارات فاخرة
            </p>
          </div>
          
          {/* Category Cards Grid */}
          {/* Changed grid layout to lg:grid-cols-4 for better spacing with new card design */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.id}`} 
                key={category.id} 
                className="group relative bg-gray-850/90 rounded-2xl p-6 border border-gray-700 shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Interactive Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Category Initial */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-yellow-400 to-purple-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <span className="text-xl font-bold text-gray-900">
                    {category.name.charAt(0)}
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="text-center font-bold text-lg group-hover:text-yellow-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="المنتجات" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              أحدث <span className="text-yellow-400">المنتجات</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              مجموعة مختارة من أحدث الساعات والأكسسوارات الموجودة في المتجر
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {  products.slice(0,3).map((product) => (
              <div 
                key={product.id} 
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 hover:border-yellow-400/30 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:8000/storage/${product.image}`} // Ensure this path is correct
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                    جديد
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                      {product.price} دج
                    </span>
                    <a 
                      href={`/products/${product.id}`} 
                      className="px-5 py-2.5 bg-gray-700 hover:bg-yellow-400 text-white hover:text-gray-900 font-medium rounded-lg transition-colors flex items-center"
                    >
                      عرض التفاصيل
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/products"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-700 text-white rounded-xl hover:border-yellow-400 transition-colors"
            >
              تصفح جميع المنتجات
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ابدأ رحلتك نحو الأناقة اليوم
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              اشترك في نشرتنا البريدية للحصول على آخر العروض والمنتجات الجديدة
            </p>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="flex-grow px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                متجر متخصص في بيع الساعات والأكسسوارات الفاخرة بجودة عالية
              </p>
            
            </div>
            
            {/* Footer Column 2: Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">الروابط</h4>
              <ul className="space-y-4">
                {['الرئيسية', 'المنتجات', 'العروض', 'من نحن', 'اتصل بنا'].map((item) => (
                  <li key={item}>
                    <a href={`#${item === 'الرئيسية' ? 'hero' : item.toLowerCase()}`} className="text-gray-400 hover:text-yellow-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Footer Column 3: Categories */}
            <div>
              <h4 className="text-lg font-bold mb-6">التصنيفات</h4>
              <ul className="space-y-4">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <a href={`#categories`} className="text-gray-400 hover:text-yellow-400 transition-colors">{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Footer Column 4: Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">اتصل بنا</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  الجزائر العاصمة
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +213 555 123 456
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@store.com
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} متجر الأناقة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}