import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Course from './Course.js';
import Learner from './Learner.js';

class Certificate extends Model {}

Certificate.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  course_id: { type: DataTypes.UUID, references: { model: Course, key: 'id' } },
  learner_id: { type: DataTypes.UUID, references: { model: Learner, key: 'id' } },
  issue_date: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Certificate',
  tableName: 'certificates',
  timestamps: true
});

export default Certificate;
