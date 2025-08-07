"use client";

import { useEffect, useState } from "react";
import apiClient from "@/app/axios";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function ProductsPage() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiClient.get("/api/products")
      .then(res => setProducts(res.data.products.data))
      .catch(() => setError("فشل في جلب المنتجات."))
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

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-x-hidden"
      dir="rtl"
    >
      {/* Floating Blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Section Title */}
      <div className="text-center pt-24 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          تصفح <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">منتجاتنا</span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-xl mx-auto">
          اكتشف أحدث الساعات والأكسسوارات الفاخرة
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-10 px-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="ابحث في المنتجات..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-8 pb-20">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col h-full bg-gray-850/90 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none"></div>

              {/* Image */}
              <div className="h-48 bg-gray-800 overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-center">{product.name}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2 text-center">
                  {product.description}
                </p>

                {/* Footer: price above button */}
                <div className="mt-auto flex flex-col items-center gap-3">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-300">
                    {product.price} دج
                  </span>
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

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              لا توجد منتجات تطابق "{searchTerm}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
