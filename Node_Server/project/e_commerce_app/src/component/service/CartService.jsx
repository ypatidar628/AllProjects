// src/services/CartService.js
import axios from "axios";

const API_URL = "http://localhost:8989/cart";

const CartService = {
  addToCart: (token, productId, quantity = 1) =>
    axios.post(
      `${API_URL}/add`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  getCart: (token) =>
    axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateCartItem: (token, productId, quantity) =>
    axios.put(
      `${API_URL}/update`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  removeCartItem: (token, productId) =>
    axios.delete(`${API_URL}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  clearCart: (token) =>
    axios.delete(`${API_URL}/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default CartService;
