import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

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
  gender: {
    type: DataTypes.STRING,
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

  // otp
  otpHash: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  otpAttempts: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  otpLockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  otpLastSentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },


  // forgot
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordAttempts: {
    type: DataTypes.SMALLINT.UNSIGNED,
    defaultValue: 0,
  }

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

export default User;
