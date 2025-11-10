import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Notification extends Model {}

Notification.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: 'id' } },
  type: DataTypes.STRING,
  message: DataTypes.TEXT,
  read_status: { type: DataTypes.BOOLEAN, defaultValue: false },
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'notifications',
  timestamps: true
});

export default Notification;
