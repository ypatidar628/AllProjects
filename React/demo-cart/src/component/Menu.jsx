import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Menu() {
  const cartItems = useSelector((state) => state.cart.items); // ✅ updated to match new slice
  const navRef = useRef(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-6">
        <nav ref={navRef} className="flex justify-between items-center">
          <div className="text-2xl font-bold uppercase">
            <Link to="/" className="hover:text-gray-300 transition">
              Shopping Cart App
            </Link>
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-lg hover:text-gray-300 transition">
                Cart:{" "}
                <span className="bg-red-500 px-2 py-1 rounded-full text-white">
                  {cartItems.length}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
