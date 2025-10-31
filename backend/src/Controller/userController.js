import sequelize from "../config/dg.js";
import Product from "../Model/Product.js";
import { MyError } from "../utils/customError.js";
import Purchase from "../Model/Purchase.js";
import User from "../Model/User.js";


export const purchaseProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.user.id;
    const t = await sequelize.transaction();

    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(req.user.id);

        if (!product) throw new MyError("Product not found", 404);

        if (product.inventory_count === 0) {
            throw new MyError("Out of stock", 400);
        }

        if (user.balance - product.price <= 0) {
            throw new MyError("Balance is low", 400);
        }

        const purchase = await Purchase.create({
            userId: userId,
            productId: productId
        }, { transaction: t });

        const updateduser = await user.update({
            username: user.name,
            role: user.role,
            balance: (user.balance - product.price),
            plan: user.plan,
            plan_start_date: user.plan_start_date
        }, { transaction: t });

        const updatedProduct = await product.update({
            name: product.name,
            price: product.price,
            inventory_count: (product.inventory_count - 1),
        }, { transaction: t });

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Purchase Successfully",
            product: updatedProduct,
            user: { ...req.user, balance: updateduser.balance }
        });

    } catch (error) {
        await t.rollback();
        console.log("Error at purchaseProduct controller:", error.message);
        next(error);
    }
}

export const getAllPurchase = async (req, res, next) => {
    try {
        // const result = await Purchase.findAll({where: {userId: req.user.id}})
        // const result = await Purchase.findAll({
        //     where: { userId: req.user.id },
        //     include: [{
        //         model: Product,
        //         attributes: ['id', 'name', 'price', 'inventory_count']
        //     }]
        // });

        const result = await sequelize.query(`
  SELECT 
    pr.id AS product_id,
    pr.name,
    pr.price,
    COUNT(p."productId") AS purchase_count
  FROM "Purchases" AS p
  INNER JOIN "Products" AS pr
    ON p."productId" = pr."id"
  WHERE p."userId" = :userId
  GROUP BY pr.id, pr.name, pr.price
  ORDER BY name ASC
`, {
            replacements: { userId: req.user.id },
            type: sequelize.QueryTypes.SELECT
        });


        if (!result) {
            throw new MyError("No purchase product find", 400);
        }


        return res.status(200).json({
            success: true,
            message: "Products purchase by user",
            products: result,
        });

    } catch (error) {
        console.log("Error at getAllPurchase controller:", error.message);
        next(error);
    }
}

