import axios from "axios";

const API_URL = "http://localhost:8989/order";

const OrderService = {
  
    placeOrder: ( userId , token ) =>      
    axios.post(
      `${API_URL}/add/${userId}`,
      {},
        { headers: { Authorization: `Bearer ${token}` } }
        ),

    getOrdersByUser: ( userId , token) =>
    axios.get(`${API_URL}/user/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
    ),

getOrderById: (id,orderId , token) =>
 axios.get(`${API_URL}/${id}`, {
  params: { orderId },   // → ?orderId=123
  headers: { Authorization: `Bearer ${token}` },
}),

cancelOrder: ( id , token) =>
 axios.delete(`${API_URL}/cancelOrder/${id}`,
 { headers: { Authorization: `Bearer ${token}` } }
 ),

 cancelOrderById: ( id , orderId , token) =>
 axios.delete(`${API_URL}/cancelOrderById/${id}?orderId=${orderId}`,
 { headers: { Authorization: `Bearer ${token}` } }
 ),

}

export default OrderService;