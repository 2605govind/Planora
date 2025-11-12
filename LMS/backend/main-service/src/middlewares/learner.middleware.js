
const learnerMiddleware = async (req, res, next) => {
    const user = req?.user;

    if (!user) {
        return res.status(401).json({ message: 'Auth failed: user not found' });
    }

    if (user.role !== "learner") {
        return res.status(403).json({ message: "Access denied: only learners are allowed" });
    }

    next();
}

export default learnerMiddleware;
