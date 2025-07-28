
export default function Home() {
  return (
  <>
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col" dir="rtl">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5 bg-transparent">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wider">
          متجري
        </h1>
        <nav className="space-x-6 space-x-reverse">
          <a href="#products" className="hover:text-yellow-300 transition">المنتجات</a>
          <a href="#about" className="hover:text-yellow-300 transition">حول</a>
          <a href="#contact" className="hover:text-yellow-300 transition">اتصل بنا</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center lg:text-right px-8 lg:px-20">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            اكتشف <span className="text-yellow-400">ساعات</span> واكسسوارات حصرية
          </h2>
          <p className="text-lg text-gray-300">
            ساعات عصرية وأنيقة مصممة لعشاق الموضة.
            احصل على أحدث الصيحات مع مجموعاتنا المميزة.
          </p>
          <div className="space-x-4 space-x-reverse">
            <a
              href="#products"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
            >
              تسوق الآن
            </a>
            <a
              href="#about"
              className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              اعرف المزيد
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="/watch-hero.png"
            alt="ساعة"
            className="mx-auto lg:ml-10 max-w-sm rounded-xl shadow-2xl transform hover:scale-105 transition"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} متجري. جميع الحقوق محفوظة.
      </footer>
    </div>
  </>
  );
}
