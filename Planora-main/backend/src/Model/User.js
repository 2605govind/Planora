import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class User extends Model {}

User.init({
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 100,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },

  plan: {
    type: DataTypes.STRING,
    defaultValue: "FREE",         
  },

  plan_start_date: {
    type: DataTypes.DATE,  
    defaultValue: DataTypes.NOW
  },
},
{
  sequelize,  
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

export default User;
