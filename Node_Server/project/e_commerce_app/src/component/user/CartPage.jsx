import React, { useEffect, useState } from "react";
import CartService from "../service/CartService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import OrderService from "../service/OrderService";

const CartPage = () => {
  const userData = useSelector((state) => state.userData.value);


  // console.log(userData.token);
  

  const [cart, setCart] = useState("");
  
  console.log("cart", cart);

  useEffect(() => {
    fetchCart();
  }, []);

 
    
  // Fetch cart function
  const fetchCart = async () => {
    try {
      if (!userData?.user?._id) {
        console.warn("User not logged in. Cannot fetch cart.");
        return;
      }

      const userId = userData.user._id;
    console.log("Fetching cart for userId:", userId);
    
      const res = await CartService.getCart(userId, userData.token);

      if (res.data?.status) {
        console.log("Fetch Cart Response:", res.data.data);
        setCart(res.data.data); // Store cart items in state
    
      } else {
        console.warn("No cart data found:", res.data.message);
        setCart([]); // Clear cart if no items found
      }
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      setCart([]);
    }
  };

  // Update quantity
  const handleQuantityChange = async (productId, quantity) => {
    console.log(productId, ":", quantity);

    if(quantity === 0) {
      handleRemove(productId);
    }
    try {
      if (quantity < 1) return;
      const resp = await CartService.updateCartItem(productId, userData.token, quantity);
      // console.log("Quantity Handel resp :", resp);

      toast.success("Quantity updated!");
      fetchCart();
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update quantity");
    }
  };

  // Remove item
  const handleRemove = async (_id) => {
    console.log(_id);
    
    try {
      const resp = await CartService.removeCartItem( _id, userData.token );
      console.log("Cart item Removed resp :",resp);
      
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
    if (!cart || cart.length === 0) return;

    // Assuming cart[0] contains cart-level _id and userId
    const { userId } = cart[0];
    console.log("Clear Cart Params:",  userId);

    await CartService.clearCart( userId, userData.token);

    toast.success("Cart cleared!");
    fetchCart();
  } catch (err) {
    console.error("Clear Error:", err); 
    toast.error("Failed to clear cart");
  }
};

const handleOrder = async () => {
try{
  if (!cart || cart.length === 0) {
    toast.error("Your cart is empty.");
  };
  // Proceed with order placement logic here
  console.log("Placing order for user:", userData.token);
  

  const order = await OrderService.placeOrder( userData.user._id , userData.token);
  console.log("Order Response:", order);
  toast.success("Order placed successfully!");
  fetchCart();  
}
catch(err){
  console.error("Order Error:", err);
  toast.error("Failed to place order");
}

}


  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="max-w-[95%] mx-auto p-6">
      <h2 className="text-3xl font-bold  flex justify-center ">
        <span className="text-[#3B5D50] mb-12">🛒 Your Cart</span>
      </h2>

      {/* Grid for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cart.map((item) => (
        
        <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-full h-full  object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                ₹{item.product_price}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 capitalize">
                {item.product_name}
              </h3>
              <p className="text-gray-600 mb-3">Price: ₹{item.product_price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mb-3">
                <h5 className="text-gray-600">Quantity:</h5>
                <button
                  className="px-2  bg-gray-200 rounded"
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="text-black p-2 rounded-lg hover:underline self-start bg-red-500"
                onClick={() => handleRemove(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="flex justify-between items-center mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold">
          Total: ₹
          {cart.reduce(
            (total, item) => total + item.product_price * item.quantity,
            0
          )}
        </h3>
      
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
          onClick={() => handleClear()}
        >
          Clear Cart
        </button>

        <button
          className="bg-orange-400 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-500"
          onClick={() => handleOrder()}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
