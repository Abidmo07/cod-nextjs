"use client";

import Link from "next/link";
import React from "react";
// Importing React Icons for a more polished look
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaAngleRight, // For list items
  FaCheckCircle, // For 'Why Choose Us' icon
  FaDollarSign,  // For 'Why Choose Us' icon
  FaTruck,       // For 'Why Choose Us' icon
  FaRegCommentDots // For 'Why Choose Us' icon (support)
} from "react-icons/fa";

export default function AboutUsPage() {
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
            <a href="/about" className="text-gray-300 hover:text-white transition-colors font-semibold text-yellow-400">عن المتجر</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">تواصل معنا</a>
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
          تعرف <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500">علينا</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          قصتنا، رؤيتنا، وقيمنا التي تشكل أساس متجر الأناقة.
        </p>
      </section>

      {/* --- About Us Content Section --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="lg:text-right">
            {/* Heading with gradient */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              قصتنا وبدايتنا
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              في متجر الأناقة، بدأنا رحلتنا بشغف عميق نحو تقديم أرقى الساعات والإكسسوارات التي تجمع بين الفخامة والجودة العالية. تأسسنا على مبدأ توفير قطع فريدة تعبّر عن الأناقة الخالدة والذوق الرفيع، ونفخر بتقديم تجربة تسوق استثنائية لعملائنا الكرام. كل قطعة نختارها تحمل قصة تعكس التزامنا بالتميز.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              نحن نؤمن بأن العميل يستحق الأفضل دائمًا، ولهذا نحرص على اختيار منتجاتنا بعناية، وتقديمها بأسعار تنافسية، مع التوصيل السريع وخدمة ما بعد البيع المميزة.
            </p>
          </div>
          {/* Image Container with border and shadow */}
          <div className="relative rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500">
            <img
              src="/images/about-story.jpg" // Ensure this path is correct
              alt="Our Story Image"
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Section 2: Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-gray-850/95 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
              رسالتنا
            </h3>
            <p className="text-gray-300 leading-relaxed">
              تقديم منتجات عالية الجودة بأسعار مناسبة، مع التركيز على رضا العملاء وبناء علاقات طويلة الأمد معهم.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-gray-850/95 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              رؤيتنا
            </h3>
            <p className="text-gray-300 leading-relaxed">
              أن نصبح الوجهة الأولى للتسوق الإلكتروني في المنطقة، من خلال الابتكار المستمر وتقديم تجربة تسوق لا تُنسى.
            </p>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            لماذا تختارنا؟
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature Cards */}
            {[
              {
                title: "جودة عالية",
                desc: "نختار منتجاتنا بعناية لضمان أعلى جودة.",
                icon: FaCheckCircle, // Using React Icon
              },
              {
                title: "أسعار تنافسية",
                desc: "نقدم أفضل الأسعار مقابل القيمة.",
                icon: FaDollarSign, // Using React Icon
              },
              {
                title: "توصيل سريع",
                desc: "شحن سريع وآمن لجميع المناطق.",
                icon: FaTruck, // Using React Icon
              },
              {
                title: "دعم استثنائي",
                desc: "فريق جاهز لمساعدتك في أي وقت.",
                icon: FaRegCommentDots, // Using React Icon
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-850/95 to-gray-900 p-6 rounded-3xl border border-gray-700 shadow-xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:-translate-y-3 flex flex-col items-center"
              >
                <item.icon className="w-12 h-12 text-yellow-400 mb-4" /> {/* Icon */}
                <h4 className="text-xl font-bold mb-3 text-yellow-400">
                  {item.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 mb-20 p-12 rounded-3xl text-center relative overflow-hidden border border-gray-700 shadow-2xl">
          {/* Background gradient overlay for the CTA */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 opacity-70 rounded-3xl"></div>
          <div className="relative z-10"> {/* Content layer */}
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
              اكتشف <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500">الأناقة</span> الحقيقية
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              انضم إلى عالمنا واستكشف مجموعاتنا الحصرية من الساعات والإكسسوارات الفاخرة.
            </p>
            <Link
              href="/products"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-1 inline-block"
            >
              تسوق الآن
            </Link>
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