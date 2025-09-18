import { useEffect, useRef, useState } from "react";
import "../css/brandController.css";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";
import { Bounce, Flip, toast, ToastContainer, Zoom } from "react-toastify";

const BrandController = () => {
  const userData = useSelector((state) => state.userData.value);
  const [view, setView] = useState("none");
  const [brands, setbrands] = useState([]);

  console.log("token " + userData.token);

  console.log("brands", brands);

  useEffect(() => {
    fetchbrands();
  }, [""]);
  const nameRef = useRef();

  const resetForm = () => {
    nameRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newbrand = {
      brand_name: nameRef.current.value,
    };

    console.log("brand", newbrand);

    try {
      var resp = await WebService.postAPICallWithToken(
        WebAPI.saveBrand,
        newbrand,
        userData.token
      );
      console.log("brand saved successfully:", resp.data);
      if (resp.data.status === "success") {
        toast.success("brand added successfully!");
      }
    } catch (error) {
      console.error("Error saving brand:", error);
    }

    resetForm();
    setView("none");
    fetchbrands();
  };
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

  const handleDelete = async (brand_name) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this brand?"
    );
    if (!confirm) return;

    try {
      const resp = await WebService.deleteAPICall(
        WebAPI.deleteBrand,
        userData.token,
        { brand_name }
      );
      console.log("brand deleted successfully:", resp.data);

      if (resp.data.status === true) {
        toast.success("brand deleted successfully!");
        fetchbrands(); // refresh list
      } else {
        toast.error("Failed to delete brand!");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Something went wrong while deleting.");
    }
    fetchbrands(); // refresh list
  };

  //   const handleEdit = (index) => {
  //     const p = brands[index];
  //     nameRef.current.value = p.brand_name;
  //     brandRef.current.value = p.brand_brand_name;
  //     detailsRef.current.value = p.brand_details;
  //     brandRef.current.value = p.brand_brand;
  //     imageRef.current.value = p.brand_image;
  //     priceRef.current.value = p.brand_price;

  //     setbrands(brands.filter((_, i) => i !== index));
  //     setView("form");
  //   };

  return (
    <div className="container">
      <h1 className="heading bg-[#3B5D50]">Welcome To brand Controller</h1>

      <div className="button-row">
        <button className="btn-success" onClick={() => setView("form")}>
          Add brand
        </button>
        <button className="btn-danger" onClick={() => setView("table")}>
          Manage brands
        </button>
      </div>

      {view === "form" && (
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title">Add / Edit brand</h2>

          <input
            type="text"
            placeholder="brand Name"
            className="form-input"
            ref={nameRef}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Submit
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
          <h2 className="form-title capitalize">brand List</h2>
          {brands.length === 0 ? (
            <p>No brands added yet.</p>
          ) : (
            <table className="brand-table ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="capitalize">{brand.brand_name}</td>
                    <td>
                      <button
                        className="bg-gray-300 hover:bg-gray-4    00 rounded-lg p-2 w-18"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      &emsp;
                      <button
                        className="btn-danger p-2 rounded-lg"
                        onClick={() => handleDelete(brand.brand_name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
        transition={Flip}
      />
    </div>
  );
};

export default BrandController;
