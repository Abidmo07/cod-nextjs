'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaShoppingBag, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCheckCircle, FaDollarSign, FaTruck, FaRegCommentDots } from 'react-icons/fa';

export default function AboutUsPage() {
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
            تعرف <span className="text-blue-500">علينا</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            قصتنا، رؤيتنا، وقيمنا التي تشكل أساس السوق.
          </p>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="lg:text-right">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-blue-500">
              قصتنا وبدايتنا
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              في السوق، بدأنا رحلتنا بشغف لتقديم أفضل المنتجات التي تجمع بين الجودة والأناقة. تأسسنا برؤية لتوفير تجربة تسوق فريدة، حيث نقدم منتجات تعكس الذوق الرفيع والتميز. كل منتج نختاره يحمل قصة، ونعمل بجد لضمان رضا عملائنا.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              نؤمن بأن عملائنا يستحقون الأفضل، لذلك نحرص على اختيار المنتجات بعناية، تقديم أسعار تنافسية، وتوفير خدمة توصيل سريعة ودعم عملاء استثنائي.
            </p>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <img
              src="/images/about-story.jpg"
              alt="قصتنا"
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-20">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-500">رسالتنا</h3>
            <p className="text-gray-400 leading-relaxed">
              تقديم منتجات عالية الجودة بأسعار مناسبة، مع التركيز على رضا العملاء وبناء علاقات طويلة الأمد.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-500">رؤيتنا</h3>
            <p className="text-gray-400 leading-relaxed">
              أن نكون الوجهة الأولى للتسوق الإلكتروني في المنطقة، من خلال الابتكار وتقديم تجربة تسوق مميزة.
            </p>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="text-center mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold mb-12 text-blue-500">
            لماذا تختارنا؟
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'جودة عالية',
                desc: 'نختار منتجاتنا بعناية لضمان أعلى جودة.',
                icon: FaCheckCircle,
              },
              {
                title: 'أسعار تنافسية',
                desc: 'نقدم أفضل الأسعار مقابل القيمة.',
                icon: FaDollarSign,
              },
              {
                title: 'توصيل سريع',
                desc: 'شحن سريع وآمن لجميع المناطق.',
                icon: FaTruck,
              },
              {
                title: 'دعم استثنائي',
                desc: 'فريق جاهز لمساعدتك في أي وقت.',
                icon: FaRegCommentDots,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              >
                <item.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h4 className="text-lg font-bold mb-3 text-gray-200">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mb-20 p-12 rounded-lg bg-gray-800 text-center shadow-md">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-200">
            اكتشف <span className="text-blue-500">الأناقة</span> الحقيقية
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            انضم إلى عالمنا واستكشف مجموعاتنا الحصرية من المنتجات المميزة.
          </p>
          <Link
            href="/products"
            className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            تسوق الآن
          </Link>
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}