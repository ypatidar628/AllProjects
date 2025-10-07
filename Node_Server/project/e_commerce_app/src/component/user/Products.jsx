import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flip, toast, ToastContainer } from "react-toastify";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import CartService from "../service/CartService";
import OrderService from "../service/OrderService";

function Products() {
  const userData = useSelector((state) => state.userData.value);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategorys();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const resp = await WebService.getAPICall(WebAPI.viewAllProduct, userData.token);
      if (resp.data.status === true) {
        setProducts(resp.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch Brands
  const fetchBrands = async () => {
    try {
      const resp = await WebService.getAPICall(WebAPI.viewAllBrand, userData.token);
      if (resp.data.status === true) {
        setBrands(resp.data.data.brand);
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  // Fetch Categories
  const fetchCategorys = async () => {
    try {
      const resp = await WebService.getAPICall(WebAPI.viewAllCategory, userData.token);
      if (resp.data.status === true) {
        setCategorys(resp.data.data.category);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Add to cart
  const onAddToCart = async (p) => {
    try {
      const data = {
        userId: userData.user._id,
        userName: userData.user.name,
        userEmail: userData.user.email,
        productId: p._id,
        product_name: p.product_name,
        category_name:
          categorys.find((cat) => cat._id == p.categoryId)?.category_name ||
          "Uncategorized",
        product_price: p.product_price,
        product_image: p.product_image,
        quantity: 1,
      };

      const resp = await CartService.addToCart(userData.token, data);
      if (resp.data.status === true) {
        toast.success("✅ Item added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Buy Now
  const buyNow = async (p) => {
    try {
      const data = {
        userId: userData.user._id,
        userName: userData.user.name,
        userEmail: userData.user.email,
        productId: p._id,
        product_name: p.product_name,
        category_name:
          categorys.find((cat) => cat._id == p.categoryId)?.category_name ||
          "Uncategorized",
        product_price: p.product_price,
        product_image: p.product_image,
        quantity: 1,
      };

      const addCartResp = await CartService.addToCart(userData.token, data);
      if (addCartResp.data.status === true) {
        const orderResp = await OrderService.placeOrder(userData.user._id, userData.token);
        if (orderResp.data.status === true) {
          toast.success("✅ Order placed successfully!");
        }
      }
    } catch (error) {
      console.error("Error in Buy Now:", error);
    }
  };

  const navigateTologin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white overflow-x-hidden">

      {/* ================= Sidebar (Top Horizontal Bar) ================= */}
      <div className="w-full bg-[#90c5dfc3] text-black px-5 flex flex-col items-center gap-4 shadow-md">

        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold border-b border-white/40  text-center tracking-wide">
          Products
        </h2>

        {/* Filter + Search */}
        <div className="w-full flex flex-wrap justify-between items-center gap-4">

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 mt-2 w-full sm:w-auto">
            <label htmlFor="product-filter" className="font-semibold text-sm">Filter Products:</label>
            <select
              id="product-filter"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3b5d50] focus:shadow-sm text-sm"
            >
              <option value="all">All Products</option>
              <option value="category1">Low to High</option>
              <option value="category2">High to Low</option>
              <option value="category3">New Arrival</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 mt-2 w-full sm:w-auto">
            <label htmlFor="product-search" className="font-semibold text-sm">Search:</label>
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                id="product-search"
                placeholder="Search products..."
                className="w-full p-2 pl-3 pr-9 border border-gray-300 rounded-md focus:outline-none focus:border-[#3b5d50] focus:shadow-sm text-sm"
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <img src="\src\component\img\icon\search.png" alt="search" className="w-5 h-5 filter brightness-0" />
              </button>
            </div>
          </div>

        </div>

        {/* Category Menu */}
        <ul className="flex flex-wrap justify-center gap-4 mt-2">
          {["Men's", "Women's", "Kid'z", "Beauty", "Accessories"].map((cat, i) => (
            <li
              key={i}
              className="bg-white/15 px-4 py-2 rounded-md text-base font-semibold cursor-pointer hover:bg-white/40 hover:-translate-y-1 transition-all"
            >
              <Link>{cat}</Link>
            </li>
          ))}
        </ul>

      </div>

      {/* ================= Main Content Grid ================= */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.data?.product.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={p.product_image}
                  alt={p.product_name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  ₹{p.product_price}
                </span>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate capitalize">
                  {p.product_name}
                </h3>

                <div className="text-xs text-gray-400 space-y-1 mb-4">
                  {brands.map(
                    (brand) =>
                      brand._id == p.brandId && (
                        <p key={brand._id} className="capitalize">
                          Brand: {brand.brand_name}
                        </p>
                      )
                  )}

                  <span className="text-lg font-bold text-green-700">
                    Price: ₹{p.product_price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex items-center justify-between">
                  <button
                    className="px-4 py-2 bg-[#e88a17] rounded-lg text-sm shadow-md hover:bg-[#e07e06] transition"
                    onClick={() => userData.isLoginStatus ? buyNow(p) : navigateTologin()}
                  >
                    Buy Now
                  </button>

                  <button
                    className="px-4 py-2 bg-[#64a3c2] rounded-lg text-sm text-white shadow-md hover:bg-[#90C5DF] transition"
                    onClick={() => userData.isLoginStatus ? onAddToCart(p) : navigateTologin()}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={2}
        transition={Flip}
      />
    </div>
  );
}

export default Products;
