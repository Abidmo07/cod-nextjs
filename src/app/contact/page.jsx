"use client";

import React, { useState } from "react";
import Link from "next/link";
// Import React Icons for a more polished look
import {
  FaSearch, // For potential empty state icon
  FaExclamationTriangle, // For error states
  FaAngleRight, // For list items
  FaMapMarkerAlt, // Location Icon
  FaPhone, // Phone Icon
  FaEnvelope, // Email Icon
  FaFacebookF, // Social Media
  FaTwitter, // Social Media
  FaInstagram, // Social Media
  FaLinkedinIn, // Social Media
} from "react-icons/fa";

export default function ContactPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // Added subject for a more complete form
    message: "",
  });

  // State for submission status (e.g., loading, success, error)
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handler for input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmissionStatus({ type: "loading", message: "جاري إرسال رسالتك..." });

    try {
      // --- Simulate API call ---
      // In a real application, you would replace this with an actual API call
      // e.g., using apiClient.post('/api/contact', { name, email, subject, message });
      // Ensure you import apiClient if needed for the actual submission.
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // On successful submission
      setSubmissionStatus({ type: "success", message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا." });
      // Clear form fields after successful submission
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      // On submission error
      setSubmissionStatus({ type: "error", message: "فشل في إرسال رسالتك. يرجى المحاولة مرة أخرى." });
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-x-hidden font-sans"
      dir="rtl"
    >
      {/* Floating Blobs - Key visual elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* --- Header/Navbar --- */}
      <header className="relative z-10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
              متجر الأناقة
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">الرئيسية</a>
            <a href="/products" className="text-gray-300 hover:text-white transition-colors">منتجاتنا</a>
            <a href="/categories" className="text-gray-300 hover:text-white transition-colors">التصنيفات</a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">عن المتجر</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors font-semibold text-yellow-400">تواصل معنا</a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-800 border border-gray-700">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </button>
        </div>
      </header>

      {/* --- Page Title Section --- */}
      <section className="text-center pt-24 pb-16 px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          تواصل <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500">معنا</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          لدينا استفسارات أو ملاحظات؟ نحن هنا للمساعدة.
        </p>
      </section>

      {/* --- Contact Information & Form Section --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Information Column */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
                معلومات الاتصال
              </h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">موقعنا</h4>
                    <p className="text-gray-400">الجزائر العاصمة، شارع الحرية، رقم 123</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-center text-gray-300">
                  <FaPhone className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">رقم الهاتف</h4>
                    <p className="text-gray-400">+213 555 123 456</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">البريد الإلكتروني</h4>
                    <p className="text-gray-400">info@store.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Media Links */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">تابعنا</h3>
              <div className="flex space-x-4">
                {/* Social media icon links */}
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              أرسل لنا رسالة
            </h2>
            {/* Form styling with gradient background, border, shadow, and hover effects */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-850/95 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-2 space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent transition-all text-white placeholder-gray-400 shadow-md"
                  placeholder="أدخل اسمك"
                />
              </div>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent transition-all text-white placeholder-gray-400 shadow-md"
                  placeholder="example@domain.com"
                />
              </div>
              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">الموضوع</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent transition-all text-white placeholder-gray-400 shadow-md"
                  placeholder="موضوع رسالتك"
                />
              </div>
              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">رسالتك</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent transition-all text-white placeholder-gray-400 resize-none shadow-md"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              {/* Submission Status Message */}
              {submissionStatus && (
                <div className={`p-4 rounded-lg text-center ${
                  submissionStatus.type === 'success' ? 'bg-green-500/20 border border-green-400 text-green-300' :
                  submissionStatus.type === 'error' ? 'bg-red-500/20 border border-red-400 text-red-300' :
                  'bg-yellow-500/20 border border-yellow-400 text-yellow-300' // Loading state
                }`}>
                  {submissionStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submissionStatus?.type === 'loading'}
                className={`w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all transform ${submissionStatus?.type === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="pt-16 pb-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Footer Column 1: Logo & Social */}
            <div>
              <div className="flex items-center space-x-reverse space-x-2 mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-xl font-bold">متجر الأناقة</h3>
              </div>
              <p className="text-gray-400 mb-6">
                متجر متخصص في بيع الساعات والأكسسوارات الفاخرة بجودة عالية.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Footer Column 2: Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">الروابط</h4>
              <ul className="space-y-4">
                {['الرئيسية', 'المنتجات', 'التصنيفات', 'عن المتجر', 'تواصل معنا'].map((item) => (
                  <li key={item}>
                    <a href={item === 'الرئيسية' ? '/' : `#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-yellow-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Column 3: Categories (Placeholder for this page context) */}
            <div>
              <h4 className="text-lg font-bold mb-6">التصنيفات</h4>
              <ul className="space-y-4">
                {['ساعات رجالية', 'ساعات نسائية', 'أساور', 'قلائد', 'خواتم'].slice(0, 5).map((catName, index) => (
                  <li key={index}>
                    <a href="/categories" className="text-gray-400 hover:text-yellow-400 transition-colors">{catName}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Column 4: Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">اتصل بنا</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0"/>
                  الجزائر العاصمة
                </li>
                <li className="flex items-start">
                  <FaPhone className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0"/>
                  +213 555 123 456
                </li>
                <li className="flex items-start">
                  <FaEnvelope className="w-5 h-5 mr-3 mt-0.5 text-yellow-400 flex-shrink-0"/>
                  info@store.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} متجر الأناقة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}