import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Lecture from './Lecture.js';

class Assignment extends Model {}

Assignment.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lecture_id: { type: DataTypes.UUID, references: { model: Lecture, key: 'id' } },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  due_date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Assignment',
  tableName: 'assignments',
  timestamps: true
});

export default Assignment;
