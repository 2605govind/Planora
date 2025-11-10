import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

// Import all Models
import User from './user.model.js';
// import Admin from './Admin.js';
// import Instructor from './Instructor.js';
// import Learner from './Learner.js';
// import Category from './Category.js';
// import Course from './Course.js';
// import Section from './Section.js';
// import Lecture from './Lecture.js';
// import Video from './Video.js';
// import PDF from './PDF.js';
// import Quiz from './Quiz.js';
// import Assignment from './Assignment.js';
// import Transaction from './Transaction.js';
// import PaymentOrder from './PaymentOrder.js';
// import Refund from './Refund.js';
// import Review from './Review.js';
// import Certificate from './Certificate.js';
// import Wishlist from './Wishlist.js';
// import Notification from './Notification.js';
// import Payout from './Payout.js';

// Initialize Associations
let initialized = false;

// export function initAssociations() {
//   if (initialized) return;

//   // User ↔ Admin/Instructor/Learner (one-to-one)
//   User.hasOne(Admin, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'admin' });
//   Admin.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, as: 'user' });

//   User.hasOne(Instructor, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'instructor' });
//   Instructor.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, as: 'user' });

//   User.hasOne(Learner, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'learner' });
//   Learner.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, as: 'user' });

//   // Category ↔ Course
//   Category.hasMany(Course, { foreignKey: { name: 'category_id', allowNull: true, type: DataTypes.UUID }, onDelete: 'SET NULL', onUpdate: 'CASCADE', as: 'courses' });
//   Course.belongsTo(Category, { foreignKey: { name: 'category_id', allowNull: true, type: DataTypes.UUID }, as: 'category' });

//   // Instructor ↔ Course
//   Instructor.hasMany(Course, { foreignKey: { name: 'instructor_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'courses' });
//   Course.belongsTo(Instructor, { foreignKey: { name: 'instructor_id', allowNull: false, type: DataTypes.UUID }, as: 'instructor' });

//   // Course ↔ Section
//   Course.hasMany(Section, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'sections' });
//   Section.belongsTo(Course, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, as: 'course' });

//   // Section ↔ Lecture
//   Section.hasMany(Lecture, { foreignKey: { name: 'section_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'lectures' });
//   Lecture.belongsTo(Section, { foreignKey: { name: 'section_id', allowNull: false, type: DataTypes.UUID }, as: 'section' });

//   // Lecture ↔ (Video | PDF | Quiz | Assignment)
//   Lecture.hasMany(Video, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'videos' });
//   Video.belongsTo(Lecture, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, as: 'lecture' });

//   Lecture.hasMany(PDF, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'pdfs' });
//   PDF.belongsTo(Lecture, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, as: 'lecture' });

//   Lecture.hasMany(Quiz, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'quizzes' });
//   Quiz.belongsTo(Lecture, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, as: 'lecture' });

//   Lecture.hasMany(Assignment, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'assignments' });
//   Assignment.belongsTo(Lecture, { foreignKey: { name: 'lecture_id', allowNull: false, type: DataTypes.UUID }, as: 'lecture' });

//   // Learner ↔ Transaction
//   Learner.hasMany(Transaction, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'transactions' });
//   Transaction.belongsTo(Learner, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, as: 'learner' });

//   Course.hasMany(Transaction, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'transactions' });
//   Transaction.belongsTo(Course, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, as: 'course' });

//   // Transaction ↔ Refund
//   Transaction.hasOne(Refund, { foreignKey: { name: 'transaction_id', allowNull: true, type: DataTypes.UUID }, onDelete: 'SET NULL', onUpdate: 'CASCADE', as: 'refund' });
//   Refund.belongsTo(Transaction, { foreignKey: { name: 'transaction_id', allowNull: true, type: DataTypes.UUID }, as: 'transaction' });

//   PaymentOrder.hasOne(Refund, { foreignKey: { name: 'payment_order_id', allowNull: true, type: DataTypes.UUID }, onDelete: 'SET NULL', onUpdate: 'CASCADE', as: 'refund' });
//   Refund.belongsTo(PaymentOrder, { foreignKey: { name: 'payment_order_id', allowNull: true, type: DataTypes.UUID }, as: 'paymentOrder' });

//   // Learner ↔ Review & Course ↔ Review
//   Learner.hasMany(Review, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'reviews' });
//   Review.belongsTo(Learner, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, as: 'learner' });

//   Course.hasMany(Review, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'reviews' });
//   Review.belongsTo(Course, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, as: 'course' });

//   // Learner ↔ Certificate & Course ↔ Certificate
//   Learner.hasMany(Certificate, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'certificates' });
//   Certificate.belongsTo(Learner, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, as: 'learner' });

//   Course.hasMany(Certificate, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'certificates' });
//   Certificate.belongsTo(Course, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, as: 'course' });

//   // Learner ↔ Wishlist & Course ↔ Wishlist
//   Learner.hasMany(Wishlist, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'wishlists' });
//   Wishlist.belongsTo(Learner, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, as: 'learner' });

//   Course.hasMany(Wishlist, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'wishlists' });
//   Wishlist.belongsTo(Course, { foreignKey: { name: 'course_id', allowNull: false, type: DataTypes.UUID }, as: 'course' });

//   // User ↔ Notification
//   User.hasMany(Notification, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'notifications' });
//   Notification.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false, type: DataTypes.UUID }, as: 'user' });

//   // Learner ↔ PaymentOrder
//   Learner.hasMany(PaymentOrder, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'paymentOrders' });
//   PaymentOrder.belongsTo(Learner, { foreignKey: { name: 'learner_id', allowNull: false, type: DataTypes.UUID }, as: 'learner' });

//   // Instructor ↔ Payout
//   Instructor.hasMany(Payout, { foreignKey: { name: 'instructor_id', allowNull: false, type: DataTypes.UUID }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'payouts' });
//   Payout.belongsTo(Instructor, { foreignKey: { name: 'instructor_id', allowNull: false, type: DataTypes.UUID }, as: 'instructor' });

//   initialized = true;
// }



// Sync DB Function (like your old style)
async function syncDB() {
  try {
    await sequelize.authenticate(); // Test DB connection
    console.log('Database connected successfully');

    // initAssociations(); // initialize all relations

    await sequelize.sync({ alter: true }); // update schema without deleting data
    console.log('All models synced successfully');

    process.exit(0);
  } catch (err) {
    console.error('Sync Error:', err);
    process.exit(1);
  }
}

syncDB();
