import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Lecture from './Lecture.js';

class PDF extends Model {}

PDF.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lecture_id: { type: DataTypes.UUID, references: { model: Lecture, key: 'id' } },
  title: DataTypes.STRING,
  url: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'PDF',
  tableName: 'pdfs',
  timestamps: true
});

export default PDF;
