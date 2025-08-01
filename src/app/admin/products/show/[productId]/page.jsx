'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  FaArrowLeft, FaImage, FaTags, FaDollarSign, FaBoxes, 
  FaInfoCircle, FaCalendarAlt, FaEdit, FaPalette, FaRuler 
} from 'react-icons/fa';
import apiClient from '@/app/axios';

export default function ProductShow() {
  const router = useRouter();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const IMAGE_BASE_URL = 'http://localhost:8000/storage';

  useEffect(() => {
    const fetchProductAndCategory = async () => {
      setLoading(true);
      setError('');

      try {
        const productRes = await apiClient.get(`/api/products/${productId}`);
        const fetchedProduct = productRes.data.product;
        setProduct(fetchedProduct);

        if (fetchedProduct && fetchedProduct.category_id) {
          const categoriesRes = await apiClient.get('/api/categories');
          const categories = categoriesRes.data.categories || [];
          const category = categories.find(cat => cat.id === fetchedProduct.category_id);
          setCategoryName(category ? category.name : 'Unknown Category');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response?.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product details. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductAndCategory();
    } else {
      setError('Product ID is missing.');
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/30">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-700 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Product</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/admin/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5 shadow-indigo-200"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-6">The requested product could not be found.</p>
          <Link
            href="/admin/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5 shadow-indigo-200"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/30">
          <div className="flex items-center mb-4 md:mb-0">
            <Link 
              href="/admin/products" 
              className="text-indigo-600 hover:text-indigo-800 mr-4 transition-colors p-2 rounded-full hover:bg-white/50"
            >
              <FaArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                {product.name}
              </h1>
              <p className="text-gray-500 text-base mt-1">Product ID: {product.id}</p>
            </div>
          </div>
          <Link
            href={`/admin/products/update/${productId}`}
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 shadow-indigo-200"
          >
            <FaEdit className="mr-2 h-4 w-4" /> Edit Product
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image Card */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6 flex flex-col">
            <div className="flex flex-col items-center">
              {product.image ? (
                <div className="relative w-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img
                    src={`${IMAGE_BASE_URL}/${product.image}`}
                    alt={product.name}
                    className="w-full h-96 object-contain rounded-2xl mb-4 shadow-lg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholder-product.jpg';
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 shadow-lg border-2 border-dashed border-gray-300">
                  <FaImage className="text-gray-400 text-6xl" />
                </div>
              )}
              
              <div className="w-full mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <p className="text-sm text-indigo-600">Category</p>
                    <p className="font-semibold text-gray-900">{categoryName}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <p className="text-sm text-purple-600">Last Updated</p>
                    <p className="font-semibold text-gray-900">{formatDate(product.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3 flex items-center">
                <FaInfoCircle className="mr-3 text-indigo-500" /> Product Description
              </h2>
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description || 'No description provided for this product.'}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg border border-emerald-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 rounded-xl bg-emerald-500 shadow-md flex items-center justify-center">
                    <FaDollarSign className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-700">Price</p>
                    <p className="text-3xl font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-emerald-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-700">Discount Price</span>
                    <span className="font-medium text-gray-900">
                      {product.discount_price 
                        ? `$${parseFloat(product.discount_price).toFixed(2)}` 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 rounded-xl bg-amber-500 shadow-md flex items-center justify-center">
                    <FaBoxes className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-700">Stock Quantity</p>
                    <p className={`text-3xl font-bold ${
                      product.quantity > 10 ? 'text-emerald-600' :
                      product.quantity > 0 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-amber-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-700">Status</span>
                    <span className={`font-medium ${
                      product.quantity > 10 ? 'text-emerald-600' :
                      product.quantity > 0 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {product.quantity > 10 ? 'In Stock' :
                       product.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaInfoCircle className="mr-3 text-blue-500" /> Additional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/60 rounded-xl">
                    <FaRuler className="text-blue-500 text-xl mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Dimensions</p>
                      <p className="font-medium text-gray-900">
                        {product.dimensions || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/60 rounded-xl">
                    <FaPalette className="text-blue-500 text-xl mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-medium text-gray-900">
                        {product.color || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamp Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-500" /> Product Timeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <p className="text-sm text-purple-600">Created</p>
                  <p className="font-semibold text-gray-900">{formatDate(product.created_at)}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                  <p className="text-sm text-indigo-600">Last Updated</p>
                  <p className="font-semibold text-gray-900">{formatDate(product.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}