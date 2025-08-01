'use client';
import { useEffect, useState, useRef } from 'react'; // Added useRef for potential file input handling
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaSave, FaImage, FaDollarSign, FaBoxes, FaInfoCircle, FaTags,
  FaTrash, FaUpload, FaSpinner, FaTimes, // Added icons for potential enhancements
  FaChevronDown
} from 'react-icons/fa';
import apiClient from '@/app/axios';

export default function ProductUpdate() {
  const router = useRouter();
  const { productId } = useParams();

  // State for the form inputs, initialized with default values
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    image: null, // Stores the current image path from API or the File object
    // Add any other fields you might have, like discount_price, dimensions, color, etc.
    // Example: discount_price: '', dimensions: '', color: ''
  });
  
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // URL for displaying the image preview
  // state to hold the actual File object if a new image is selected
  const [selectedFile, setSelectedFile] = useState(null); 

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const IMAGE_BASE_URL = 'http://localhost:8000/storage';

  // Fetch product data and categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      setSuccess(''); // Clear previous success messages

      try {
        // Fetch product details and categories concurrently
        const [productRes, categoriesRes] = await Promise.all([
          apiClient.get(`/api/products/${productId}`),
          apiClient.get('/api/categories')
        ]);

        const productData = productRes.data.product;
        
        // Initialize state with fetched data
        setProduct({
          name: productData.name || '',
          description: productData.description || '',
          price: productData.price || '',
          quantity: productData.quantity || '',
          category_id: productData.category_id || '',
          image: productData.image, // Store the original image filename/path
          // Initialize other fields if they exist
          // discount_price: productData.discount_price || '',
          // dimensions: productData.dimensions || '',
          // color: productData.color || ''
        });

        // Set the preview image if an image exists
        setPreviewImage(productData.image ? `${IMAGE_BASE_URL}/${productData.image}` : null);
        setCategories(categoriesRes.data.categories || []);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 404) {
          setError('Product not found. Please check the ID.');
        } else {
          setError('Failed to load product data. Please check your connection.');
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    // Only fetch if productId is available
    if (productId) {
      fetchData();
    } else {
      setError('Product ID is missing.');
      setLoading(false);
    }
  }, [productId]); // Re-fetch data if productId changes

  // Handler for input changes (text, number, select)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files.length > 0) {
      // Handle file input specifically
      const file = files[0];
      setSelectedFile(file); // Store the File object for submission
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
      // Update product state with the new file reference to manage UI state correctly
      setProduct(prev => ({ ...prev, image: file })); 
    } else {
      // Handle other input fields
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler for the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel convention for PUT requests via POST

      // Append all product fields from the state
      Object.keys(product).forEach(key => {
        // Ensure we append only valid data and not internal states like previewImage
        // Crucially, we append the image file only if 'selectedFile' is populated,
        // meaning a new image was chosen. If not, the original image is preserved by not sending the field.
        if (key !== 'image' && key !== 'previewImage' && product[key] !== null && product[key] !== undefined) {
          formData.append(key, product[key]);
        }
      });

      // Append the NEW image file ONLY if 'selectedFile' is present.
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Make the API call
      await apiClient.post(`/api/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      setSuccess('Product updated successfully!');
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push(`/admin/products/show/${productId}`);
      }, 1500);

    } catch (err) {
      console.error('Update error:', err);
      // Provide more specific error feedback from the backend if available
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setError(`Update failed: ${errorMessages}`);
      } else {
        setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  // --- Render States ---

  // Enhanced Loading State
  const renderLoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/30 transform transition-transform duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <FaSpinner className="w-16 h-16 text-indigo-500 animate-spin" />
        </div>
        <p className="mt-2 text-gray-700 font-semibold text-lg">Loading product data for editing...</p>
      </div>
    </div>
  );

  // Enhanced Error State
  const renderErrorState = (title, message) => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/30 transform transition-transform duration-500 hover:scale-105">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-7 text-base">{message}</p>
        <Link
          href="/admin/products"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl"
        >
          <FaArrowLeft className="mr-2 h-5 w-5" /> Back to Products
        </Link>
      </div>
    </div>
  );


  if (loading) return renderLoadingState();
  if (error) return renderErrorState('Error Loading Product', error);
  if (!productId) return renderErrorState('Missing Product ID', 'Cannot load product details without an ID.');
  // Fallback if product data retrieval fails but no specific error is caught
  if (!product.name && !product.price && !product.quantity) return renderErrorState('Product Data Incomplete', 'Could not retrieve all product details.');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8 pb-6 border-b border-white/30 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-5 sm:mb-0">
            {/* Back Button */}
            <Link href="/admin/products" className="text-indigo-600 hover:text-indigo-800 mr-5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full p-2">
              <FaArrowLeft className="h-7 w-7" />
            </Link>
            {/* Page Title */}
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight flex items-center">
                Edit Product
              </h1>
              <p className="text-gray-500 text-base mt-1 font-medium">Update product information</p>
            </div>
          </div>
          {/* Save Button (part of the form, styled here for consistency) */}
          <button
            form="update-form" // Link the button to the form
            disabled={isSubmitting}
            className={`inline-flex items-center px-6 py-3 rounded-xl font-bold shadow-lg transition-all transform duration-150 ease-in-out 
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-200 hover:shadow-xl active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75'
              }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="mr-2 h-5 w-5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2 h-5 w-5 text-white" /> Save Changes
              </>
            )}
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-sm flex items-center animate-fade-in">
            <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-xl shadow-sm flex items-center animate-fade-in">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p>{success}</p>
          </div>
        )}

        {/* Main Form Grid */}
        <form id="update-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Primary Content Section (Form Fields) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Information Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-7 pb-4 border-b border-gray-200 flex items-center">
                <FaInfoCircle className="mr-4 text-indigo-600 h-7 w-7" /> Basic Information
              </h2>
              
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg placeholder-gray-400 transition duration-150 ease-in-out bg-gray-50"
                    placeholder="Enter product name"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={5} // Increased rows for better visibility
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder-gray-400 transition duration-150 ease-in-out bg-gray-50 resize-y"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-7 pb-4 border-b border-gray-200 flex items-center">
                <FaDollarSign className="mr-4 text-emerald-600 h-7 w-7" /> Pricing & Inventory
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-lg font-semibold text-gray-800 mb-2">
                    Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-12 px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-lg placeholder-gray-400 transition duration-150 ease-in-out bg-gray-50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-lg font-semibold text-gray-800 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg placeholder-gray-400 transition duration-150 ease-in-out bg-gray-50"
                    placeholder="e.g., 100"
                  />
                </div>

                {/* Category */}
                <div className="relative col-span-1 md:col-span-2"> {/* Span across columns if needed, or adjust layout */}
                  <label htmlFor="category_id" className="block text-lg font-semibold text-gray-800 mb-2">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={product.category_id}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg placeholder-gray-400 appearance-none bg-gray-50 transition duration-150 ease-in-out pr-10"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <FaChevronDown className="h-5 w-5 text-gray-400" /> {/* Assuming FaChevronDown is imported */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Section (Image and Details) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Product Image Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-7 pb-4 border-b border-gray-200 flex items-center">
                <FaImage className="mr-4 text-amber-600 h-7 w-7" /> Product Image
              </h2>
              
              <div className="flex flex-col items-center">
                {/* Image Preview */}
                <div className="relative w-full mb-4">
                  {previewImage ? (
                    <div className="relative group">
                      <img
                        src={previewImage}
                        alt="Product Preview"
                        className="w-full h-64 object-contain rounded-2xl shadow-lg border border-gray-200"
                      />
                      {/* Close button on hover */}
                      <button 
                        type="button" // Important to prevent form submission
                        onClick={() => {
                          setPreviewImage(product.image ? `${IMAGE_BASE_URL}/${product.image}` : null); // Revert to original if any
                          setSelectedFile(null); // Clear the selected file
                          setProduct(prev => ({ ...prev, image: product.image })); // Reset product.image state too
                        }}
                        className="absolute top-3 right-3 bg-black bg-opacity-40 text-white p-2 rounded-full shadow-md hover:bg-opacity-60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 group-hover:opacity-100 opacity-0 z-10"
                      >
                        <FaTimes className="h-5 w-5" /> {/* Assuming FaTimes is imported */}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
                      <FaImage className="text-gray-400 text-6xl" />
                    </div>
                  )}
                </div>
                
                {/* File Input Button */}
                <label className="w-full cursor-pointer">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*" // Restrict to image files
                    className="hidden" // Hide the default file input
                  />
                  <div className={`w-full py-4 px-5 rounded-xl font-bold text-center transition-all duration-150 ease-in-out shadow-md
                    ${selectedFile 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-indigo-200 hover:shadow-lg' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 hover:shadow-sm'}`}
                  >
                    {selectedFile ? 'Change Image' : 'Upload Image'}
                  </div>
                </label>
                {/* Guidance text */}
                <p className="text-xs text-gray-500 mt-2 text-center">Supports PNG, JPG, GIF. Max 10MB.</p>
              </div>
            </div>

        
          </div>
        </form>
      </div>
    </div>
  );
}