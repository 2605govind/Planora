import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Learner from './Learner.js';
import Course from './Course.js';

class Transaction extends Model {}

Transaction.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
  amount: DataTypes.FLOAT,
  payment_status: DataTypes.ENUM('pending', 'completed', 'failed'),
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transactions',
  timestamps: true
});

export default Transaction;
