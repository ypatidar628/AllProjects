// src/services/CartService.js
import axios from "axios";

const API_URL = "http://localhost:8989/cart";

const CartService = {
  addToCart: (token, productId) =>
    axios.post(
      `${API_URL}/add`,
      productId,
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  getCart: (userId , token) => axios.get(`${API_URL}/get/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ),

  updateCartItem: ( id , token, quantity) =>
    axios.put(
      `${API_URL}/update/${id}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  removeCartItem: ( productId ,token) =>
    axios.delete(`${API_URL}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
clearCart: (userId, token) =>
  axios.delete(`${API_URL}/clear/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    // not { userId: { userId: 2 } }
  }),


};

export default CartService;
