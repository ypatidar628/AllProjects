const BASE_URL = "http://localhost:8989";

export default {
  // ================= USER API =================
  saveUser: `${BASE_URL}/user/saveUser`,
  otpMatch: `${BASE_URL}/user/OTPMatch`,
  loginUser: `${BASE_URL}/user/loginUser`,
  viewAllUser: `${BASE_URL}/user/viewAllUser`,

  // ================= PRODUCT API =================
  saveProduct: `${BASE_URL}/product/saveProduct`,
  viewAllProduct: `${BASE_URL}/product/viewAllProduct`,
  deleteProduct: `${BASE_URL}/product/deleteProduct`,

  // ================= CATEGORY API =================
  saveCategory: `${BASE_URL}/category/saveCategory`,
  viewAllCategory: `${BASE_URL}/category/viewAllCategory`,
  deleteCategory: `${BASE_URL}/category/deleteCategory`,
  updateCategory: (id) => `${BASE_URL}/category/updateCategory/${id}`, // <-- function for id

  // ================= BRAND API =================
  saveBrand: `${BASE_URL}/brand/saveBrand`,
  viewAllBrand: `${BASE_URL}/brand/viewAllBrand`,
  deleteBrand: `${BASE_URL}/brand/deleteBrand`,
};
