import jwt from 'jsonwebtoken'
import User from '../Model/User.js';

const adminMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== "admin") {
            return res.status(401).json({ message: 'You are not admin' });
        }

        // get user
        const user = await User.findByPk(decoded.id);
        req.user = {
            id: user.id,
            username: user.username,
            role: user.role,
        }; 

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

export default adminMiddleware;