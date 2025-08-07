import Link from 'next/link';
import { FaShoppingBag } from 'react-icons/fa';

export default function Navbar({ activePage }) {
  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
    { name: 'التصنيفات', path: '/categories' },
    { name: 'عن المتجر', path: '/about' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-20 px-6 py-4 bg-gray-800/80 backdrop-blur-md shadow-md" dir="rtl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-reverse space-x-3">
          <FaShoppingBag className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-100">السوق</h1>
        </Link>
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-gray-400 hover:text-blue-500 transition-colors font-medium ${
                activePage === link.name ? 'text-blue-500' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <button className="md:hidden text-gray-100 text-2xl">☰</button>
      </div>
    </header>
  );
}