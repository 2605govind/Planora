import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../config/db.js';

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('admin', 'instructor', 'learner'),
    defaultValue: 'learner'
  },
  profile_photo: DataTypes.STRING,
  bio: DataTypes.TEXT,
  social_links: DataTypes.JSON,
  learning_interests: DataTypes.JSON,

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  isOnboarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  otp: DataTypes.STRING,
  otpExpires: DataTypes.DATE,

  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpires: DataTypes.DATE,

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

export default User;
