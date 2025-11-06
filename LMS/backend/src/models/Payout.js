import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Instructor from './Instructor.js';

class Payout extends Model {}

Payout.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  instructor_id: { type: DataTypes.UUID, references: { model: Instructor, key: 'id' } },
  amount: DataTypes.FLOAT,
  status: DataTypes.ENUM('pending', 'completed', 'failed'),
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Payout',
  tableName: 'payouts',
  timestamps: true
});

export default Payout;
