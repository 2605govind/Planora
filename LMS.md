1. razorpay
2. upload videos



<!-- features -->
- three role: Admin, Instructor, Learner


<!-- Admin -->
1. show all transaction
2. show all instructors and there course
3. earning analysis


<!-- Instructor -->
- create course
- upload video
- show enroll learners
- show earnings
- reviews by learners
- update course

<!-- Lerner -->
- can buy course
- can request for refund if valid 
- update profile, photo, description etc.



<!-- for all -->
- email varification





online content
1. https://www.youtube.com/watch?v=kf6yyxMck8Y








1. Entities: [User, Admin, Instructor, Learner, Course, Section, Lecture, Video, PDF, Quiz, Assignment, Transaction, Refund, Review, Certificate, Wishlist, Notification, Category, PaymentOrder, Payout]

2. Attributes:

   * User: [user_id, name, email, password, role, profile_photo, bio, contact_info, social_links, learning_interests]
   * Admin: [admin_id, user_id]
   * Instructor: [instructor_id, user_id, earnings]
   * Learner: [learner_id, user_id, progress]
   * Course: [course_id, instructor_id, title, description, price, discount, language, difficulty, status, category_id]
   * Section: [section_id, course_id, title, order]
   * Lecture: [lecture_id, section_id, title, order, content_type]
   * Video: [video_id, lecture_id, title, url, thumbnail, duration]
   * PDF: [pdf_id, lecture_id, title, url]
   * Quiz: [quiz_id, lecture_id, title, questions]
   * Assignment: [assignment_id, lecture_id, title, description, due_date]
   * Transaction: [transaction_id, learner_id, course_id, amount, payment_status, date]
   * Refund: [refund_id, transaction_id, learner_id, status, request_date, approved_by]
   * Review: [review_id, course_id, learner_id, rating, comment, date]
   * Certificate: [certificate_id, course_id, learner_id, issue_date]
   * Wishlist: [wishlist_id, learner_id, course_id]
   * Notification: [notification_id, user_id, type, message, read_status, date]
   * Category: [category_id, name, description]
   * PaymentOrder: [order_id, learner_id, course_id, amount, status, payment_method, date]
   * Payout: [payout_id, instructor_id, amount, status, date]

3. Relationships:
   * User -> Admin : One-to-One
   * User -> Instructor : One-to-One
   * User -> Learner : One-to-One
   * Instructor -> Course : One-to-Many
   * Course -> Section : One-to-Many
   * Section -> Lecture : One-to-Many
   * Lecture -> Video : One-to-Many
   * Lecture -> PDF : One-to-Many
   * Lecture -> Quiz : One-to-Many
   * Lecture -> Assignment : One-to-Many
   * Learner -> Transaction : One-to-Many
   * Transaction -> Refund : One-to-One
   * Learner -> Review : One-to-Many
   * Course -> Review : One-to-Many
   * Learner -> Certificate : One-to-Many
   * Course -> Certificate : One-to-Many
   * Learner -> Wishlist : One-to-Many
   * Course -> Wishlist : One-to-Many
   * User -> Notification : One-to-Many
   * Course -> Category : Many-to-One
   * Learner -> PaymentOrder : One-to-Many
   * Instructor -> Payout : One-to-Many
   * PaymentOrder -> Refund : One-to-One




https://miro.com/app/live-embed/uXjVJvZiRA8=/?embedMode=view_only_without_ui&moveToViewport=-1043%2C-1062%2C7448%2C3451&embedId=307415318759