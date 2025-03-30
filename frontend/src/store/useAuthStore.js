//lưu trữ thông tin xác thực và đăng kí, đăng nhập của người dùng
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5173";

export const useAuthStore = create((set, get) => ({
  //useAuthStore là một hàm chứa các biến kiểm tra trạng thái người dùng và kiểm tra thông tin xác thực
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,

  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); //gửi HTTP request GET thông tin xác thực người dùng
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      //thực thi bất kể code ban đầu được thực thi ở try hay là catch
      set({ isCheckingAuth: false });
    }
  },

  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      //thêm thông báo tạo tài khoản thành công
      set({ authUser: res.data.user });
      get().connectSocket();
      return res.data;
    } catch (error) {
      //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
      console.log("Error in SignUp:", error)
    } finally {
      set({ isSigningUp: false });
    }
  },

  LogOut: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      //thông báo lỗi ở đây
    }
  },

  LogIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      //thêm thông báo tạo tài khoản thành công
      set({ authUser: res.data.user });
      get().connectSocket();
      console.log("Logged in successfully!");
      return res.data;
    } catch (error) {
      //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
      console.log("Error in LogIn:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return; //không tạo kết nối nếu như người dùng không được xác thực hoặc khi đã kết nối

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect(); //kết nối tới server (BASE_URL)

    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
