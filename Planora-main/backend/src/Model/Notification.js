import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';
import Product from './Product.js';

class Notification extends Model { }

Notification.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    modelName: 'Notification',
    tableName: 'Notifications',
    timestamps: true
});

export default Notification;
