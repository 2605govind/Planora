import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Transaction from './Transaction.js';
import Learner from './Learner.js';

class Refund extends Model {}

Refund.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  transaction_id: { type: DataTypes.UUID, references: { model: Transaction, key: 'id' } },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  status: DataTypes.ENUM('requested', 'approved', 'rejected'),
  request_date: DataTypes.DATE,
  approved_by: DataTypes.UUID,
}, {
  sequelize,
  modelName: 'Refund',
  tableName: 'refunds',
  timestamps: true
});

export default Refund;
