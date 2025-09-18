import React from "react";
import "../css/Product.css";
import { Link } from "react-router-dom";


function Products() {
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
              <button className="search-button"><img src="\src\component\img\icon\search.png" alt="" /></button>
            </div>
          </div>
        </div>
        <h2>Products</h2>
        <ul>
          <li><Link> Men's </Link></li>
          <li><Link> Women's </Link></li>
          <li><Link> Kid'z </Link></li>
          <li><Link> Beauty </Link></li>
          <li><Link> Accessories </Link></li>
        </ul>
      </div>


      {/* All content div start */}
      <div className="main-content">
        <h1>Hello</h1>
      </div>
    </div>
  );
}

export default Products;
