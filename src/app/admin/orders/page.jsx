// File: app/admin/orders/page.jsx (or page.js)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/app/axios";
import {
  FaTrash,
  FaEye,
  FaEdit,
  FaSpinner,
  FaPlus,
  FaBoxOpen, // A new icon for the empty state
  FaExclamationTriangle, // A new icon for error alert
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Loading spinner                                                 */
/* ------------------------------------------------------------------ */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[70vh]">
    <FaSpinner className="w-16 h-16 text-indigo-600 animate-spin" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Error alert                                                    */
/* ------------------------------------------------------------------ */
const ErrorAlert = ({ message }) => (
  <div
    className="flex items-center gap-x-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md"
    role="alert"
  >
    <FaExclamationTriangle className="w-6 h-6 text-red-500" />
    <div>
      <p className="font-bold text-red-800">خطأ</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Order status helpers                                          */
/* ------------------------------------------------------------------ */
const statusInfo = {
  "en attente": { color: "yellow", text: "قيد الانتظار" },
  confirmé: { color: "green", text: "مؤكد" },
  "en livraison": { color: "blue", text: "جاري الشحن" },
  livré: { color: "indigo", text: "تم التسليم" },
  retour: { color: "red", text: "مرتجع" },
};

/* ------------------------------------------------------------------ */
/*  Main component                                                */
/* ------------------------------------------------------------------ */
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------------------------------------------------------------ */
  /*  Fetch orders                                                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get("/api/orders");
        setOrders(data.orders?.data || []);
      } catch (err) {
        setError(err.message || "فشل جلب الطلبات");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Update order status                                           */
  /* ------------------------------------------------------------------ */
  const updateStatus = async (id, newStatus) => {
    const prev = [...orders];
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    try {
      await apiClient.put(`/api/order/${id}`, { status: newStatus });
    } catch {
      setError("فشل تحديث الحالة");
      setOrders(prev);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Delete an order                                               */
  /* ------------------------------------------------------------------ */
  const deleteOrder = async (id) => {
    // Optionally, add a confirmation dialog here before deleting
    if (!confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) {
      return;
    }

    const prev = [...orders];
    setOrders(orders.filter((o) => o.id !== id));
    try {
      await apiClient.delete(`/api/order/${id}`);
    } catch {
      setError("فشل حذف الطلب");
      setOrders(prev);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto space-y-8">
        {" "}
        {/* Changed max-w-7xl to max-w-full */}
        {/* Header */}
        <header className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              <span className="text-indigo-600">طلبات الكتالوج</span>
            </h1>
            <p className="text-md text-gray-600 mt-2">
              إدارة جميع طلبات العملاء بكفاءة وفعالية.
            </p>
          </div>
        </header>
        {/* Loading / error / empty / table */}
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorAlert message={error} />}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-10 text-center space-y-6 flex flex-col items-center justify-center">
            <FaBoxOpen className="w-20 h-20 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-700">
              لا يوجد طلبات حالياً!
            </h2>
            <p className="text-gray-500 text-md max-w-md">
              يبدو أنه لا توجد طلبات في نظامك حتى الآن. يمكنك إضافة طلب جديد
              للبدء.
            </p>
       
          </div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto w-full">
              {" "}
              {/* Added w-full */}
              <table className="min-w-full text-sm text-right divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "العميل",
                      "المنتج",
                      "الكمية",
                      "الإجمالي",
                      "الحالة",
                      "التاريخ",
                      "الإجراءات",
                    ].map((h, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="px-3 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider" // Reduced px
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => {
                    const { color, text: statusText } = statusInfo[
                      order.status
                    ] || {
                      color: "gray",
                      text: order.status,
                    };

                    // Dynamic class generation based on status color
                    const statusClass = {
                      yellow:
                        "bg-yellow-100 text-yellow-800 border-yellow-300 focus:ring-yellow-500",
                      green:
                        "bg-green-100 text-green-800 border-green-300 focus:ring-green-500",
                      blue: "bg-blue-100 text-blue-800 border-blue-300 focus:ring-blue-500",
                      indigo:
                        "bg-indigo-100 text-indigo-800 border-indigo-300 focus:ring-indigo-500",
                      red: "bg-red-100 text-red-800 border-red-300 focus:ring-red-500",
                      gray: "bg-gray-100 text-gray-800 border-gray-300 focus:ring-gray-500",
                    }[color];

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        {/* Customer */}
                        <td className="px-3 py-4 whitespace-nowrap">
                          {" "}
                          {/* Reduced px */}
                          <div className="font-semibold text-gray-900 truncate">
                            {" "}
                            {/* Added truncate */}
                            {order.customer_name}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5 truncate">
                            {" "}
                            {/* Added truncate */}
                            {order.phone} | {order.wilaya}
                          </div>
                        </td>

                        {/* Product */}
                        <td className="px-3 py-4 text-gray-700 truncate">
                          {" "}
                          {/* Reduced px and Added truncate */}
                          {order.product?.name ?? "غير معروف"}
                        </td>

                        {/* Quantity */}
                        <td className="px-3 py-4 whitespace-nowrap text-center text-gray-700">
                          {" "}
                          {/* Reduced px */}
                          {order.quantity}
                        </td>

                        {/* Total */}
                        <td className="px-3 py-4 whitespace-nowrap font-bold text-gray-800">
                          {" "}
                          {/* Reduced px */}
                          {order.total_price.toLocaleString()} DA
                        </td>

                        {/* Status */}
                        <td className="px-3 py-4 whitespace-nowrap">
                          {" "}
                          {/* Reduced px */}
                          <div className="relative inline-block w-40">
                            {" "}
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateStatus(order.id, e.target.value)
                              }
                              className={`block w-full py-2 px-4 pr-10 text-center text-xs font-semibold rounded-full border-2 cursor-pointer
                                  ${statusClass}
                                  focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200`}
                              style={{
                                // Custom arrow for select dropdown (using base64 SVG)
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E\")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "left 0.75rem center", // Adjusted for RTL
                                backgroundSize: "1.5rem",
                                // Remove default arrow
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                appearance: "none",
                              }}
                            >
                              {Object.entries(statusInfo).map(([k, v]) => (
                                <option key={k} value={k}>
                                  {v.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-3 py-4 whitespace-nowrap text-gray-500">
                          {" "}
                          {/* Reduced px */}
                          {new Date(order.created_at).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-4 whitespace-nowrap text-right">
                          {" "}
                          {/* Reduced px */}
                          <div className="flex items-center justify-end space-x-3 space-x-reverse">
                         

                     

                            <button
                              onClick={() => deleteOrder(order.id)}
                              title="حذف الطلب"
                              className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                            >
                              <FaTrash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}
