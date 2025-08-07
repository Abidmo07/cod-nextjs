"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaShoppingCart,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaShippingFast,
  FaCoins,
} from "react-icons/fa";
import apiClient from "@/app/axios";

export default function ProductDetails() {
  const router=useRouter();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [wilayas, setWilayas] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderData, setOrderData] = useState({
    customer_name: "",
    phone: "",
    wilaya: "",
    address: "",
    product_id: productId,
    quantity: 1,
    delivery_method: "home",
    total_price: totalPrice,
  });

  // Fetch product & wilayas
  useEffect(() => {
    apiClient.get(`api/products/${productId}`)
      .then((res) => setProduct(res.data.product))
      .catch(console.error);

    apiClient.get("api/wilayas")
      .then((res) => setWilayas(res.data.wilayas))
      .catch(console.error);
  }, [productId]);

  // Calculate delivery
  useEffect(() => {
    if (!orderData.wilaya) {
      setDeliveryPrice(0);
      return;
    }
    const w = wilayas.find((w) => w.name === orderData.wilaya);
    if (!w) return;
    setDeliveryPrice(
      orderData.delivery_method === "home"
        ? w.home_delivery_price
        : w.desk_delivery_price
    );
  }, [orderData.wilaya, orderData.delivery_method, wilayas]);

  // Calculate total
  useEffect(() => {
    if (!product) return;
    setTotalPrice(Number(product.price) * Number(orderData.quantity) + Number(deliveryPrice));
  }, [product, orderData.quantity, deliveryPrice]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading…
      </div>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post("api/order", orderData)
      .then((res) => {
        console.log(res.data.order.id);
         router.push(`/orders/${res.data.order.id}`); 
        
      })
      .catch(console.error);
  }

return (
  <div className="min-h-screen bg-gray-900 text-white p-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
      
      {/* Left Column: Order Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FaShoppingCart className="mr-2 text-yellow-400" />
          املأ البيانات للتوصيل
        </h2>

        {/* Name */}
        <div className="relative">
          <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={orderData.customer_name}
            onChange={e =>
              setOrderData({ ...orderData, customer_name: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhoneAlt className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={orderData.phone}
            onChange={e =>
              setOrderData({ ...orderData, phone: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>

        {/* Wilaya */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <select
            value={orderData.wilaya}
            onChange={e =>
              setOrderData({ ...orderData, wilaya: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg appearance-none focus:ring-yellow-400 focus:border-yellow-400"
            required
          >
            <option value="">اختر الولاية</option>
            {wilayas.map(w => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute top-2 left-3 text-gray-400" />
          <textarea
            placeholder="العنوان التفصيلي"
            rows={3}
            value={orderData.address}
            onChange={e =>
              setOrderData({ ...orderData, address: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 resize-none"
          />
        </div>

        {/* Quantity & Method */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaBoxOpen className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="number"
              min="1"
              value={orderData.quantity}
              onChange={e =>
                setOrderData({
                  ...orderData,
                  quantity: parseInt(e.target.value) || 1,
                })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
          </div>
          <div className="relative">
            <FaShippingFast className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
            <select
              value={orderData.delivery_method}
              onChange={e =>
                setOrderData({
                  ...orderData,
                  delivery_method: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg appearance-none focus:ring-yellow-400 focus:border-yellow-400"
              required
            >
              <option value="home">توصيل للمنزل</option>
              <option value="desk">استلام من المكتب</option>
            </select>
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3">
            <span className="flex-1">سعر التوصيل:</span>
            <span className="font-bold">{deliveryPrice} دج</span>
          </div>
          <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3">
            <span className="flex-1">السعر الإجمالي:</span>
            <span className="font-bold">{totalPrice} دج</span>
          </div>
        </div>

        {/* Submit */}
        <button className="w-full py-3 bg-yellow-500 rounded-lg font-bold text-black hover:bg-yellow-600 transition">
          إرسال الطلب
        </button>
      </form>

      {/* Right Column: Product Details */}
      <div className="space-y-6">
        <img
          src={`http://localhost:8000/storage/${product.image}`}
          alt={product.name}
          className="w-full rounded-2xl object-cover shadow-xl"
        />
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-300">{product.description}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold">{product.price} دج</span>
          <FaCoins className="text-yellow-400" />
        </div>
      </div>
    </div>
  </div>
);

}
