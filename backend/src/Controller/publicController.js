import sequelize from "../config/dg.js";
import Product from "../Model/Product.js";
import Purchase from "../Model/purchase.js";
import { MyError } from '../utils/customError.js'

// localhost:5001/api/products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [
                ['name', 'ASC']  
            ]
        });

        return res.status(201).json({
            success: true,
            message: "All Products",
            products
        });

    } catch (error) {
        console.log("error at getAllProducts controller " + error.message);
        return next(new MyError("Internal Server", 500));
    }
}


// localhost:5001/api/stats/products
export const getAllProductsWithDetails = async (req, res, next) => {
    try {
        // const product = sequelize.query("SELECT name price inventory_count FROM Products JOIN Purchases on ")

        // name 
        // price 
        // inventory 
        // totalPurchas
        //totalPurchases =  count all purches where product id==currentproductid
        // totalRevenue =  totalPurchases * product price

        // const [products] = await sequelize.query(`
        //   SELECT * FROM Products`);
        // const [products] = await sequelize.query(`
        //   SELECT 
        //     p.id,
        //     p.name,
        //     p.price,
        //     p.inventory_count AS inventory,
        //     COUNT(pr.id) AS totalPurchases,
        //     (COUNT(pr.id) * p.price) AS totalRevenue
        //   FROM 
        //     Products p
        //   LEFT JOIN 
        //     Purchases pr
        //   ON 
        //     p.id = pr.productId
        //   GROUP BY 
        //     p.id, p.name, p.price, p.inventory_count
        //   ORDER BY 
        //     p.id;
        // `);

        const products = await Product.findAll({
            attributes: [
                'id',
                'name',
                'price',
                ['inventory_count', 'inventory'],
                // COUNT(pr.id) AS totalPurchases
                [sequelize.fn('COUNT', sequelize.col('Purchases.id')), 'totalPurchases'],
                // COUNT(pr.id) * p.price AS totalRevenue
                [sequelize.literal('COUNT("Purchases"."id") * "Product"."price"'), 'totalRevenue'],
            ],
            include: [
                {
                    model: Purchase,
                    attributes: [], // don't fetch individual purchase fields
                },
            ],
            group: ['Product.id'],
            order: [['id', 'ASC']],
            raw: true,
        });

        return res.status(201).json({
            success: true,
            message: "All Products With Details",
            products
        });

    } catch (error) {
        console.log("error at getAllProductsWithDetails controller " + error.message);
        return next(new MyError("Internal Server", 500));
    }
}