import React, { useEffect, useState } from "react";
import "../css/Product.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { Flip, toast, ToastContainer } from "react-toastify";

function Products() {
  const userData = useSelector((state) => state.userData.value);
  console.log("userData in product page", userData.token);

  const [products, setProducts] = useState([]);
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchbrands();
  }, []);

  //Fetch Products from backend and display here
  const fetchProducts = async () => {
    try {
      const resp = await WebService.getAPICall(
        WebAPI.viewAllProduct,
        userData.token
      );
      console.log("Products fetched", resp.data);
      if (resp.data.status === true) {
        setProducts(resp.data);
        toast.success("brands fetched successfully!");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    // console.log("products", products.data.product);
  };

  //Fetch Brand
  const fetchbrands = async () => {
    try {
      var resp = await WebService.getAPICall(
        WebAPI.viewAllBrand,
        userData.token
      );
      console.log("brands fetched successfully:", resp.data.data.brand);
      if (resp.data.status === true) {
        setbrands(resp.data.data.brand);
        toast.success("brands fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  return (
    <div className="main-div">
      <div className="sidebar">
        {/* Filter and Search */}
        <div className="filter-search-container">
          {/* Filter Dropdown */}
          <div className="filter-dropdown">
            <label htmlFor="product-filter" style={{ color: "white" }}>
              Filter Products:
            </label>
            <select id="product-filter" className="filter-select">
              <option value="all">All Products</option>
              <option value="category1">Low to High</option>
              <option value="category2">High to Low</option>
              <option value="category3">New Arrival</option>
            </select>
          </div>
          {/* Search Bar */}
          <div className="search-bar">
            <label htmlFor="product-search" style={{ color: "white" }}>
              Search:
            </label>
            <div className="search-input-container">
              <input
                type="text"
                id="product-search"
                className="search-input"
                placeholder="Search products..."
              />
              <button className="search-button">
                <img src="\src\component\img\icon\search.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <h2>Products</h2>
        <ul>
          <li>
            <Link> Men's </Link>
          </li>
          <li>
            <Link> Women's </Link>
          </li>
          <li>
            <Link> Kid'z </Link>
          </li>
          <li>
            <Link> Beauty </Link>
          </li>
          <li>
            <Link> Accessories </Link>
          </li>
        </ul>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.data?.product.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={p.product_image}
                  alt={p.product_name}
                  className="w-full h-full  object-content group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  ₹{p.product_price}
                </span>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {p.product_name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {p.product_details}
                </p>

                <div className="text-xs text-gray-400 space-y-1 mb-4">
                  {brands.map((brand) => {
                    if (brand._id == p.brandId) {
                      return (
                        <p key={brand._id} className="capitalize">
                          Brand: {brand.brand_name}
                        </p>
                      );
                    }
                  })}
                </div>
                {/* Price + Button */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-green-700">
                    ₹{p.product_price}
                  </span>
                  <button
                    onClick={() => onAddToCart(p)}
                    className="px-4 py-2 bg-[#4F6E62]  rounded-lg text-sm shadow-md hover:bg-[#578d78] transition"
                  >
                    <span className="text-white">🛒 Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={1000} // Auto close after 3 sec
          hideProgressBar={false}
          newestOnTop={true} // Newest toast will show on top
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={2}
          transition={Flip}
        />
      </div>
    </div>
  );
}

export default Products;
