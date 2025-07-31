"use client";
import apiClient from "@/app/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";

export default function regiter() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient
      .post("/register", registerData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        // Redirect to login or home page
        router.push("/auth/email-verify");
      })
      .catch((error) => {
        console.error(
          "Registration error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 px-4 py-12">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-wide">
          Sign Up
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={registerData.password_confirmation}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
