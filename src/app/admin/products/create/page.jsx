'use client';
import React, { useState, useEffect, useRef } from 'react';
import apiClient from '@/app/axios';
import { 
  FaArrowLeft, 
  FaTag, 
  FaAlignLeft, 
  FaDollarSign, 
  FaBoxes, 
  FaList, 
  FaCloudUploadAlt, 
  FaCheck, 
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const CreateProduct = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    setLoading(true);
    apiClient.get('/api/categories')
      .then(res => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('quantity', form.quantity);
    formData.append('category_id', form.category_id);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const res = await apiClient.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product created:', res.data);
      // Redirect to products list after successful creation
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        const errorMsg = Object.values(err.response.data.errors).flat().join(', ');
        setError(`Creation failed: ${errorMsg}`);
      } else {
        setError('Failed to create product');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-medium">Back to Products</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <div></div> {/* Spacer for alignment */}
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>

              {/* Product Name */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaTag className="text-blue-600" />
                  </div>
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaAlignLeft className="text-green-600" />
                  </div>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
                  required
                ></textarea>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Inventory</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FaDollarSign className="text-amber-600" />
                    </div>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaBoxes className="text-purple-600" />
                    </div>
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="0"
                    min="0"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category_id" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FaList className="text-indigo-600" />
                  </div>
                  Category
                </label>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <FaSpinner className="animate-spin text-2xl text-purple-600" />
                  </div>
                ) : (
                  <select
                    id="category_id"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAuNjY2NzQ4IDFMNS45OTk5OCA2LjMzMzI1TDEwLjY2NjcgMSIgc3Ryb2tlPSIjNjQ3NEY2IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[right_1rem_center] bg-no-repeat"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Media</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <FaCloudUploadAlt className="text-pink-600" />
                  </div>
                  Product Image
                </label>
                
                {/* Image Preview Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 transition-all duration-200 hover:border-purple-400 bg-gradient-to-br from-gray-50 to-white mb-4">
                  {imagePreview ? (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-contain rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        aria-label="Remove image"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <FaCloudUploadAlt className="text-2xl text-gray-500" />
                      </div>
                      <p className="text-gray-600 mb-2">No image uploaded</p>
                      <p className="text-sm text-gray-500">Upload an image to represent this product</p>
                    </div>
                  )}
                </div>

                {/* File Input */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0
                      file:text-base file:font-semibold file:text-white
                      file:bg-gradient-to-r file:from-blue-500 file:to-purple-600
                      hover:file:shadow-lg hover:file:shadow-purple-500/30
                      file:transition-all file:duration-200
                      file:cursor-pointer"
                    required
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-4 text-gray-700 font-semibold bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;