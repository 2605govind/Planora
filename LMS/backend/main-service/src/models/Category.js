import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Category extends Model {}

Category.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: true
});

export default Category;
