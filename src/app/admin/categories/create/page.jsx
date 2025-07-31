'use client';

import apiClient from '@/app/axios';
import { useState } from 'react';

export default function CreateCategoryForm() {
  const [categoryData,setCategoryData]=useState({
    name:'',
    image:''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData({...categoryData,image:file}) 
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleCreateCategory=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",categoryData.name);
    formData.append("image",categoryData.image);
   const res=await apiClient.post('/api/category',formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
   });
   console.log(res);



  }

  return (
<form  onSubmit={handleCreateCategory} className="max-w-2xl mx-auto">
  {/* Header Section */}
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <h1 className="text-3xl font-bold text-gray-900">Create New Category</h1>
    <p className="text-gray-500 mt-2">Add a new category to organize your products</p>
  </div>

  {/* Form Card */}
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
    {/* Decorative Header */}
    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    
    <div className="p-8 space-y-6">
      {/* Category Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700">
          <span>Category Name</span>
          <span className="ml-1 text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
            placeholder="e.g. Electronics, Fashion, Home & Garden"
            onChange={(e)=>setCategoryData({...categoryData,name:e.target.value})}
            value={categoryData.name}
          />
        </div>
        <p className="text-xs text-gray-500 ml-2">Choose a clear name that describes the category</p>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <span>Category Image</span>
          <span className="ml-1 text-red-500">*</span>
        </label>
        
        {/* Upload Area */}
        <div className="relative">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          
          />
          <label
            htmlFor="image"
            className="relative flex flex-col items-center justify-center w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all duration-200 group"
          >
            {!imagePreview ? (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="mb-2 text-sm text-gray-700 font-semibold">
                    <span className="text-purple-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              </div>
            )}
          </label>
        </div>
        
        <p className="text-xs text-gray-500 ml-2">Recommended size: 800x800px for best results</p>
      </div>

   
    </div>

    {/* Form Actions */}
    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
      <button
        type="button"
        className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-medium transition-all duration-200 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cancel
      </button>
      
      <div className="flex items-center gap-3">
     
        
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Create Category
        </button>
      </div>
    </div>
  </div>

  {/* Help Text */}
  <div className="mt-6 text-center">
    <p className="text-sm text-gray-500">
      Need help? Check our <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">category guidelines</a>
    </p>
  </div>
</form>
  );
}
