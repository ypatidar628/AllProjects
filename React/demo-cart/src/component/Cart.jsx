import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { incrementQty, decrementQty, removeData } from "../redux/Slice";
import gsap from "gsap";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items); // ✅ match our slice
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    gsap.from(cartRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before placing an order.");
      return;
    }
    setOrderSuccess(true);
    setErrorMessage("");
  };

  const formatPrice = (value) => {
    return `₹${value.toFixed(2)}`;
  };
console.log("Cart Items:", cartItems  );

  return (
    <div className="container mx-auto p-6" ref={cartRef}>
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">S No.</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cartItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="text-gray-500">Discount: {item.discountPercentage}%</p>
                    <p className="text-gray-500">Category: {item.category}</p>
                    <p className="text-gray-700 font-semibold">
                      Price: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-6 flex items-center gap-4 justify-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={() => dispatch(decrementQty(item.id))}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => dispatch(incrementQty(item.id))}
                  >
                    +
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                    onClick={() => dispatch(removeData(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={handleOrderNow}
        >
          Order Now
        </button>
      </div>

      {orderSuccess && (
  <div className="mt-6 p-6 bg-green-100 text-green-800 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold">Order Successfully Placed!</h2>
    <p className="mt-2">Thank you for your order. Here are your order details:</p>
    <ul className="mt-2 list-disc list-inside">
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.title} - Quantity: {item.quantity} - Total:{" "}
          {formatPrice(item.price * item.quantity)}
        </li>
      ))}
    </ul>

    {/* ✅ Total Order Price */}
    <p className="mt-4 text-xl font-bold">
      Grand Total:{" "}
      {formatPrice(
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      )}
    </p>
  </div>
)}

    </div>
  );
}

export default Cart;
