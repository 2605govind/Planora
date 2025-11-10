import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Lecture from './Lecture.js';

class Quiz extends Model {}

Quiz.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  lecture_id: { type: DataTypes.UUID, references: { model: Lecture, key: 'id' } },
  title: DataTypes.STRING,
  questions: DataTypes.JSON,
}, {
  sequelize,
  modelName: 'Quiz',
  tableName: 'quizzes',
  timestamps: true
});

export default Quiz;
