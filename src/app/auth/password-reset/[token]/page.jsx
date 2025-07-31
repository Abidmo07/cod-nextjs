"use client";
import apiClient from "@/app/axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = useParams();
  const email = useSearchParams().get("email") || "";

  const [resetData, setResetData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleReset = async (e) => {
    e.preventDefault();
    await apiClient
      .post(`/reset-password`, {
        token,
        email,
        ...resetData,
      })
      .then((response) => {
        console.log("Password reset successful:", response.data);
        router.push("/auth/login");
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 px-4 py-12">
      <form
        onSubmit={handleReset}
        className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 tracking-wide">
          Reset Your Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-8">
          Enter your new password for <span className="font-medium">{email}</span>
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            required
            value={resetData.password}
            onChange={(e) =>
              setResetData({ ...resetData, password: e.target.value })
            }
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            required
            value={resetData.password_confirmation}
            onChange={(e) =>
              setResetData({
                ...resetData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md"
        >
          Reset Password
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Back to{' '}
          <a href="/auth/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
