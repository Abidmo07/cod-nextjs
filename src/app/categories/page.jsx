"use client";

import { useEffect, useState } from "react";
import apiClient from "@/app/axios";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    apiClient.get("/api/categories")
      .then(res => setCategories(res.data.categories))
      .catch(() => setError("فشل في جلب التصنيفات."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-gray-400">جارٍ التحميل…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden relative"
      dir="rtl"
    >
      {/* Floating Blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Section Title */}
      <div className="text-center pt-24 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          تصفح <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">التصنيفات</span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-xl mx-auto">
          اكتشف مجموعاتنا المختارة بعناية من ساعات وأكسسوارات فاخرة
        </p>
      </div>

     
    

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="group relative bg-gray-850/90 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
            
            {/* Image */}
            <div className="h-48 bg-gray-800 overflow-hidden">
              <img
                src={`http://localhost:8000/storage/${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Name */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
                {cat.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
