import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dg.js'

export default class Refund extends Model {}

Refund.init(
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
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "transactions", key: "id" },
      onDelete: "CASCADE",
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Refund",
    tableName: "refunds",
    timestamps: true,
  }
);
