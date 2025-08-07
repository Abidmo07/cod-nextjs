'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaShapes,
  FaFilter,
  FaSortAmountDown,
} from 'react-icons/fa';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/api/categories')
      .then(res => {
        setCategories(res.data.categories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = id => {
    if (!confirm('هل أنت متأكد من حذف هذه الفئة؟')) return;
    apiClient.delete(`/api/category/${id}`)
      .then(() => setCategories(cats => cats.filter(c => c.id !== id)));
  };

  // Apply sorting
  const sorted = [...categories];
  if (sortConfig.key) {
    sorted.sort((a, b) => {
      const dir = sortConfig.direction === 'asc' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -1 * dir;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1 * dir;
      return 0;
    });
  }
  // Apply filtering
  const filtered = sorted.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle sort direction helper
  const toggleSort = key => {
    setSortConfig(sc => ({
      key,
      direction:
        sc.key === key && sc.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-end gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <FaShapes className="text-white text-xl"/>
              </div>
              إدارة الفئات
            </h1>
            <p className="text-gray-600 text-lg">
              إدارة وتنظيم جميع فئات المحتوى
            </p>
          </div>
          
          <Link
            href="/admin/categories/create"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <FaPlus className="text-lg transition-transform group-hover:rotate-90 duration-300" />
            <span className="font-semibold">إنشاء فئة جديدة</span>
          </Link>
        </div>

        {/* Enhanced Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="ابحث في الفئات..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-100 focus:border-indigo-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg placeholder-gray-400"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-600">
                <FaFilter className="text-sm" />
                <span className="text-sm font-medium">ترتيب:</span>
              </div>
              
              <button
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  sortConfig.key === 'name'
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <FaSortAmountDown className="text-sm" />
                الاسم
                {sortConfig.key === 'name' && (
                  <div className="ml-1">
                    {sortConfig.direction === 'asc'
                      ? <FaChevronUp className="w-3 h-3"/>
                      : <FaChevronDown className="w-3 h-3"/>}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              عرض <span className="font-semibold text-indigo-600">{filtered.length}</span> من أصل <span className="font-semibold">{categories.length}</span> فئة
            </p>
          </div>
        </div>

        {/* Enhanced Categories Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((cat, index) => (
              <div
                key={cat.id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 p-8 flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Category Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                        {cat.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          ID: {cat.id}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <FaShapes className="text-indigo-500 text-lg" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <Link
                    href={`/admin/categories/show/${cat.id}`}
                    className="group/btn relative p-3 bg-blue-50 hover:bg-blue-500 rounded-2xl transition-all duration-200 overflow-hidden"
                    title="عرض التفاصيل"
                  >
                    <div className="absolute inset-0 bg-blue-500 transform scale-0 group-hover/btn:scale-100 transition-transform duration-200 rounded-2xl"></div>
                    <FaEye className="relative z-10 text-blue-600 group-hover/btn:text-white transition-colors duration-200" />
                  </Link>
                  
                  <Link
                    href={`/admin/categories/update/${cat.id}`}
                    className="group/btn relative p-3 bg-emerald-50 hover:bg-emerald-500 rounded-2xl transition-all duration-200 overflow-hidden"
                    title="تعديل"
                  >
                    <div className="absolute inset-0 bg-emerald-500 transform scale-0 group-hover/btn:scale-100 transition-transform duration-200 rounded-2xl"></div>
                    <FaEdit className="relative z-10 text-emerald-600 group-hover/btn:text-white transition-colors duration-200" />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="group/btn relative p-3 bg-red-50 hover:bg-red-500 rounded-2xl transition-all duration-200 overflow-hidden"
                    title="حذف"
                  >
                    <div className="absolute inset-0 bg-red-500 transform scale-0 group-hover/btn:scale-100 transition-transform duration-200 rounded-2xl"></div>
                    <FaTrash className="relative z-10 text-red-600 group-hover/btn:text-white transition-colors duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                لا توجد نتائج
              </h3>
              <p className="text-gray-500 text-lg">
                لم يتم العثور على فئات تطابق "<span className="font-semibold text-gray-700">{searchTerm}</span>"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors duration-200"
              >
                إعادة تعيين البحث
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}