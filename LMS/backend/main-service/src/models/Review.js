import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Course from './Course.js';
import Learner from './Learner.js';

class Review extends Model {}

Review.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  rating: DataTypes.FLOAT,
  comment: DataTypes.TEXT,
  date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'reviews',
  timestamps: true
});

export default Review;
