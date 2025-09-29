import Order from "../model/orderSchema.js";
import Cart from "../model/cartSchema.js";
import userSchemaModel from "../model/userModel.js"; // important! use cart for items

// ✅ Create Order (from user's cart)
export const createOrder = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log(req.params);
        // Get all cart items for this user
        const cartItems = await Cart.find({userId});
        // console.log("Cart items : ",JSON.stringify(cartItems));
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({status: false, message: "Cart is empty"});
        }

        const respOfUser = await userSchemaModel.findOne({_id: userId})
        console.log("respOfUser ", respOfUser._id)
        let userName = respOfUser.name;
        let userEmail = respOfUser.email;
        // Calculate total amount
        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.product_price * item.quantity,
            0
        );


        // console.log(userName , " ; " , userEmail );
        // Create new order

        const order = await Order.create({
            userId,
            userName,
            userEmail,
            items: cartItems.map((item) => ({
                productId: item.productId,
                product_image: item.product_image,
                product_name: item.product_name,
                quantity: item.quantity,
                product_price: item.product_price,
            })),
            totalAmount,
        });

        // Clear cart after placing order
        await Cart.deleteMany({userId});

        return res.json({
            status: true,
            message: "Order placed successfully",
            order,
        });
    } catch (err) {
        console.error("Create Order Exception:", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
};


// ✅ Get All Orders for a User
export const getUserOrders = async (req, res) => {
    try {
        const {userId} = req.params;
        // console.log("user" , userId);

        const orders = await Order.find({userId});
        // console.log("Orders : ",JSON.stringify(orders));

        if (!orders.length) {
            return res.json({status: true, message: "No orders found", data: []});
        }

        res.json({status: true, data: orders});
    } catch (err) {
        console.error("Get User Orders Exception:", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
};

// ✅ Get Single Order by ID
export const getOrderById = async (req, res) => {
    try {
        const {id} = req.params; // Make sure route is /orders/:id
        const { orderId } = req.query;
        console.log("param id:", id);
        console.log(orderId);


        // Find order by ID
        const order = await Order.findById(id);

        if (!order) {
            return res
                .status(404)
                .json({status: false, message: "Order not found"});
        }
        let resp;
        // Debug log all items in that order
        if (order.items && order.items.length > 0) {
            order.items.forEach((item) => {
                console.log(item);
                if (item.id == orderId) {
                    resp = item;
                }
            });
            res.json({status: true, data: resp});
        }

    } catch (err) {
        console.error("Get Order By ID Exception:", err);
        res
            .status(500)
            .json({status: false, message: "Internal Server Error"});
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const {id} = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res
                .status(404)
                .json({status: false, message: "Order not found"});
        }

        res.json({status: true, message: "Order deleted successfully"});
    } catch (err) {
        console.error("Delete Order Exception:", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
}

export const cancelOrderById = async (req, res) => {
    try {
        const { id } = req.params; // order id
        const { orderId } = req.query; // item id inside order.items

        console.log("Order ID (param):", id);
        console.log("Item ID (query):", orderId);

        // Find the order first
        const order = await Order.findById(id);
        if (!order) {
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }

        // If only one item → delete the whole order
        if (order.items.length === 1) {
            await Order.findByIdAndDelete(id);
            return res.json({
                status: true,
                message: "Order deleted because it had only 1 item",
            });
        }

        // Otherwise, just remove the single item
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
        res
            .status(500)
            .json({ status: false, message: "Internal Server Error" });
    }
};

// ✅ Admin: Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({createdAt: -1});

        res.json({status: true, data: orders});
    } catch (err) {
        console.error("Get All Orders Exception:", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
};

// ✅ Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params; // order id
        const {status} = req.body;
        const validStatuses = ["Pending", "processing","Shipped", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({status: false, message: "Invalid status"});
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );

        if (!updatedOrder) {
            return res
                .status(404)
                .json({status: false, message: "Order not found"});
        }

        res.json({
            status: true,
            message: "Order status updated",
            data: updatedOrder,
        });
    } catch (err) {
        console.error("Update Order Exception:", err);
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
};

// ✅ Admin: Delete Order
// export const deleteOrder = async (req, res) => {
//     try {
//         const {id} = req.params;
//
//         const deletedOrder = await Order.findByIdAndDelete(id);
//         if (!deletedOrder) {
//             return res
//                 .status(404)
//                 .json({status: false, message: "Order not found"});
//         }
//
//         res.json({status: true, message: "Order deleted successfully"});
//     } catch (err) {
//         console.error("Delete Order Exception:", err);
//         res.status(500).json({status: false, message: "Internal Server Error"});
//     }
// };
