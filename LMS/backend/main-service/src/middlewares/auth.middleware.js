import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'name', 'email', 'role', 'gender', 'profile_photo', 'bio', 'social_links', 'isVerified', 'isOnboarded']
        });


        req.user = user;

        next();

    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
    }
}

export default authMiddleware;

// 'instructor', 'learner'