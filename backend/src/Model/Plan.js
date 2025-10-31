import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.UUID, /// 128-bit, Universally Unique Identifier
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    productId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    planId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    creditsPerMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    planType: {
      type: DataTypes.ENUM('FREE', 'BASIC', 'BUSINESS', 'ENTERPRISE'),
      defaultValue: 'FREE',
    },
  },
  {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
    timestamps: true,
  }
);

export default Plan;
