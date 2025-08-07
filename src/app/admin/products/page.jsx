'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaPlus, FaSearch, FaFilter, FaEllipsisV, FaEdit, FaTrash, FaEye,
  FaChartBar, FaImage, FaSpinner, FaArrowLeft, FaTags, FaAngleLeft,
  FaAngleRight, FaBoxOpen, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import apiClient from '@/app/axios';
import ReactPaginate from 'react-paginate';

export default function ProductListing() {
  // State management
  const [products, setProducts] = useState([]);
  const [productPagination, setProductPagination] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const IMAGE_BASE_URL = 'http://localhost:8000/storage';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      const pageNumber = currentPage + 1;
      const params = new URLSearchParams({
        page: pageNumber.toString(),
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
      });

      try {
        const res = await apiClient.get(`/api/products?${params.toString()}`);
        setProducts(res.data.products?.data || []);
        setProductPagination(res.data.products || {});
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('يتعذر على الاسترداد المنتجات. يرجى المحاولة لاحقاً');
        setLoading(false);
        setProducts([]);
        setProductPagination({});
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedStatus]);

  const getCategoryName = (id) => {
    if (!id || categories.length === 0) return 'غير مصنف';
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'غير معروف';
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await apiClient.delete(`/api/product/${id}`);
      setProducts(products.filter(pro => pro.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('فشل في حذف المنتج');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">جارٍ تحميل المنتجات</h2>
          <p className="text-gray-500">يرجى الانتظار بينما نستعد مخزونك</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">عذراً! حدث خطأ</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            جرب مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0 && !searchTerm && !selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <FaBoxOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">لا توجد منتجات بعد</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            لم تقم بتحديث منتجات في متجرك بعد. ابدأ بإضافة منتجك الأول.
          </p>
          <Link
            href="/admin/products/create"
            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <FaPlus className="mr-2" />
            أضف منتج أول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">قائمة المنتجات</h1>
          <p className="mt-1 text-sm text-gray-500">إدارة دليل المنتجات ومخزونها</p>
        </div>
        <div className="flex items-center space-x-3">
     
          <Link
            href="/admin/products/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2" />
            منتج جديد
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FaChartBar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">عدد المنتجات الإجمالي</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{productPagination.total || 0}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FaCheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">في المخزون</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {products.filter(p => p.quantity > 0).length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                <FaExclamationTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">الكمية منخفضة</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {products.filter(p => p.quantity > 0 && p.quantity <= 10).length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FaTags className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">التصنيفات</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{categories.length}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                المنتج
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                التصنيف
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                السعر
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                الكمية
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden border border-gray-200">
                      {product.image ? (
                        <img 
                          src={`${IMAGE_BASE_URL}/${product.image}`} 
                          alt={product.name} 
                          className="h-10 w-10 object-cover" 
                          onError={(e) => { 
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = '/placeholder-product.jpg'; 
                          }} 
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 flex items-center justify-center">
                          <FaImage className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">كود: {product.sku || 'غير متوفر'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getCategoryName(product.category_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.price ? `$${parseFloat(product.price).toFixed(2)}` : 'غير متوفر'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${product.quantity > 10 ? 'bg-green-100 text-green-800' : 
                      product.quantity > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    {product.quantity > 0 ? `${product.quantity} متوفر` : 'نفاذ من المخزون'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link 
                      href={`/admin/products/show/${product.id}`} 
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="عرض"
                    >
                      <FaEye className="h-4 w-4" />
                    </Link>
                    <Link 
                      href={`/admin/products/update/${product.id}`} 
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="تعديل"
                    >
                      <FaEdit className="h-4 w-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="حذف"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {productPagination.last_page > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                من <span className="font-medium">{productPagination.from}</span> إلى{' '}
                <span className="font-medium">{productPagination.to}</span> من{' '}
                <span className="font-medium">{productPagination.total}</span> نتيجة
              </p>
            </div>
            <div>
              <ReactPaginate
                previousLabel={<FaAngleLeft className="h-4 w-4" />}
                nextLabel={<FaAngleRight className="h-4 w-4" />}
                breakLabel="..."
                pageCount={productPagination.last_page}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                pageClassName="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                activeClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}