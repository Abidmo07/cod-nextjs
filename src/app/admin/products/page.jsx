'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaPlus, FaSearch, FaFilter, FaEllipsisV, FaEdit, FaTrash, FaEye, FaChartBar, FaImage, FaSpinner, FaArrowLeft, FaTags, FaAngleLeft, FaAngleRight
} from 'react-icons/fa';
import apiClient from '@/app/axios';
import ReactPaginate from 'react-paginate'; // Import react-paginate

export default function ProductListing() {
  // State for fetched products, loading status, and errors
  const [products, setProducts] = useState([]);
  const [productPagination, setProductPagination] = useState({}); // Metadata like current_page, last_page, total, etc.
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Overall loading state
  const [error, setError] = useState('');

  // State for search and filter UI
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // State for pagination control
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is 0-indexed

  const IMAGE_BASE_URL = 'http://localhost:8000/storage';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Optionally set a category error state here
      }
    };
    fetchCategories();
  }, []); // Fetch categories only once

  // Fetch products, reactive to currentPage and filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(''); // Clear previous error

      // Construct URL with pagination and filters
      // IMPORTANT: Ensure your API endpoint supports filtering and pagination via query params
      // API expects 1-indexed page, react-paginate provides 0-indexed 'selected'
      const pageNumber = currentPage + 1;
      const params = new URLSearchParams({
        page: pageNumber.toString(),
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
      });

      try {
        const res = await apiClient.get(`/api/products?${params.toString()}`);
        const fetchedProducts = res.data.products?.data || [];

        console.log('API Response Data:', res.data.products); // Log to inspect pagination keys

        setProducts(fetchedProducts);
        setProductPagination(res.data.products || {}); // Store all pagination meta
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please check your API connection or try again.');
        setLoading(false);
        // Reset products and pagination on error to prevent stale data
        setProducts([]);
        setProductPagination({});
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedStatus]); // Dependencies for re-fetching

  // Helper function to get category name
  const getCategoryName = (id) => {
    if (!id || categories.length === 0) return 'N/A';
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'Unknown Category';
  };

  // Handler for page changes from ReactPaginate
  const handlePageClick = (selectedPage) => {
    // selectedPage.selected is 0-indexed
    setCurrentPage(selectedPage.selected);
  };

  const handleDelete=async(id)=>{
        if (!confirm('Are you sure you want to delete this product?')) return;
    const res=await apiClient.delete(`/api/product/${id}`);
    const productsList=setProducts(products.filter(pro=>pro.id!==id));
    return productsList;
    
    

  }

  // --- Render Logic ---

  // Display loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Display error message if fetching failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <Link
            href="/admin/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Display message if no products are found
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600 mt-2">Manage your product catalog</p>
        <div className="flex items-center justify-center min-h-[50vh] bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center">
            <FaImage className="text-gray-400 text-6xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">Your product catalog is empty. Add your first product to get started!</p>
            <Link
              href="/admin/products/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            >
              <FaPlus className="mr-2" />
              Add Your First Product
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content Rendering ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <FaFilter className="mr-2 text-gray-500" />
            Filters
          </button>
          <Link
            href="/admin/products/create"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
          >
            <FaPlus className="mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-5 border border-blue-100/50 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-xl">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{productPagination.total || 0}</p> {/* Dynamic total */}
            </div>
          </div>
        </div>
        {/* ... other stats cards remain placeholders ... */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-5 border border-green-100/50 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-xl">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">118</p> {/* Placeholder */}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-5 border border-amber-100/50 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-amber-500 rounded-xl">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">9</p> {/* Placeholder */}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-5 border border-purple-100/50 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 rounded-xl">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p> {/* Dynamic count */}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {filterOpen && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaSearch className="text-gray-400" /></div>
                <input
                  type="text"
                  placeholder="Search by name, SKU..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0); // Reset to first page on search term change
                  }}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
                />
              </div>
            </div>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(0); // Reset to first page when filter changes
                }}
                className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm appearance-none relative"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
           
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center"><FaTags className="mr-1 text-gray-500" /> Category</div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-4  text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-gray-200">
                        {product.image ? (
                          <img src={`${IMAGE_BASE_URL}/${product.image}`} alt={product.name} className="h-12 w-12 object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder-product.jpg'; }} />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 flex items-center justify-center"><FaImage className="text-gray-400" /></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap"><div className="text-sm text-gray-900">{getCategoryName(product.category_id) || 'N/A'}</div></td>
                  <td className="px-6 py-5 whitespace-nowrap"><div className="text-sm font-semibold text-gray-900">{product.price ? `$${product.price}` : 'N/A'}</div></td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${product.quantity > 10 ? 'bg-green-100 text-green-800' : product.quantity > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {typeof product.quantity === 'number' && product.quantity >= 0 ? `${product.quantity} in stock` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/products/show/${product.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><FaEye /></Link>
                      <Link href={`/admin/products/update/${product.id}`} className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"><FaEdit /></Link>
                      <button onClick={()=>handleDelete(product.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><FaTrash /></button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     {/* 🌐 Modern Pagination Component */}
{productPagination.last_page > 1 && (
  <div className="bg-white px-6 py-6 border-t border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between rounded-b-xl">
    
    {/* Showing X to Y of Z Results */}
    <div className="text-sm text-gray-600 mb-4 md:mb-0">
      {productPagination.total > 0 ? (
        <>
          Showing <span className="font-semibold text-gray-800">{productPagination.from}</span> to{' '}
          <span className="font-semibold text-gray-800">{productPagination.to}</span> of{' '}
          <span className="font-semibold text-gray-800">{productPagination.total}</span> results
        </>
      ) : (
        <span>No results found.</span>
      )}
    </div>

    {/* 🌍 Pagination */}
    <ReactPaginate
      breakLabel="..."
      previousLabel="←"
      nextLabel="→"
      pageCount={productPagination.last_page}
      onPageChange={handlePageClick}
      forcePage={currentPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="flex items-center gap-2"
      pageClassName="w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
      activeClassName="bg-blue-600 text-white hover:bg-blue-700"
      previousClassName="w-9 h-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition cursor-pointer"
      nextClassName="w-9 h-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition cursor-pointer "
      breakClassName="w-9 h-9 flex items-center justify-center text-gray-400"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  </div>
)}

      </div>
    </div>
  );
}

