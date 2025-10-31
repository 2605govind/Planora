import Product from "../Model/Product.js";
import { MyError } from "../utils/customError.js";


//post= /api/admin/products  { name, price, inventory_count }
export const createProduct = async (req, res, next) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return next(new MyError("Field are required", 400));
        }

        const product = await Product.create({
            name: name,
            price: price,
            inventory_count: req.body?.inventory_count || 15
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.log("error at createProduct controller " + error.message);
        return next(new MyError("Internal Server", 500));
    }

}



//put= /api/admin/products/:productId  { name, price, inventory_count }
export const updateProduct = async (req, res, next) => {
    try {
        const { name, price, inventory_count } = req.body;

        if (!name && !price && !inventory_count) {
            return next(new MyError("At least one field is required", 400));
        }

        const product = await Product.findByPk(req.params.productId);

        if (!product) return next(new MyError("Product not found", 400));

        await product.update({
            name: name || product.name,
            price: price || product.price,
            inventory_count: inventory_count || product.inventory_count
        });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.log("Error at updateProduct controller:", error.message);
        return next(new MyError("Internal Server Error", 500));
    }
};


export const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return next(new MyError("ProductId is required", 400));
        }

        const product = await Product.findByPk(req.params.productId);

        if (!product) return next(new MyError("Product not found", 400));

        await product.destroy();

        return res.status(200).json({
            success: true,
            message: "Product destroy successfully",
        });

    } catch (error) {
        console.log("Error at deleteProduct controller:", error.message);
        return next(new MyError("Internal Server Error", 500));
    }
};



