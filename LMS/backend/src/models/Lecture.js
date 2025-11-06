import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Section from './Section.js';

class Lecture extends Model {}

Lecture.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  section_id: { type: DataTypes.UUID, references: { model: Section, key: 'id' } },
  title: DataTypes.STRING,
  order: DataTypes.INTEGER,
  content_type: DataTypes.ENUM('video', 'pdf', 'quiz', 'assignment'),
}, {
  sequelize,
  modelName: 'Lecture',
  tableName: 'lectures',
  timestamps: true
});

export default Lecture;
