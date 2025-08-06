"use client";
import apiClient from "@/app/axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get("/api/orders");
        console.log(response.data.orders.data);
        setOrders(response.data.orders.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  //update the order status
  const handleUpdate = async (id, status) => {
    await apiClient.put(`/api/order/${id}`, { status });
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/order/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };



  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-sm text-gray-600 uppercase bg-gray-50">
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Wilaya</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white shadow rounded-xl">
                  <td className="p-3 font-medium text-gray-800">
                    {order.customer_name}
                  </td>
                  <td className="p-3 text-gray-600">{order.phone}</td>
                  <td className="p-3 text-gray-600">{order.wilaya}</td>
                  <td className="p-3 text-gray-600">{order.product.name}</td>
                  <td className="p-3 text-gray-600">{order.quantity}</td>
                  <td className="p-3 text-gray-600">{order.total_price} DA</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdate(order.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-full text-xs font-semibold border-none focus:ring-2 
    ${
      order.status === "confirmé"
        ? "bg-green-100 text-green-700"
        : order.status === "en attente"
        ? "bg-yellow-100 text-yellow-700"
        : order.status === "en livraison"
        ? "bg-blue-100 text-blue-700"
        : order.status === "livré"
        ? "bg-purple-100 text-purple-700"
        : "bg-red-100 text-red-700"
    }`}
                    >
                      <option value="en attente">En attente</option>
                      <option value="confirmé">Confirmé</option>
                      <option value="en livraison">En livraison</option>
                      <option value="livré">Livré</option>
                      <option value="retour">Retour</option>
                    </select>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                
                
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
