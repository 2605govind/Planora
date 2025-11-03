import sequelize from '../config/dg.js';
import Notification from '../Model/Notification.js'
import Product from '../Model/Product.js'
import Plan from '../Model/Plan.js'
import Transaction from '../Model/Transaction.js';
import Purchase from '../Model/purchase.js';
import Refund from '../Model/Refund.js';



async function syncDB() {
  try {
    await sequelize.authenticate(); // DB connection test
    console.log('DB connected');

    await sequelize.sync({ alter: true });
    console.log('All models synced');
    process.exit(0);
  } catch (err) {
    console.error('Sync error', err);
    process.exit(1);
  }
}

syncDB();