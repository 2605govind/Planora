import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    inventory_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: true
    },
)


export default Product;