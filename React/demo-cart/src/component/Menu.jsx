import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";


function Menu() {
  const cartItems = useSelector((state) => state.cart.items);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });

    // Scroll event to detect scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-800/70 backdrop-blur-xs   shadow-lg"
          : "bg-gray-800 text-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav ref={navRef} className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold uppercase text-white">
            <FaShoppingCart size={24} className="inline-block mr-4 mb-1" />
            <Link to="/" className="hover:text-gray-300 transition">
              Shopping Cart App
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <Link to="/" className="text-lg hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-lg hover:text-gray-300 transition">
                Cart{" "}
                <span className=" px-2 py-1 rounded-full text-red-500 font-bold">
                  {(cartItems.length != 0) ? cartItems.length : ""}
                </span>
                  <FaCartPlus className="inline-block ml-1" />
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-white">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-lg hover:text-gray-300 transition"
            >
              Home
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="block text-lg hover:text-gray-300 transition"
            >
              Cart:{" "}
              <span className="bg-red-500 px-2 py-1 rounded-full text-white">
                {cartItems.length}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
