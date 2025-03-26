import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { dicrimentQty, incrimentQty, removeData } from "../redux/Slice";
import gsap from "gsap";

function Cart() {
  const data = useSelector((state) => state.MyStoreData.value);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    gsap.from(cartRef.current, { opacity: 0, y: 50, duration: 0.8, ease: "power2.out" });
  }, []);

  const handleOrderNow = () => {
    if (data.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before placing an order.");
      return;
    }
    setOrderSuccess(true);
    setErrorMessage("");
  };

  return (
    <div className="container mx-auto p-6" ref={cartRef}>
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm leading-normal justify-center content-center place-self-center">
              <th className="py-3 px-6 text-left">S No.</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((cdata, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center gap-4">
                  <img
                    src={cdata.productData.thumbnail}
                    alt={cdata.productData.title}
                    className="h-20 w-20 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-lg">{cdata.productData.title}</p>
                    <p className="text-gray-500">Discount: {cdata.productData.discountPercentage}%</p>
                    <p className="text-gray-500">Category: {cdata.productData.category}</p>
                    <p className="text-gray-700 font-semibold">Price: ${cdata.productData.price * cdata.qty}</p>
                  </div>
                </td>
                <td className="py-3 px-6 flex items-center gap-4">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={() => dispatch(dicrimentQty(cdata.productData.id))}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{cdata.qty}</span>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => dispatch(incrimentQty(cdata.productData.id))}
                  >
                    +
                  </button>
                </td>
                <td className=" font-semibold p-4 mr-10 text-2xl">{cdata.qty}</td>
                <td className="py-3 px-6">
                  <button
                    className="bg-red-600 text-white px-4 py-2 text-right rounded-lg shadow-md hover:bg-red-700 transition"
                    onClick={() => dispatch(removeData(cdata.productData.id))}
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
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition" onClick={handleOrderNow}>Order Now
        </button>
      </div>
      {orderSuccess && (
        <div className="mt-6 p-6 bg-green-100 text-green-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Order Successfully Placed!</h2>
          <p className="mt-2">Thank you for your order. Here are your order details:</p>
          <ul className="mt-2 list-disc list-inside">
            {data.map((cdata, index) => (
              <li key={index}>{cdata.productData.title} - Quantity: {cdata.qty} - Total: ${cdata.productData.price * cdata.qty}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cart;