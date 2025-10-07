import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../service/OrderService";

const OrderController = () => {
  const userData = useSelector((state) => state.userData.value);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const resp = await OrderService.fetchAllOrders(userData.token);
      if (resp.status === 200) {
        setOrders(resp.data.data);
      } else {
        console.log("Order Not found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Open modal for specific order
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  // Save updated status
  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      // Call backend API (dummy example, replace with your update service)
      await OrderService.updateOrderStatus(selectedOrder._id, newStatus, userData.token);

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder._id ? { ...order, status: newStatus } : order
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
   const getStatusClasses = (status) => {
    // console.log(
    // "Status Classes Called for status:" , status
    // );
    
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700"; 
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3B5D50]">
          Manage Orders
        </h1>
      </div>

      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            {/* Order Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-[#3B5D50]">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold">
                  {order.userName}{" "}
                  <span className="text-gray-600">({order.userEmail})</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusClasses(order.status)}`}
                  title={`Order is currently ${order.status}`}
                >
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Placed On</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-lg text-[#3B5D50]">
                  ₹{order.totalAmount}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              🛒 Ordered Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg text-m">
                <thead className="bg-[#90C5DF] text-blac ">
                  <tr className="capitalize" >
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-center">Price</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-48 h-48 object-cover mt-4 ml-2 p-2 rounded-xl border"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium capitalize">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-2 text-center">
                        ₹{item.product_price}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-center font-bold text-[#3B5D50]">
                        ₹{item.product_price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={() => handleOpenModal(order)}
                className="px-4 py-2 rounded-lg bg-[#63a1c0] text-white text-sm font-medium shadow hover:bg-[#588da8] transition"
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-[#3B5D50] mb-4">
              Update Order Status
            </h2>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3B5D50] focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-300 text-sm font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 rounded-lg bg-[#3B5D50] text-white text-sm font-medium shadow hover:bg-[#588da8]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderController;
