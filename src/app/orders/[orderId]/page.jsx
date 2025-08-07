"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/app/axios";
// Consider using FaCircleCheck for a potentially cleaner icon, but FaCheckCircle is also appropriate.
import { FaCheckCircle, FaHome } from "react-icons/fa";

export default function ThankYou() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wilaya, setWilaya] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Assuming apiClient is correctly configured for API requests.
        const res = await apiClient.get(`/api/orders/${orderId}`);
        console.log("Fetched order:", res.data); // More descriptive logging.
        setOrder(res.data.order);
        setWilaya(res.data.wilayaOrder);
        
      } catch (err) {
        console.error("Error fetching order:", err); // More descriptive error logging.
        setOrder(null); // Ensure order state is null if fetching fails.
      } finally {
        setLoading(false);
      }
    };
    // Fetch order only if orderId is present.
    if (orderId) {
      fetchOrder();
    } else {
      setLoading(false); // If no orderId, immediately set loading to false.
    }
  }, [orderId]);

useEffect(() => {
  // 1. Don’t run until we actually have an order and wilayas
  if (!order || !order.wilaya) return;

  // 2. Find the matching wilaya record
 if (order.wilaya ===wilaya.name) {
  if(order.delivery_method === "home") {
    setDeliveryPrice(wilaya.home_delivery_price);
  } else {
    setDeliveryPrice(wilaya.desk_delivery_price);
  }
   
 }

}, [order, wilaya]);  

 


  // Loading State: Modernized with a subtle gradient background and a visual spinner.
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 font-sans">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 8.015v-4.707z"></path>
        </svg>
        <p className="text-lg text-gray-700">Processing your order details...</p>
      </div>
    );
  }

  // Not Found State: Enhanced with clear messaging and a distinct error visual.
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6 font-sans">
        {/* Using FaCheckCircle with red color and an animation to signify an issue */}
        <FaCheckCircle className="text-red-500 w-16 h-16 mb-4 animate-shake" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Order Not Found</h1>
        <p className="text-gray-600 text-center mb-6">
          We couldn't retrieve your order details. Please verify the order ID or try again later.
        </p>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-red-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <FaHome /> Go to Homepage
        </button>
      </div>
    );
  }

  // Successful Order Display: Refined layout, increased spacing, and clearer visual cues.
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-8 text-center border border-gray-200">

        {/* Success Icon and Main Heading */}
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 w-20 h-20 mb-4 animate-bounce" /> {/* Larger icon with bounce animation */}
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            شكراً على طلبك!
          </h1>
          <p className="text-lg text-gray-600 mt-2">Your order has been confirmed.</p>
        </div>

      

        {/* Order Summary Details */}
        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-300">Order Summary</h2>
          {/* Separated items with bottom borders for clarity */}
          <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
            <span className="text-gray-700 font-medium">Product:</span>
            <span className="font-semibold text-gray-800">{order.product.name}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <span className="font-semibold text-gray-800">{order.quantity}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
            <span className="text-gray-700 font-medium">Delivery Method:</span>
            <span className="font-semibold text-gray-800">
              {order.delivery_method === "home" ? "Home Delivery" : "Office Pickup"} {/* English for summary consistency */}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
            <span className="text-gray-700 font-medium">Delivery Price:</span>
            <span className="font-semibold text-gray-800">{deliveryPrice} DZD</span> {/* Explicit currency code */}
          </div>
           <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
            <span className="text-gray-700 font-medium">Product Price:</span>
            <span className="font-semibold text-gray-800">{order.product.price} DZD</span> {/* Explicit currency code */}
          </div>
          <div className="flex justify-between items-center pt-4"> {/* Enhanced spacing for total */}
            <span className="text-gray-700 font-bold text-xl">Total:</span>
            <span className="font-extrabold text-green-600 text-2xl">{order.total_price} DZD</span> {/* Larger, bolder, colored total */}
          </div>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-full shadow-xl hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          <FaHome className="w-6 h-6" /> Continue Shopping
        </button>
      </div>
    </div>
  );
}