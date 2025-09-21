import React, { useEffect, useState } from "react";
import CartService from "../service/CartService";
import { toast } from "react-toastify";

const CartPage = ({ userData }) => {
  const [cart, setCart] = useState(null);
  const token = userData?.token;

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await CartService.getCart(token);
      setCart(res.data.data);
    } catch (err) {
      console.error("Fetch Cart Error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const handleQuantityChange = async (productId, quantity) => {
    try {
      if (quantity < 1) return;
      await CartService.updateCartItem(token, productId, quantity);
      toast.success("Quantity updated!");
      fetchCart();
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update quantity");
    }
  };

  // Remove item
  const handleRemove = async (productId) => {
    try {
      await CartService.removeCartItem(token, productId);
      toast.success("Item removed!");
      fetchCart();
    } catch (err) {
      console.error("Remove Error:", err);
      toast.error("Failed to remove item");
    }
  };

  // Clear cart
  const handleClear = async () => {
    try {
      await CartService.clearCart(token);
      toast.success("Cart cleared!");
      fetchCart();
    } catch (err) {
      console.error("Clear Error:", err);
      toast.error("Failed to clear cart");
    }
  };

  if (!cart || cart.items?.length === 0) {
    return <p className="text-center mt-10">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.product._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-500">
                Price: ₹{item.product.price} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="ml-4 text-red-500 hover:underline"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-bold">
          Total: ₹
          {cart.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          )}
        </h3>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleClear}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
