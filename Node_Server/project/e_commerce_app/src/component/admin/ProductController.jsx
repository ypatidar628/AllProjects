import { useEffect, useRef, useState } from "react";
import "../css/ProductController.css";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";
import { Flip, toast, ToastContainer } from "react-toastify";

const ProductController = () => {
  const userData = useSelector((state) => state.userData.value);
  const [view, setView] = useState("none");
  const [products, setProducts] = useState([]);
  const [categorys, setcategorys] = useState([]);
  const [brands, setbrands] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  console.log("token " + userData.token);

  // console.log("products", products);

  useEffect(() => {
    fetchProducts();
    fetchCategory();
    fetchbrands();
  }, [""]);
  const nameRef = useRef();
  const categoryRef = useRef();
  const detailsRef = useRef();
  const brandRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();

  const resetForm = () => {
    nameRef.current.value = "";
    categoryRef.current.value = "";
    detailsRef.current.value = "";
    brandRef.current.value = "";
    imageRef.current.value = "";
    priceRef.current.value = "";
  };
  console.log(categorys);

  //Handle Product  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      product_name: nameRef.current.value,
      categoryId: categoryRef.current.value,
      product_details: detailsRef.current.value,
      brandId: brandRef.current.value,
      product_image: imageRef.current.value,
      product_price: priceRef.current.value,
    };
    console.log("products", newProduct);

    try {
      var resp = await WebService.postAPICallWithToken(
        WebAPI.saveProduct,
        newProduct,
        userData.token
      );
      console.log("Product saved successfully:", resp.data);
      if (resp.data.status === "success") {
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }

    resetForm();
    setView("none");
    fetchProducts();
  };

  // Handle Product Edit
  const handleEdit = async (e) => {
    e.preventDefault(e);

    try{
      const resp = await WebService.putAPICallWithToken(
        `${WebAPI.updateProduct(editProductId)}`, // append id here
        userData.token,
        {
          product_name: nameRef.current.value,
          categoryId: categoryRef.current.value,
          product_details: detailsRef.current.value,
          brandId: brandRef.current.value,
          product_image: imageRef.current.value,
          product_price: priceRef.current.value,
        }
      );
      console.log("Product Updated:", resp.data);

      if(resp.data.status){
        toast.success("Product updated successfully!");
        fetchProducts();
        setView("none");
        setIsEdit(false);
        setEditProductId(null);
      } else {
        toast.error("Failed to update product!");
      }
    }
    catch(error){
      console.error("Error updating product:", error);
    }
  }


  //Fetch Products
  const fetchProducts = async () => {
    try {
      var resp = await WebService.getAPICall(
        WebAPI.viewAllProduct,
        userData.token
      );
      console.log("Products fetched successfully:", resp.data.data.product);
      if (resp.data.status === true) {
        setProducts(resp.data.data.product);
        toast.success("Products fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //Fetch Category
  const fetchCategory = async () => {
    try {
      var resp = await WebService.getAPICall(
        WebAPI.viewAllCategory,
        userData.token
      );
      console.log("Category fetched successfully:", resp.data.data.category);
      if (resp.data.status === true) {
        setcategorys(resp.data.data.category);
        // toast.success("Category fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  //fetch Brand
  const fetchbrands = async () => {
    try {
      var resp = await WebService.getAPICall(
        WebAPI.viewAllBrand,
        userData.token
      );
      console.log("brands fetched successfully:", resp.data.data.brand);
      if (resp.data.status === true) {
        setbrands(resp.data.data.brand);
        // toast.success("brands fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  //Handel Delete
  const handleDelete = async (product_name) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const resp = await WebService.deleteAPICall(
        WebAPI.deleteProduct,
        userData.token,
        { product_name }
      );
      console.log("Product deleted successfully:", resp.data);

      if (resp.data.status === true) {
        toast.success("Product deleted successfully!");
        fetchProducts(); // refresh list
      } else {
        toast.error("Failed to delete product!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Something went wrong while deleting.");
    }
    fetchProducts(); // refresh list
  };


  return (
    <div className="container">
      <h1 className="heading">Welcome To Product Controller</h1>

      <div className="button-row">
        <button className="btn-success" onClick={() =>{
          setIsEdit(false);
           setView("form")
        }
        }>
          Add Product
        </button>
        <button className="btn-danger" onClick={() => setView("table")}>
          Manage Products
        </button>
      </div>

      {view === "form" && (
        <form onSubmit={isEdit ? handleEdit : handleSubmit} className="form-container">
          <h2 className="form-title">{isEdit ? "Edit Product" : "Add Product"}</h2>

          <input
            type="text"
            placeholder="Product Name"
            className="form-input capitalize"
            ref={nameRef}
            defaultValue={isEdit ? products.find(p => p._id === editProductId)?.product_name || '' : undefined}
            required
          />
          {/* <input type="text" placeholder="Category Id" className="form-input" ref={categoryRef} required /> */}
          <label>Category:</label>
          <select
            name="categoryId"
            required
            ref={categoryRef}
            defaultValue={isEdit ? products.find(p => p._id === editProductId)?.categoryId || '' : undefined}
            className="form-input "
          >
            {categorys.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name.charAt(0).toUpperCase()+cat.category_name.slice(1)}
              </option>
            ))}
          </select>

          <label>Brand:</label>
          <select name="brandId" required ref={brandRef} className="form-input " defaultValue={isEdit ? products.find(p => p._id === editProductId)?.brandId || '' : undefined}>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.brand_name.charAt(0).toUpperCase()+brand.brand_name.slice(1)}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Product Details"
            className="form-textarea capitalize "
            ref={detailsRef}
            defaultValue={isEdit ? products.find(p => p._id === editProductId)?.product_details || '' : undefined}
            required
          />
          {/* <input type="text" placeholder="Product Brand" className="form-input" ref={brandRef} required /> */}
          <input
            type="text"
            placeholder="Image URL"
            className="form-input "
            ref={imageRef}
            defaultValue={isEdit ? products.find(p => p._id === editProductId)?.product_image || '' : undefined}
            required
          />
          <input
            type="number"
            placeholder="Product Price"
            className="form-input"
            ref={priceRef}
            defaultValue={isEdit ? products.find(p => p._id === editProductId)?.product_price || '' : undefined}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {isEdit ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => setView("none")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {view === "table" && (
        <div className="table-container ">
          <h2 className="form-title">Product List 🧾</h2>
          {products.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <table className="product-table ">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Details</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  // Find category & brand for this product
                  const category = categorys.map((cat) =>
                    product.categoryId == cat._id ? cat.category_name : ""
                  );

                  const brand = brands.map((b) =>
                    product.brandId == b._id ? b.brand_name : ""
                  );

                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.product_image}
                          alt={product.product_name}
                          className="rounded-lg w-52 h-40 object-cover ml-2"
                        />
                      </td>
                      <td className="capitalize">{product.product_name}</td>
                      <td className="capitalize">
                        {category ? category : "Unknown"}
                      </td>
                      <td className="capitalize">
                        {brands ? brand : "Unknown"}
                      </td>
                      <td className="capitalize">{product.product_details}</td>
                      <td>₹ {product.product_price}</td>
                      <td>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 rounded-lg px-3 py-1 text-sm"
                          onClick={() => {
                            setView("form");
                            setIsEdit(true);
                            setEditProductId(product._id);
                          }}
                        >
                          Edit
                        </button>
                        &emsp;
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1 text-sm"
                          onClick={() => handleDelete(product.product_name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
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
        transition={Flip} // ✅ Max 3 toasts visible at a time
      />
    </div>
  );
};

export default ProductController;
