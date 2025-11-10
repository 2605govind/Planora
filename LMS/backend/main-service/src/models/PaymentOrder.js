import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Learner from './Learner.js';
import Course from './Course.js';

class PaymentOrder extends Model {}

PaymentOrder.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
  amount: DataTypes.FLOAT,
  status: DataTypes.ENUM('pending', 'completed', 'failed'),
  payment_method: DataTypes.STRING,
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'PaymentOrder',
  tableName: 'payment_orders',
  timestamps: true
});

export default PaymentOrder;
