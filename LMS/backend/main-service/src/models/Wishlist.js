import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Learner from './Learner.js';
import Course from './Course.js';

class Wishlist extends Model {}

Wishlist.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
}, {
  sequelize,
  modelName: 'Wishlist',
  tableName: 'wishlists',
  timestamps: true
});

export default Wishlist;
