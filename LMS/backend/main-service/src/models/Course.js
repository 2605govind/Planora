import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Instructor from './Instructor.js';
import Category from './Category.js';

class Course extends Model {}

Course.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  instructor_id: { type: DataTypes.UUID, references: { model: Instructor, key: 'id' } },
  category_id: { type: DataTypes.UUID, references: { model: Category, key: 'id' } },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  discount: DataTypes.FLOAT,
  language: DataTypes.STRING,
  difficulty: DataTypes.STRING,
  status: DataTypes.ENUM('draft', 'published', 'archived'),
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true
});

export default Course;
