import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
// xác thực JWT token
// export const verifyToken = async (req, res) => {
//     const token = req.header("authorization"); // lấy token từ header

//     // nếu không có token thì trả về lỗi
//     if (!token) {
//         res.status(403).send("Token not provided");
//         return;
//     }
    
//     // kiểm tra token
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(401).send("Invalid token");
//     }
// };

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
// xác thực JWT token
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    
        if (!token) {
          return res.status(401).json({ error: 'No token' });
        }
    
        // kiểm tra token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Lưu user info vào req
        req.user = decoded;
        //console.log(req.user);
        next();
      } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid token' });
      }
};