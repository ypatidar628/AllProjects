import cartSchemaModel from "../model/cartSchema.js";

// Add to cart
import Cart from "../model/cartSchema.js";

export const addCart = async (req, res) => {
    try {
        const { userId, productId, product_name, category_name, product_price, product_image, quantity } = req.body;

        if (!userId || !productId || !product_name || !category_name || !product_price) {
            return res.status(400).json({ status: false, message: "All required fields must be provided" });
        }

        const cartItem = await Cart.create({
            userId,
            productId,
            product_name,
            category_name,
            product_price,
            product_image,
            quantity: quantity || 1
        });

        return res.json({ status: true, data: cartItem, message: "Cart item added successfully" });
    } catch (err) {
        console.error("Add Cart Exception:", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Get cart by user

export const getCart = async (req, res) => {
    const { userId } = req.body; // get userId from request body
    console.log("User ID:", userId);

    try {
        // Find all cart items for this user
        const cart = await cartSchemaModel.find({ userId });

        console.log("Cart Items:", cart);

        if (!cart || cart.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Cart is empty",
            });
        }

        return res.json({
            status: true,
            data: cart,
            message: "Cart fetched successfully",
        });
    } catch (err) {
        console.error("Get Cart Exception:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
// Update quantity
export const updateCart = async (req, res) => {
    try {
        const { id } = req.params; // cart item id
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                status: false,
                message: "Quantity must be greater than 0",
            });
        }

        const updatedItem = await cartSchemaModel.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found",
            });
        }

        return res.json({
            status: true,
            data: updatedItem,
            message: "Cart updated successfully",
        });
    } catch (err) {
        console.error("Update Cart Exception:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

// Remove item from cart
export const removeCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await cartSchemaModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found",
            });
        }

        return res.json({
            status: true,
            message: "Cart item removed successfully",
        });
    } catch (err) {
        console.error("Remove Cart Exception:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
// Remove a particular item from cart
export const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params; // cart item _id
        const userId = req.user.id; // from JWT token middleware

        const deletedItem = await cartSchemaModel.findOneAndDelete({
            _id: id,
            userId: userId, // make sure item belongs to logged-in user
        });

        if (!deletedItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found or does not belong to user",
            });
        }

        return res.json({
            status: true,
            message: "Cart item removed successfully",
            data: deletedItem,
        });
    } catch (err) {
        console.error("Remove Cart Item Exception:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

