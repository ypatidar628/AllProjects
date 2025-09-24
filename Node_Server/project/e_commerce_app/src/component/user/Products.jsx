import React, { useEffect, useState } from "react";
import "../css/Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { Flip, toast, ToastContainer } from "react-toastify";
import CartService from "../service/CartService";

function Products() {
  const userData = useSelector((state) => state.userData.value);
  console.log("userData in product page", userData);

  const [products, setProducts] = useState([]);
  const [brands, setbrands] = useState([]);
  const [categorys , setCategorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchbrands();
    fetchcategorys();
  }, []);

  //Fetch Products from backend and display here
  const fetchProducts = async () => {
    try {
      const resp = await WebService.getAPICall(
        WebAPI.viewAllProduct,
        userData.token
      );
      // console.log("Products fetched", resp.data);
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
      // console.log("brands fetched successfully:", resp.data.data.brand);
      if (resp.data.status === true) {
        setbrands(resp.data.data.brand);
        toast.success("brands fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  
    //View All Category
    const fetchcategorys = async () => {
      try {
        var resp = await WebService.getAPICall(
          WebAPI.viewAllCategory,
          userData.token
        );
        if (resp.data.status === true) {
          setCategorys(resp.data.data.category);
          toast.success("categorys fetched successfully!");
        }
      } catch (error) {
        console.error("Error fetching categorys:", error);
      }
    };

  //Add to cart function
  const onAddToCart = async (p) => {
    // console.log("Product to add to cart:", p);
      // console.log("Category to add to cart:", c);
      
    const categorySend = categorys.find((cat) => cat._id == p.categoryId ? cat._id : "Uncategorized");

    try{
      const userId = await userData.user._id;
      const userName = await userData.user.name;
      const userEmail = await userData.user.email;

      const data = {
            userId : userId,
            userName : userName,
            userEmail : userEmail,
            productId : p._id,
            product_name : p.product_name,
            category_name : categorySend._id == p.categoryId ? categorySend.category_name : "Uncategorized",
            product_price : p.product_price,
            product_image : p.product_image,
            quantity: 1
    };
    console.log("sending data",data);
    
      // console.log("User ID:", userId);  

      const resp = await CartService.addToCart(userData.token, data);
      console.log("Add to Cart Response:", resp.data);
      
    }
    catch(error){
      console.error("Error adding to cart:", error);
    }
  }

  const navigateTologin = () =>{
    navigate('/login');
  }

  return (
    <div className="main-div">
      <div className="sidebar">
        {/* Filter and Search */}
        <div className="filter-search-container">
          {/* Filter Dropdown */}
          <div className="filter-dropdown">
            <label htmlFor="product-filter" >
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
            <label htmlFor="product-search" >
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
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate capitalize">
                  {p.product_name}
                </h3>

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
                    onClick={() => userData.isLoginStatus ===true ? onAddToCart(p) :navigateTologin()}
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
