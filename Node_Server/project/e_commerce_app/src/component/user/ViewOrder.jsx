import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../service/OrderService";

const ViewOrder = () => {
  const userData = useSelector((state) => state.userData.value);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For order modal
  const [selectedProduct, setSelectedProduct] = useState(null); // For single product modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSingleOrder, setIsOpenSingleOrder] = useState(false);

  useEffect(() => {
    fetchOrdersByUser();
  }, []);

  const fetchOrdersByUser = async () => {
    try {
      const resp = await OrderService.getOrdersByUser(
        userData.user._id,
        userData.token
      );

      if (resp.data?.status) {
        setOrders(resp.data.data);
      }
    } catch (err) {
      console.error("Fetch Orders Error:", err);
    }
  };

  const fetchOrderById = async (id, orderId) => {
    try {
      const resp = await OrderService.getOrderById(id, orderId, userData.token);

      if (resp.data?.status) {
        setSelectedProduct(resp.data.data); // set single product
        setIsOpenSingleOrder(true);
      }
    } catch (err) {
      console.error("Fetch Order By ID Error:", err);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsOpen(false);
  };

  const closeSingleOrderModal = () => {
    setSelectedProduct(null);
    setIsOpenSingleOrder(false);
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
    <div className="max-w-[95%] mx-auto p-6 w-full">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#3B5D50]">
        🛍️ Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Order ID:{" "}
                  <span className="text-[#3B5D50]">{order._id.slice(-6)}</span>
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusClasses(order.status)}`}
                  title={`Order is currently ${order.status}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Total & Date */}
              <div className="flex justify-between mb-3">
                <p className="text-gray-700 font-medium">
                  💰 Total:{" "}
                  <span className="text-[#3B5D50] font-semibold">
                    ₹{order.totalAmount}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Items Preview */}
              <div className="bg-gray-50 rounded-lg p-3 shadow-inner flex-1">
                <h4 className="font-semibold text-gray-700 mb-2">🛒 Items:</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b pb-2 last:border-none cursor-pointer"
                      onClick={() => fetchOrderById(order._id, item._id)}
                      title="Click to view order details"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="md:w-36 md:h-36 object-cover rounded-lg"
                        />
                        <span className="capitalize text-lg font-bold">
                          {item.product_name}
                        </span>
                      </div>
                      <span className="text-gray-700 text-lg font-semibold">
                        {item.quantity} × ₹{item.product_price} ={" "}
                        <span className="text-[#3B5D50] font-semibold">
                          ₹{item.product_price * item.quantity}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between gap-3">
                <button
                  onClick={() => openModal(order)}
                  className="px-4 py-2 rounded-lg bg-[#90C5DF] text-white text-sm font-medium shadow hover:bg-[#659bb7] transition"
                  title="Click to view full order details"
                >
                  🔍 View Details
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600 transition">
                  ✖️Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================== FULL ORDER MODAL ================== */}
      {isOpen && selectedOrder && (
        <div className="fixed inset-0 bg-[#90c5df84] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-[#3B5D50] mb-4">
              Order Details
            </h2>

            <p className="mb-2">
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(selectedOrder.status)}`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p className="mb-2">
              <strong>Total:</strong> ₹{selectedOrder.totalAmount}
            </p>
            <p className="mb-4">
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {selectedOrder.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-36 h-36 object-cover rounded-lg flex-shrink-0"
                    />
                    <span className="capitalize text-lg font-bold">
                      {item.product_name}
                    </span>
                  </div>
                  <span className="text-gray-700 text-lg font-semibold">
                    {item.quantity} × ₹{item.product_price} ={" "}
                    <span className="text-[#3B5D50] font-semibold">
                      ₹{item.product_price * item.quantity}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ================== SINGLE PRODUCT MODAL ================== */}
      {isOpenSingleOrder && selectedProduct && (
        <div className="fixed inset-0 bg-[#90c5df84] bg-opacity-50] flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button
              onClick={closeSingleOrderModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold text-[#3B5D50] mb-4">
              Product Details
            </h2>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.product_image}
                alt={selectedProduct.product_name}
                className="w-40 h-40 object-cover rounded-lg shadow mb-4"
              />
              <p className="text-lg font-semibold capitalize">
                {selectedProduct.product_name}
              </p>
              <p className="text-gray-700 mt-2">
                Quantity: {selectedProduct.quantity}
              </p>
              <p className="text-gray-700">
                Price: ₹{selectedProduct.product_price}
              </p>
              <p className="text-[#3B5D50] font-bold mt-2">
                Total: ₹
                {selectedProduct.product_price * selectedProduct.quantity}
              </p>
              <div>
                 <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600 transition">
                  ✖️Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
