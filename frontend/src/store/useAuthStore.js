//lưu trữ thông tin xác thực và đăng kí, đăng nhập của người dùng
import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import {io} from 'socket.io-client';

const BASE_URL="http://localhost:3001";

export const useAuthStore = create((set, get) => ({ //useAuthStore là một hàm chứa các biến kiểm tra trạng thái người dùng và kiểm tra thông tin xác thực
    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,

    isCheckingAuth:true,
    socket:null,
 
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); //gửi HTTP request GET thông tin xác thực người dùng
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser:null});
        } finally { //thực thi bất kể code ban đầu được thực thi ở try hay là catch
            set({isCheckingAuth:false});
        }
    },

    SignUp: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            //thêm thông báo tạo tài khoản thành công
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
        } finally {
            set({isSigningUp:false});
        }
    },

    LogOut: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null});
            get().disconnectSocket();
        } catch (error) {
            //thông báo lỗi ở đây
        }
    },

    LogIn: async (data) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            // const res = await axiosInstance.post("/auth/login", {
            //     Email: "nam@gmail.com",
            //     Password: "IamNam1s!"
            // });
            //thêm thông báo tạo tài khoản thành công
            set({authUser:res.data});
            get().connectSocket();
            console.log("Logged in successfully!");
        } catch (error) {
            //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
            console.log("Error in LogIn:", error);
        } finally {
            set({isLoggingIn:false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return; //không tạo kết nối nếu như người dùng không được xác thực hoặc khi đã kết nối

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect(); //kết nối tới server (BASE_URL)

        set({socket:socket});
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));