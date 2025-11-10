import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Admin extends Model {}

Admin.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: 'id' } },
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admins',
  timestamps: true
});

export default Admin;
