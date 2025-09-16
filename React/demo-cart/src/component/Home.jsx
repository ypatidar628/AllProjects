import React, { useEffect, useState } from "react";
import Webservice from "../service/Webservice";
import WebAPI from "../service/WebAIP";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Slice";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // priceLowHigh, priceHighLow, ratingHighLow, latest, oldest
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const response = await Webservice.GetAPICall(WebAPI.ProductAPI);
      console.log("All data is", response.data?.products);
      setData(Array.isArray(response.data?.products) ? response.data.products : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log("Added to cart:", product);
  };

  // Filter and sort logic
  const filteredData = data
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "ratingHighLow":
          return b.rating - a.rating;
        case "ratingLowHigh":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });


  // console.log("Main img Data:", mainImage);
  

  return (
    <div className="mt-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64"
        />

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 px-4  py-2 rounded-lg w-full sm:w-48"
        >
          <option value="">Filter</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
          <option value="ratingLowHigh">Rating: Low to High</option>
          
        </select>
      </div>

      {/* Product Cards */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-4 flex flex-col"
            >
              {/* Thumbnail */}
              {product.thumbnail && (
                <img
                  src={mainImage.id == product.id ? mainImage.img : product.thumbnail}
                  alt={product.title}
                  className="h-48 w-40 object-cover self-center rounded-md mb-4 thumb"
                />
              )}

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-1 mt-3">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>

              {/* Category */}
              <p className="text-sm text-teal-600 font-medium mb-1">
                Category: {product.category}
              </p>

              {/* Brand */}
              <p className="text-sm text-gray-700 mb-1">Brand: {product.brand}</p>

              {/* Price + Discount */}
              <p className="text-lg font-bold text-green-600 mb-1">
                <span className="text-sm text-red-500 font-normal mr-1">
                  ({product.discountPercentage}% OFF)
                </span>
                ₹{product.price}
              </p>

              {/* Rating */}
              <p className="text-sm text-yellow-600 mb-1">⭐ {product.rating}</p>

              {/* Stock */}
              <p
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                } mb-3`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>

              {/* Images */}
              {Array.isArray(product.images) && product.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto mb-3">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      onClick={()=>setMainImage({'img': img , id : product.id})}
                      src={img}
                      alt="Product"
                      className="h-20 w-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
