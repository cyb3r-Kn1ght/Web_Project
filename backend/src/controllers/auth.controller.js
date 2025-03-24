//nơi này định nghĩa hàm để xử lí tín hiệu đăng nhập, đăng xuất, đăng kí
import User from '../models/users.model.js'
import bcrypt from 'bcryptjs' // mã hóa mật khẩu của người dùng vào trong csdl

// thao tác cơ bản
// yêu cầu người dùng nhập tiếp nếu không đủ các trường được nhập vào
// nếu mật khẩu thỏa mãn yêu cầu trong csdl thì tiến hành hash và lưu trong csdl
// lưu những thông tin còn lại vào trong csdl nếu như không bị trùng
export const signup = async (req, res) => {
    res.send("sign up here");
}

export const login = (req, res) => {
    res.send("log in here");
}

export const logout = (req, res) => {
    res.send("log out here");
}