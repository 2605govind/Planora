import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dg.js'

export default class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "plans", key: "id" },
      onDelete: "CASCADE",
    },
    paypalOrderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OrderCapturesId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "USD",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);
