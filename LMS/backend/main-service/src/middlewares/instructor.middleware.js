
const instructorMiddleware = async (req, res, next) => {
    const user = req?.user;

    if (!user) {
        return res.status(401).json({ message: 'Auth failed: user not found' });
    }

    if (user.role !== "instructor") {
        return res.status(403).json({ message: "Access denied: only instructors are allowed" });
    }

    next();
}

export default instructorMiddleware;
