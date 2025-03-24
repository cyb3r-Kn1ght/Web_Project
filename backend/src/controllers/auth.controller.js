//nơi này định nghĩa hàm để xử lí tín hiệu đăng nhập, đăng xuất, đăng kí
import User from '../models/users.model.js'
import bcrypt from 'bcryptjs' // mã hóa mật khẩu của người dùng vào trong csdl
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
import jwt from "jsonwebtoken";
import passport from 'passport';

//để JWT_SECRET ở trong file .env
const JWT_SECRET = process.env.JWT_SECRET;
// thao tác cơ bản
// yêu cầu người dùng nhập tiếp nếu không đủ các trường được nhập vào
// nếu mật khẩu thỏa mãn yêu cầu trong csdl thì tiến hành hash và lưu trong csdl
// lưu những thông tin còn lại vào trong csdl nếu như không bị trùng

export const signup = async (req, res) => {
    const { Username, Password, Email } = req.query;

    // kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (!Username || !Password || !Email) {
        res.status(400).send("Missing required information");
        return;
    }

    // kiểm tra xem người dùng có trùng username không
    const user = await User.findOne({ Username });
    if (user) {
        res.status(400).send("Username already exists");
        return;
    }

    // kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (Password.length < 8){
        res.status(400).send("Password must be at least 8 characters long");
    }

    if (!passwordRegex.test(Password)){
        res.status(400).send("Password must contain at least one letter, one number and one special character");
        return;
    }

    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(Email)){
        res.status(400).send("Invalid email address");
        return;
    }
    // kiểm tra xem email có trùng không
    const emailExists = await User.findOne({ Email });
    if (emailExists) {
        res.status(400).send("Email already exists");
        return;
    }

    // mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(Password, 10);
    // tạo một user mới
    const newUser = new User({ Username, Password: hashedPassword, Email });
    // lưu user mới vào trong csdl
    await newUser.save();
    res.send("User created successfully");
}

export const login = async (req, res) => {
    // lấy thông tin từ người dùng
    const { Username, Password } = req.query;
    if (!Username || !Password) {
        res.status(400).send("Missing required information");
        return;
    }
    
    // kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ Username});
    if (!user){
        res.status(400).send("User does not exist");
        return;
    }

    // kiểm tra xem mật khẩu có đúng không
    const isValidPasswd = bcrypt.compareSync(Password, user.Password);
    if (!isValidPasswd){
        res.status(400).send("Invalid password");
        return;
    }

    // tạo token
    const token = jwt.sign({ Username }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Login successful");
    res.send(token);

}

export const logout = (req, res) => {
    res.json({ message: "Logout successful" });
}

// xử lý đăng nhập bằng Google OAuth thông qua Passport.js.
export const googleAuth = (req, res, next) => {
    // gọi hàm authenticate của passport với strategy là "google"
    passport.authenticate("google", { failureRedirect: "/login", session: false }, async (err, user) => {
        // nếu có lỗi hoặc không có user thì trả về thông báo lỗi
        if (err || !user) {
            return res.status(400).send("Authentication failed");
        }
        // lấy thông tin cần thiết từ user
        const { id, displayName, emails } = user;
        
        // kiểm tra xem user đã tồn tại trong csdl chưa
        let existingUser = await User.findOne({ GoogleId: id });
        if (!existingUser) {
            existingUser = new User({
                Username: displayName,
                Email: emails[0].value,
                GoogleId: id
            });
            await existingUser.save();
        }

        // tạo token
        const token = jwt.sign({ Username: existingUser.Username }, JWT_SECRET, { expiresIn: "1h" });
        res.send(token);
    })(req, res, next);
};

// xử lý đăng nhập bằng Facebook OAuth thông qua Passport.js.
export const facebookAuth = (req, res, next) => {
    // gọi hàm authenticate của passport với strategy là "facebook"
    passport.authenticate("facebook", { failureRedirect: "/login", session: false }, async (err, user) => {
        // nếu có lỗi hoặc không có user thì trả về thông báo lỗi
        if (err || !user) {
            return res.status(400).send("Authentication failed");
        }

        // lấy thông tin cần thiết từ user
        const { id, displayName } = user;

        // kiểm tra xem user đã tồn tại trong csdl chưa
        let existingUser = await User.findOne({ FacebookId: id });
        if (!existingUser) {
            existingUser = new User({
                Username: displayName,
                FacebookId: id
            });
            await existingUser.save();
        }

        // tạo token
        const token = jwt.sign({ Username: existingUser.Username }, JWT_SECRET, { expiresIn: "1h" });
        res.send(token);
    })(req, res, next);
};
