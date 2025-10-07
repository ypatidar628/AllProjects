import Order from "../model/orderSchema.js";
import Cart from "../model/cartSchema.js";
import userSchemaModel from "../model/userModel.js";

// ✅ Create Order (from user's cart)
export const createOrder = async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await Cart.find({ userId });
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ status: false, message: "Cart is empty" });
        }

        const user = await userSchemaModel.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.product_price * item.quantity,
            0
        );

        const order = await Order.create({
            userId,
            userName: user.name,
            userEmail: user.email,
            items: cartItems.map((item) => ({
                productId: item.productId,
                product_image: item.product_image,
                product_name: item.product_name,
                quantity: item.quantity,
                product_price: item.product_price,
            })),
            totalAmount,
        });

        await Cart.deleteMany({ userId }); // clear cart after order

        return res.json({
            status: true,
            message: "Order placed successfully",
            order,
        });
    } catch (err) {
        console.error("Create Order Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Get All Orders for a User
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.json({ status: true, message: "No orders found", data: [] });
        }

        return res.json({ status: true, data: orders });
    } catch (err) {
        console.error("Get User Orders Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Get Single Order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params; // order id
        const { orderId } = req.query; // item id inside items[]

        const order = await Order.findById(id);
        if (!order) {
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }

        // if specific item requested
        if (orderId) {
            const item = order.items.find((i) => i._id.toString() === orderId);
            if (!item) {
                return res
                    .status(404)
                    .json({ status: false, message: "Item not found in order" });
            }
            return res.json({ status: true, data: item });
        }

        // else return whole order
        return res.json({ status: true, data: order });
    } catch (err) {
        console.error("Get Order By ID Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Cancel/Delete Entire Order
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }

        return res.json({ status: true, message: "Order deleted successfully" });
    } catch (err) {
        console.error("Delete Order Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Cancel specific item inside an Order
export const cancelOrderById = async (req, res) => {
    try {
        const { id } = req.params; // order id
        const { orderId } = req.query; // item id

        const order = await Order.findById(id);
        if (!order) {
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }

        // if only 1 item → delete whole order
        if (order.items.length === 1) {
            await Order.findByIdAndDelete(id);
            return res.json({
                status: true,
                message: "Order deleted because it had only 1 item",
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $pull: { items: { _id: orderId } } },
            { new: true }
        );

        return res.json({
            status: true,
            message: "Item removed from order",
            data: updatedOrder,
        });
    } catch (err) {
        console.error("Cancel Order Item Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Admin: Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.json({ status: true, data: orders });
    } catch (err) {
        console.error("Get All Orders Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // order id
        const { status } = req.body;

        const validStatuses = [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
        ];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ status: false, message: "Invalid status" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }

        return res.json({
            status: true,
            message: "Order status updated",
            data: updatedOrder,
        });
    } catch (err) {
        console.error("Update Order Exception:", err);
        return res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};
