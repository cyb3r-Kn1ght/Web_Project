import jwt from "jsonwebtoken";

// xác thực JWT token
export const verifyToken = async (req, res) => {
    const token = req.header("authorization"); // lấy token từ header

    // nếu không có token thì trả về lỗi
    if (!token) {
        res.status(403).send("Token not provided");
        return;
    }
    
    // kiểm tra token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid token");
    }
};