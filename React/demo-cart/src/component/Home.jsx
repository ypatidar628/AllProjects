import React, { useEffect, useState } from "react";
import Webservice from '../service/Webservice';
import WebAPI from '../service/WebAIP';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Slice";

const Home = () => {
  const [data, setData] = useState([]);
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
//   alert(`${product.title} added to cart!`);
};

  return (
    <div className="mt-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-4 flex flex-col"
            >
              {/* Thumbnail */}
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-md mb-4"
                />
              )}

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
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
              <p className="text-sm text-yellow-600 mb-1">
                ⭐ {product.rating}
              </p>

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
