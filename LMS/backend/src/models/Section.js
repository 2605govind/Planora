import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Course from './Course.js';

class Section extends Model {}

Section.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
  title: DataTypes.STRING,
  order: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Section',
  tableName: 'sections',
  timestamps: true
});

export default Section;
