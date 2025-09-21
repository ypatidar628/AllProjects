import { useEffect, useRef, useState } from "react";
import "../css/categoryController.css";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";
import { Flip, toast, ToastContainer } from "react-toastify";

const CategoryController = () => {
  const userData = useSelector((state) => state.userData.value);
  const [view, setView] = useState("none");
  const [categorys, setcategorys] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  console.log("token " + userData.token);

  console.log("categorys", categorys);

  useEffect(() => {
    fetchcategorys();
  }, [""]);
  const nameRef = useRef();

  const resetForm = () => {
    nameRef.current.value = "";
  };

  //Adding Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newcategory = {
      category_name: nameRef.current.value,
    };

    console.log("category", newcategory);

    try {
      var resp = await WebService.postAPICallWithToken(
        WebAPI.saveCategory,
        newcategory,
        userData.token
      );
      console.log("category saved successfully:", resp.data);
      if (resp.data.status === "success") {
        toast.success("category added successfully!");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }

    resetForm();
    setView("none");
    fetchcategorys();
  };

  // Update Category
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const resp = await WebService.putAPICallWithToken(
        `${WebAPI.updateCategory(editCategoryId)}`, // append id here
        userData.token,
        { newCategoryName: nameRef.current.value }
      );

      console.log("Category Updated:", resp.data);

      if (resp.data.status) {
        toast.success("Category updated successfully!");
        fetchcategorys();
        setView("none");
      } else {
        toast.error("Failed to update category!");
      }
    } catch (err) {
      console.error("Update Failed:", err);
      toast.error("Something went wrong while updating.");
    }
  };

  //View All Category
  const fetchcategorys = async () => {
    try {
      var resp = await WebService.getAPICall(
        WebAPI.viewAllCategory,
        userData.token
      );
      console.log("categorys fetched successfully:", resp.data.data.category);
      if (resp.data.status === true) {
        setcategorys(resp.data.data.category);
        toast.success("categorys fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching categorys:", error);
    }
  };

  const handleDelete = async (category_name) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    try {
      const resp = await WebService.deleteAPICall(
        WebAPI.deleteCategory,
        userData.token,
        { category_name }
      );
      console.log("category deleted successfully:", resp.data);

      if (resp.data.status === true) {
        toast.success("category deleted successfully!");
        fetchcategorys(); // refresh list
      } else {
        toast.error("Failed to delete category!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong while deleting.");
    }
    fetchcategorys(); // refresh list
  };

  return (
    <div className="container">
      <h1 className="heading">Welcome To category Controller</h1>

      <div className="button-row">
        <button
          className="btn-success"
          onClick={() => {
            setIsEdit(false);
            setView("form");
          }}
        >
          Add category
        </button>
        <button className="btn-danger" onClick={() => setView("table")}>
          Manage categorys
        </button>
      </div>
      {view === "form" && (
        <form
          onSubmit={isEdit ? handleEdit : handleSubmit}
          className="form-container"
        >
          <h2 className="form-title">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>

          <input
            type="text"
            placeholder="Category Name"
            className="form-input capitalize"
            ref={nameRef}
            defaultValue={isEdit ? categorys.find(c => c._id === editCategoryId)?.category_name || '' : undefined}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {!isEdit ? "Submit" : "Update"}
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
          <h2 className="form-title capitalize">category List</h2>
          {categorys.length === 0 ? (
            <p>No categorys added yet.</p>
          ) : (
            <table className="category-table ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="capitalize">{category.category_name}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setView("form");
                          setIsEdit(true);
                          setEditCategoryId(category._id);
                          // nameRef.current.value = category.category_name;
                        }}
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(category.category_name)}
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

export default CategoryController;
