'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ type: 'loading', message: 'جاري إرسال رسالتك...' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setSubmissionStatus({ type: 'success', message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('خطأ في إرسال النموذج:', err);
      setSubmissionStatus({ type: 'error', message: 'فشل في إرسال رسالتك. يرجى المحاولة مرة أخرى.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased" dir="rtl">
      {/* Floating gradient blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-700 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Navbar */}
     <Navbar />

      {/* Page Title Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            تواصل <span className="text-blue-500">معنا</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            لديك استفسارات أو ملاحظات؟ فريقنا جاهز للإجابة على جميع أسئلتك.
          </p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Column */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-500">معلومات الاتصال</h2>
              <div className="space-y-6">
                <div className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-200">موقعنا</h4>
                    <p className="text-gray-400">123 الشارع الرئيسي، المدينة، الدولة</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaPhone className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-200">رقم الهاتف</h4>
                    <p className="text-gray-400">+1 234 567 890</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-200">البريد الإلكتروني</h4>
                    <p className="text-gray-400">info@marketplace.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-200">تابعنا</h3>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
                  placeholder="example@domain.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">الموضوع</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
                  placeholder="موضوع رسالتك"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">رسالتك</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400 resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              {submissionStatus && (
                <div className={`p-4 rounded-lg text-center flex items-center justify-center gap-2 ${
                  submissionStatus.type === 'success' ? 'bg-blue-500/20 border border-blue-400 text-blue-300' :
                  submissionStatus.type === 'error' ? 'bg-red-500/20 border border-red-400 text-red-300' :
                  'bg-gray-700/20 border border-gray-600 text-gray-200'
                }`}>
                  {submissionStatus.type === 'error' && <FaExclamationTriangle className="w-5 h-5" />}
                  {submissionStatus.message}
                </div>
              )}
              <button
                type="submit"
                disabled={submissionStatus?.type === 'loading'}
                className={`w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all ${
                  submissionStatus?.type === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
    <Footer />
    </div>
  );
}