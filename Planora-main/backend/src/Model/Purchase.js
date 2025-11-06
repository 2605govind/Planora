import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';
import User from './User.js';
import Product from './Product.js';

class Purchase extends Model { }

Purchase.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
},
{
    sequelize,
    modelName: 'Purchase',
    tableName: 'Purchases',
    timestamps: true
});

export default Purchase;
