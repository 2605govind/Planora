import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Learner extends Model {}

Learner.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: 'id' } },
  progress: DataTypes.JSON,
}, {
  sequelize,
  modelName: 'Learner',
  tableName: 'learners',
  timestamps: true
});

export default Learner;
