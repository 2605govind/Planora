import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Lecture from './Lecture.js';

class Video extends Model {}

Video.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lecture_id: { type: DataTypes.UUID, references: { model: Lecture, key: 'id' } },
  title: DataTypes.STRING,
  url: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  duration: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Video',
  tableName: 'videos',
  timestamps: true
});

export default Video;
