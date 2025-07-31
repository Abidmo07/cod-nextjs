'use client';
import { useEffect, useState, useRef } from 'react'; // Added useRef
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/app/axios';
import Link from 'next/link'; // Import Link for navigation
import {
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaTag,
  FaSpinner, // For saving spinner
  FaImage, // For placeholder icon
  FaCalendarAlt, // For timeline icon (if needed)
  FaClock, // For timeline icon (if needed)
} from 'react-icons/fa';

export default function CategoryUpdate() {
  const { categoryId } = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null); // Ref for the file input

  // State for form data, including the File object for the image
  const [formData, setFormData] = useState({
    name: '',
    image: null, // Will hold the File object
    is_featured: false,
    is_visible: true,
  });
  // State for the preview URL of the selected image
  const [imagePreview, setImagePreview] = useState(null);
  // State for loading the initial category data
  const [loading, setLoading] = useState(true);
  // State for saving the form
  const [saving, setSaving] = useState(false);
  // State for displaying errors
  const [error, setError] = useState('');

  // Base URL for accessing stored images from the API
  const IMAGE_BASE_URL = 'http://localhost:8000/storage';

  // Fetch category details on component mount
  useEffect(() => {
    if (!categoryId) {
      setError('Category ID is missing. Cannot load category.');
      setLoading(false);
      return;
    }

    apiClient.get(`/api/categories/${categoryId}`)
      .then(res => {
        const categoryData = res.data.category;
        setFormData({
          name: categoryData.name || '',
          image: null, // Reset image file here, preview is set below
          is_featured: categoryData.is_featured || false,
          is_visible: categoryData.is_visible || true,
        });
        // Set the preview URL if an image exists
        if (categoryData.image) {
          setImagePreview(`${IMAGE_BASE_URL}/${categoryData.image}`);
        } else {
          setImagePreview(null); // Ensure preview is cleared if no image
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load category details. Please check the ID or try again.');
        console.error('Category fetch error:', err);
        setLoading(false);
      });
  }, [categoryId]); // Dependency array ensures effect runs if categoryId changes

  // Handle changes in text inputs and checkboxes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle selection of a new image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file })); // Store the File object
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  // Handle removal of the currently selected/previewed image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null })); // Clear the File object
    setImagePreview(null); // Clear the preview URL
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the actual file input value
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // Start saving process
    setError(''); // Clear previous errors

    // Prepare data for API using FormData to handle file uploads
    const payload = new FormData();
    // Crucial for frameworks like Laravel to recognize PUT as POST
    payload.append('_method', 'PUT');
    payload.append('name', formData.name);
    

    // Append the image file only if a new one has been selected
    if (formData.image) {
      payload.append('image', formData.image);
    }

    try {
      // Make the API request
      const response = await apiClient.post(`/api/category/${categoryId}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      
      console.log('Category updated successfully:', response.data);
      // Redirect to the categories list page on success
      router.push('/admin/categories');
    } catch (err) {
      console.error('Error updating category:', err);
      // Display specific validation errors or a general error message
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setError(`Update failed: ${errorMessages}`);
      } else {
        setError('Failed to update category. Please try again.');
      }
    } finally {
      setSaving(false); // End saving process
    }
  };

  // --- Rendering ---

  // Loading State UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative w-24 h-24">
          {/* Animated spinner with gradient */}
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin animation-delay-[-300ms]"></div>
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin animation-delay-[-600ms]"></div>
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin animation-delay-[-900ms]"></div>
          {/* Center Brand Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
               <FaImage className="text-white text-2xl" />
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <Link
            href="/admin/categories"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaArrowLeft className="mr-2" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  // --- Update Form Rendering ---
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/categories"
          className="inline-flex items-center px-5 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Categories</span>
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 hidden md:block">
          Edit Category: <span className="text-purple-600">{formData.name || 'New Category'}</span>
        </h1>
        
        {/* Save Button */}
        <button
          type="submit"
          form="update-category-form" // Link button to the form
          disabled={saving || loading}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {saving ? (
            <>
              <FaSpinner className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaCheck className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Update Form Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Category Details</h2>

        <form id="update-category-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Category Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-3">
              <FaTag className="inline mr-2 text-purple-600" /> Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg placeholder-gray-400 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 shadow-sm"
              placeholder="e.g., Electronics, Books, Fashion"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              <FaCloudUploadAlt className="inline mr-2 text-blue-600" /> Category Image
            </label>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Image Preview or Placeholder */}
              {imagePreview ? (
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0">
                  <img src={imagePreview} alt="Category preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 text-xs shadow-md hover:bg-red-600 transition-colors z-10"
                    aria-label="Remove image"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center shadow-inner shrink-0">
                  <FaImage className="text-6xl text-gray-400" />
                </div>
              )}

              {/* File Input */}
              <div className="flex-grow w-full">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500
                             file:mr-5 file:py-3 file:px-6 file:rounded-full file:border-0
                             file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white
                             file:font-bold file:cursor-pointer file:shadow-md
                             hover:file:bg-gradient-to-r hover:file:from-blue-600 hover:file:to-purple-700
                             focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                  Upload a new image to replace the current one. Supported formats: PNG, JPG, GIF. Recommended size: 1024x1024px.
                </p>
              </div>
            </div>
          </div>

          {/* Category Settings */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200/50 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <FaClock className="text-purple-600" /> Settings
            </h3>
            <div className="space-y-4">
              {/* Featured Toggle */}
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-purple-500 focus:ring-2 transition-all duration-200 shadow-sm checked:bg-purple-500 checked:border-purple-600"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">Mark as Featured Category</span>
              </label>

              {/* Visible Toggle */}
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="is_visible"
                  checked={formData.is_visible}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-purple-500 focus:ring-2 transition-all duration-200 shadow-sm checked:bg-purple-500 checked:border-purple-600"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">Make Category Visible</span>
              </label>
            </div>
          </div>

          {/* This section is now redundant as the Save button is in the header */}
          {/* Removed the bottom Cancel/Save button group */}

        </form>
      </div>
    </div>
  );
}