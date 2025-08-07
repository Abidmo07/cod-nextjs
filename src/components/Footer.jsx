import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-gray-950 text-gray-300" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-reverse space-x-3 mb-4">
            <FaShoppingBag className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-white">السوق</h3>
          </Link>
          <p className="text-gray-400">متجرك الشامل للمنتجات عالية الجودة المصممة لكل نمط حياة.</p>
          <div className="flex space-x-4 space-x-reverse mt-4">
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
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">روابط سريعة</h4>
          <ul className="space-y-3">
            {['الرئيسية', 'المنتجات', 'عن المتجر', 'اتصل بنا'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item === 'الرئيسية' ? '' : item === 'المنتجات' ? 'products' : item === 'عن المتجر' ? 'about' : 'contact'}`}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">التصنيفات</h4>
          <ul className="space-y-3">
            {['ساعات رجالية', 'ساعات نسائية', 'أساور', 'قلائد', 'خواتم'].slice(0, 5).map((catName, index) => (
              <li key={index}>
                <Link href="/categories" className="text-gray-400 hover:text-blue-500 transition-colors">{catName}</Link>
              </li>
            ))}
            <li>
              <Link href="/categories" className="text-gray-400 hover:text-blue-500 transition-colors">+ المزيد</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">اتصل بنا</h4>
          <ul className="space-y-3">
            <li className="flex items-center justify-end space-x-reverse space-x-2">
              <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
              <span>123 الشارع الرئيسي، المدينة، الدولة</span>
            </li>
            <li className="flex items-center justify-end space-x-reverse space-x-2">
              <FaPhone className="w-5 h-5 text-blue-500" />
              <span>+1 234 567 890</span>
            </li>
            <li className="flex items-center justify-end space-x-reverse space-x-2">
              <FaEnvelope className="w-5 h-5 text-blue-500" />
              <span>info@marketplace.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} السوق. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}