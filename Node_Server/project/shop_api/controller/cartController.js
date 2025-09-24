import cartSchemaModel from "../model/cartSchema.js";

// Add to cart
import Cart from "../model/cartSchema.js";

export const addCart = async (req, res) => {
    try {
        const { userId, userName , userEmail, productId, product_name, category_name, product_price, product_image, quantity } = req.body;
        console.log("req body : ", req.body);

        if (!userId || !productId || !product_name || !category_name || !product_price) {
            return res.status(400).json({ status: false, message: "All required fields must be provided" });
        }

        let cartItem = await Cart.findOne({userId , productId });
        if (cartItem){
            cartItem.quantity += quantity || 1;
            await cartItem.save();
            return res.json({
                status: true,
                data: cartItem,
                message: "Cart quantity updated successfully"
            });
        }
else {
            cartItem = await Cart.create({
                userId,
                userName,
                userEmail,
                productId,
                product_name,
                category_name,
                product_price,
                product_image,
                quantity: quantity || 1
            });

            console.log("req body : ", cartItem);
        return res.json({ status: true, data: cartItem, message: "Cart item added successfully" });
        }
    } catch (err) {
        console.error("Add Cart Exception:", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Get cart by user

// controller
export const getCart = async (req, res) => {
    const { userId } = req.params; // get from URL
    console.log("User ID:", userId);

    try {
        const cart = await cartSchemaModel.find({ userId });

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

//update cart item
export const updateCart = async (req, res) => {
    try {
        const { id } = req.params; // cart item id
        const { quantity } = req.body;
        // console.log("req body : ", id  ,":" , quantity  );

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
export const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log(productId)

        const deleted = await cartSchemaModel.findOneAndDelete(productId);

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
export const removeCart = async (req, res) => {
    try {
        const { userId } = req.params; // cart item _id
        // const  = req.body; // from JWT token middleware

        console.log("userId : " ,userId);

        const deletedItem = await cartSchemaModel.deleteMany({
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

