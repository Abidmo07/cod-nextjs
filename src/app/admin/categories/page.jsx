'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/app/axios';
import Link from 'next/link';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaShapes,
  FaEye
} from 'react-icons/fa';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    apiClient.get('/api/categories')
      .then(res => setCategories(res.data.categories))
      .catch(console.error);
  }, []);

  const handleDelete = id => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    apiClient.delete(`/api/category/${id}`)
      .then(() => setCategories(categories.filter(c => c.id !== id)));
  };

  // sort & filter
  const sorted = [...categories];
  if (sortConfig.key) {
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
  const filtered = sorted.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">

      {/* New Category */}
      <div className="flex justify-end">
        <Link
          href="/admin/categories/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-[1.02] transition transform"
        >
          <FaPlus /> New Category
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="whitespace-nowrap">Sort by:</span>
          <button
            onClick={() =>
              setSortConfig({
                key: 'name',
                direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
              })
            }
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            Name
            {sortConfig.key === 'name' &&
              (sortConfig.direction === 'asc'
                ? <FaChevronUp className="w-4 h-4"/>
                : <FaChevronDown className="w-4 h-4"/>)}
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() =>
                  setSortConfig({
                    key: 'name',
                    direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                  })
                }
              >
                <div className="inline-flex items-center gap-1">
                  Name
                  {sortConfig.key === 'name' &&
                    (sortConfig.direction === 'asc'
                      ? <FaChevronUp className="w-3 h-3"/>
                      : <FaChevronDown className="w-3 h-3"/>)}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? filtered.map((cat, i) => (
              <tr
                key={cat.id}
                className={`transition hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50'}`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{cat.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{cat.name}</td>
                <td className="px-6 py-4 flex items-center gap-4 text-sm">
                  <Link
                    href={`/admin/categories/show/${cat.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FaEye className="w-4 h-4"/> Show
                  </Link>
                  <Link
                    href={`/admin/categories/update/${cat.id}`}
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    <FaEdit className="w-4 h-4"/> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTrash className="w-4 h-4"/> Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No categories found matching “{searchTerm}”
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
