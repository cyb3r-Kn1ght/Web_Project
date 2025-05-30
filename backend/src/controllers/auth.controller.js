//nơi này định nghĩa hàm để xử lí tín hiệu đăng nhập, đăng xuất, đăng kí
import User from '../models/users.model.js'
import Token from '../models/token.model.js'
import bcrypt from 'bcryptjs' // mã hóa mật khẩu của người dùng vào trong csdl
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cryto, { randomBytes } from 'crypto'; // random token reset mật khẩu
import nodemailer from 'nodemailer'; // thư viện gửi gmail
import passport from 'passport';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// xử lý quên mật khẩu
const sendEmail = async (email, reset_link) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Click on the link để reset mật khẩu: ${reset_link}`
    });
}

export const signup = async (req, res) => {
    console.log("Received request at signup:", req.body);

    const { username, password, email } = req.body;

    // kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (!username || !password || !email) {
        res.status(400).send("Missing required information");
        return;
    }

    // kiểm tra xem người dùng có trùng username không
    if (await User.findOne({ username })) {
        res.status(400).send("Username already exists");
        return;
    }

    // kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)){
        res.status(400).send("Password must be at least 8 characters long, contain a letter, a number and a special character");
        return;
    }

    // kiểm tra email
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(email)){
        res.status(400).send("Invalid email address");
        return;
    }
    // kiểm tra xem email có trùng không
    if (await User.findOne({ email })) {
        res.status(400).send("Email already exists");
        return;
    }

    // mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);
    // tạo một user mới
    const newUser = new User({ username, password: hashedPassword, email });
    // lưu user mới vào trong csdl
    await newUser.save();
    res.send("User created successfully");
}

export const login = async (req, res) => {
    console.log("Received request at login:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("Missing required information");
        return;
    }
    
    // kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user){
        res.status(400).send("Email does not exist");
        return;
    }

    // kiểm tra xem mật khẩu có đúng không
    if (!bcrypt.compareSync(password, user.password)){
        res.status(400).send("Invalid password");
        return;
    }

    // tạo token
    const token = jwt.sign({ _id: user._id, email }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000
    });
    console.log("Login successful");
    const today = new Date().toDateString();
      if (!user.lastReset||user.lastReset.toDateString() !== today) {
            user.remainingMessages = 10;
            user.lastReset = new Date();
  await user.save();
  console.log("Reset remainingMessages to 10");

 }
    res.json({ token, user });
}

export const logout = (req, res) => {
    res.clearCookie('jwt');  // xóa cookie JWT
    res.json({ message: "Logout successful" });
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// xử lý quên mật khẩu
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email){
        res.status(400).send("Missing required information");
        return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user){
        res.status(400).send("Email does not exist");
        return;
    }

    console.log("User ID:", user._id);

    // tạo token
    const reset_token = crypto.randomBytes(32).toString("hex");

    // lưu token vào trong csdl
    const newToken = new Token({
        userId: user._id,
        token: reset_token,
        expiresAt: Date.now() + 15 * 60 * 1000
    });
    await newToken.save();

    const reset_link = `${process.env.FRONTEND_URL}/reset-password/${reset_token}`;
    await sendEmail(email, reset_link);
    res.json({ message: "Reset link has been sent to your email" });
}

// reset password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // kiểm tra nếu chưa có newPassword
    if (!newPassword) {
        return res.status(400).send("Missing new password");
    }

    // kiểm tra độ mạnh của mật khẩu mới
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).send("Password must be at least 8 characters long, contain a letter, a number and a special character");
    }

    try {
        // tìm token đã lưu trong csdl
        const tokenRecord = await Token.findOne({ token });
        if (!tokenRecord || tokenRecord.expiresAt < Date.now()) {
            if (tokenRecord) await tokenRecord.remove();
            return res.status(400).send("Invalid or expired token");
        }

        // tìm user dựa trên userId được lưu trong tokenRecord
        const user = await User.findById(tokenRecord.userId);
        if (!user) {
            return res.status(400).send("User not found");
        }

        // hash mật khẩu mới và cập nhật cho user
        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();

        // xóa token sau khi cập nhật mật khẩu thành công
        await tokenRecord.remove();

        res.send("Password has been reset successfully");
    } catch (err) {
        console.error("Error resetting password: ", err);
        res.status(500).send("Internal Server Error");
    }
}

// xử lý đăng nhập bằng Google OAuth thông qua Passport.js.
export const googleAuth = (req, res, next) => {
    // gọi hàm authenticate của passport với strategy là "google"
    passport.authenticate("google", { failureRedirect: "/login", session: false }, async (err, user) => {
        try {    
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
                    username: displayName,
                    email: emails[0].value,
                    GoogleId: id
                });
                await existingUser.save();
            }

            // res.json({
            //     user: {
            //         _id: existingUser._id,
            //         username: existingUser.username,
            //         email: existingUser.email,
            //         GoogleId: existingUser.GoogleId
            //     }
            // });

            // tạo token
            const token = jwt.sign({ _id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
            // Set cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            });
            res.redirect(`https://web-project-flame-five.vercel.app/chat`);
        } catch (error) {
            console.error("Error in Google authentication:", error.message);
            return res.redirect('https://web-project-flame-five.vercel.app/login?error=server_error');
        }
    })(req, res, next);
};

// xử lý đăng nhập bằng Facebook OAuth thông qua Passport.js.
export const facebookAuth = (req, res, next) => {
    passport.authenticate("facebook", { failureRedirect: "/login", session: false }, async (err, user) => {
        if (err || !user) {
            return res.status(400).send("Authentication failed");
        }

        // lấy thông tin cần thiết từ user
        const { id, displayName } = user;
                // kiểm tra xem user đã tồn tại trong csdl chưa
                let existingUserFB = await User.findOne({ FacebookId: id });
                if (!existingUserFB) {
                    existingUserFB = new User({
                        username: displayName,
                        FacebookId: id
                    });
                    await existingUserFB.save();
                }
        
                // tạo token
                const tokenFB = jwt.sign({ _id: existingUserFB._id }, JWT_SECRET, { expiresIn: "1h" });
                res.cookie('jwt', tokenFB, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 60 * 60 * 1000
                });
                res.redirect(`https://web-project-flame-five.vercel.app/chat`);
            })(req, res, next);
        };
        