'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaChevronDown, FaChevronUp, FaShapes } from 'react-icons/fa';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    apiClient.get('/api/categories')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    apiClient.delete(`/api/category/${id}`)
      .then(() => setCategories(categories.filter(c => c.id !== id)));
  };

  // Sorting functionality
  const sortedCategories = [...categories];
  if (sortConfig.key) {
    sortedCategories.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Filtering functionality
  const filteredCategories = sortedCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Create Button */}
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/categories/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
        >
          <FaPlus />
          New Category
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <div className="relative w-full md:w-auto mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-4">
          <span>Sort by:</span>
          <button
            onClick={() => setSortConfig({ key: 'name', direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Name {sortConfig.key === 'name' ? (
              sortConfig.direction === 'asc' ? <FaChevronUp className="inline w-3 h-3" /> : <FaChevronDown className="inline w-3 h-3" />
            ) : null}
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gradient-to-r from-purple-50 to-blue-50 text-left">
              <th scope="col" className="px-6 py-4 text-sm font-medium text-gray-700">ID</th>
              <th 
                scope="col"
                className="px-6 py-4 text-sm font-medium text-gray-700 cursor-pointer"
                onClick={() => setSortConfig({ key: 'name', direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
              >
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  {sortConfig.key === 'name' ? (
                    sortConfig.direction === 'asc' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />
                  ) : null}
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, index) => (
                <tr 
                  key={cat.id} 
                  className={`
                    transition-all duration-200 hover:bg-gray-50
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-4">
                    <Link
                    href={`/admin/categories/show/${cat.id}`}
                     className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                    >
                       <FaShapes className="w-4 h-4" />
                      <span>Show</span>
                    </Link>
                    <Link
                      href={`/admin/categories/update/${cat.id}`}
                      className="text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                    >
                      <FaTrash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No categories found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}