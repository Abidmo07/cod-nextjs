import React from 'react'

export default function verifyEmail() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 px-4">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-200">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Verify Your Email</h2>
        <p className="text-gray-700 text-sm mb-6">
          We've sent an email to <span className="font-medium">your@example.com</span>. Please check your inbox and click on the link to verify your email address.
        </p>

        <button
          type="button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md mb-4"
        >
          Resend Verification Email
        </button>

        <p className="text-xs text-gray-500">
          Didn’t receive the email? Make sure to check your spam folder or
          <span className="text-indigo-600 font-medium hover:underline cursor-pointer"> contact support</span>.
        </p>
      </div>
    </div>
  )
}
