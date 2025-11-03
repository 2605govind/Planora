import Product from './Product.js';
import User from './User.js';
import Purchase from './purchase.js';
import Notification from './Notification.js';
import Plan from './Plan.js';
import Transaction from './Transaction.js';
import Refund from './Refund.js';


// ----------------------
// Product ↔ Purchase
// ----------------------
Product.hasMany(Purchase, { foreignKey: 'productId', onDelete: 'CASCADE' });
Purchase.belongsTo(Product, { foreignKey: 'productId' });



// ----------------------
// User ↔ Purchase
// ----------------------
User.hasMany(Purchase, { foreignKey: 'userId', onDelete: 'CASCADE' });
Purchase.belongsTo(User, { foreignKey: 'userId' });



// ----------------------
// Product ↔ Notification
// ----------------------
// Make sure Notification.productId is UUID to match Product.id
Product.hasMany(Notification, { foreignKey: 'productId', onDelete: 'CASCADE' });
Notification.belongsTo(Product, { foreignKey: 'productId' });



// Trigger notification when inventory drops below threshold
Product.afterUpdate(async (product, options) => {
  if (product.inventory_count <= 3 && product._previousDataValues.inventory_count > 3) {
    await Notification.create({
      productId: product.id, // UUID compatible
    });
  }
});



// ----------------------
// User ↔ Transaction
// ----------------------
User.hasMany(Transaction, { foreignKey: "userId", onDelete: "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "userId" });


// ----------------------
// Plan ↔ Transaction
// ----------------------
Plan.hasMany(Transaction, { foreignKey: "planId", onDelete: "CASCADE" });
Transaction.belongsTo(Plan, { foreignKey: "planId" });


User.hasMany(Refund, {foreignKey: "userId", onDelete: "CASCADE"});
Refund.belongsTo(User, {foreignKey: "userId" })

Plan.hasMany(Refund, {foreignKey: "planId", onDelete: "CASCADE"});
Refund.belongsTo(Plan, {foreignKey: "planId" })

Transaction.hasMany(Refund, {foreignKey: "transactionId", onDelete: "CASCADE"});
Refund.belongsTo(Transaction, {foreignKey: "transactionId" })




export { Product, Purchase, User, Notification, Transaction, Plan };
