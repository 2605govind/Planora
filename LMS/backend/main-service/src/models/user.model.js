import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Postgres UUID generation
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'instructor', 'learner'),
    allowNull: false,
    defaultValue: 'learner',
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'), // Modern ENUM support
    allowNull: true,
  },
  profile_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  social_links: {
    type: DataTypes.JSONB, // Postgres JSONB for better performance
    allowNull: true,
  },
  learning_interests: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isOnboarded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  // OTP fields
  otpHash: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  otpAttempts: {
    type: DataTypes.SMALLINT,
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

  // Password reset
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordAttempts: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
  }

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  underscored: true, 
  validate: {
    emailNotEmpty() {
      if (!this.email) throw new Error('Email cannot be empty');
    }
  }
});

export default User;
