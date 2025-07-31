'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaEdit, FaArrowLeft, FaImage, FaCalendarAlt, FaTag, FaClock } from 'react-icons/fa';

export default function CategoryShow() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get(`/api/categories/${categoryId}`)
      .then(res => {
        setCategory(res.data.category);
        console.log(res.data.category);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load category details');
        setLoading(false);
        console.error(err);
      });
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative">
          {/* Main spinner */}
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          {/* Inner decorative ring */}
          <div className="absolute inset-2 w-12 h-12 border-2 border-purple-200 border-b-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-red-100">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <Link 
            href="/admin/categories"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaArrowLeft className="mr-3" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/categories"
          className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Categories</span>
        </Link>
        
        <Link
          href={`/admin/categories/update/${category.id}`}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaEdit className="text-lg" />
          Edit Category
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          {category.image ? (
            <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
              <img
                src={`http://localhost:8000/storage/${category.image}`}
                alt={`${category.name} Category`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
                      <FaTag className="text-white/80 mr-2" />
                      <span className="text-white/90 text-sm font-medium">Category ID: {category.id}</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white mb-4 leading-tight">{category.name}</h1>
                    <p className="text-white/80 text-lg">Manage and organize your products efficiently</p>
                  </div>
                  <div className="w-36 h-36 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <img
                      src={`http://localhost:8000/storage/${category.image}`}
                      alt={`${category.name} Icon`}
                      className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-96 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
                      <FaTag className="text-white/80 mr-2" />
                      <span className="text-white/90 text-sm font-medium">Category ID: {category.id}</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white mb-4 leading-tight">{category.name}</h1>
                    <p className="text-white/80 text-lg">Manage and organize your products efficiently</p>
                  </div>
                  <div className="w-36 h-36 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <FaImage className="text-5xl text-white/60" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-10">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Category Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaTag className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Category Information</h3>
              </div>
              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-blue-200/50">
                  <span className="text-lg font-medium text-gray-600">Name</span>
                  <span className="text-lg font-bold text-gray-800">{category.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200/50">
                  <span className="text-lg font-medium text-gray-600">ID</span>
                  <span className="text-lg font-bold text-gray-800">#{category.id}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-medium text-gray-600">Status</span>
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaClock className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Timeline</h3>
              </div>
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendarAlt className="text-purple-500" />
                    <span className="text-lg font-semibold text-gray-700">Created</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {new Date(category.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaClock className="text-purple-500" />
                    <span className="text-lg font-semibold text-gray-700">Last Updated</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    {new Date(category.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Image Preview */}
          {category.image && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaImage className="text-gray-600" />
                Image Preview
              </h3>
              <div className="flex justify-center">
                <div className="relative group max-w-2xl">
                  <img
                    src={`http://localhost:8000/storage/${category.image}`}
                    alt={`${category.name} Category Preview`}
                    className="w-full h-auto rounded-3xl shadow-2xl border border-gray-200 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{category.image}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}