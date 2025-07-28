"use client";
import apiClient from '@/app/axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function forgotPassword() {
const [email,setEmail]=useState('');
const router=useRouter();
const handleSubmit=async(e)=>{
    e.preventDefault();
    await apiClient.post("/forgot-password",{email}).then((response)=>{
        console.log(response.data)
    }).catch((error)=>console.error(error))

}

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-12">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 tracking-wide">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-8">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md"
        >
          Send Reset Link
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{' '}
          <a href="/admin/auth/login" className="text-indigo-600 font-medium hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  )
}
