import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Instructor extends Model {}

Instructor.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: 'id' } },
  earnings: { type: DataTypes.FLOAT, defaultValue: 0 },
}, {
  sequelize,
  modelName: 'Instructor',
  tableName: 'instructors',
  timestamps: true
});

export default Instructor;
