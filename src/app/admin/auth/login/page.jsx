"use client"
import apiClient from '@/app/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await apiClient.get('/sanctum/csrf-cookie');
    await apiClient.post('/login', loginData)
      .then(response => {
        console.log('Login successful:', response.data);
        router.push('/admin/dashboard');
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 px-4 py-12">
      <form onSubmit={handleLogin} className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-wide">
          Welcome Back
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="mb-6 text-right">
          <Link href="/admin/auth/forgot-password" className="text-sm text-indigo-600 hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link href="/admin/auth/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
