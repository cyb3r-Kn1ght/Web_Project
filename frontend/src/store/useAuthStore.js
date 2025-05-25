//lưu trữ thông tin xác thực và đăng kí, đăng nhập của người dùng 
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";
import { persist } from "zustand/middleware";
const BASE_URL = "https://celebritychatbot.up.railway.app" /*"http://localhost:3001"*/;
//persist để lưu trữ thông tin xác thực và đăng kí, đăng nhập của người dùng vào localStorage
export const useAuthStore = create(persist((set, get) => ({
//useAuthStore là một hàm chứa các biến kiểm tra trạng thái người dùng và kiểm tra thông tin xác thực
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,

  isCheckingAuth: true,
  socket: null,
  isSocketConnecting: false, // Flag để tránh gọi connectSocket nhiều lần

  // Hàm kiểm tra xác thực, nếu thành công sẽ gọi connectSocket
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); //gửi HTTP request GET thông tin xác thực người dùng
      set({ authUser: res.data });
      //set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
       //thực thi bất kể code ban đầu được thực thi ở try hay là catch
      set({ isCheckingAuth: false });
    }
  },

  // Hàm đăng ký, sau đó kết nối socket
  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
            //thêm thông báo tạo tài khoản thành công
      //set({ authUser: res.data.user });
      //get().connectSocket();
      return res.data;
    } catch (error) {
       //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
      console.log("Error in SignUp:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Hàm đăng xuất, đóng kết nối socket và xóa authUser
  LogOut: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in LogOut:", error);
    }
  },

  // Hàm đăng nhập, sau đó kết nối socket
  LogIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true, // Đảm bảo gửi cookie xác thực
      });
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

  // Hàm kết nối socket
  connectSocket: () => {
    const { authUser, socket: currentSocket, isSocketConnecting } = get();
    if (!authUser) return;
    
    // Nếu đang trong quá trình kết nối hoặc đã có socket đang kết nối thì không tạo mới
    if (isSocketConnecting || (currentSocket && currentSocket.connected)) return;
    
    // Nếu có socket tồn tại nhưng chưa kết nối, đóng nó lại
    if (currentSocket) {
      currentSocket.disconnect();
    }
    
    // Đánh dấu bắt đầu kết nối
    set({ isSocketConnecting: true });
    
    // Tạo socket mới
    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      withCredentials: true, // Đảm bảo gửi cookie xác thực
      transports: ["websocket"], // Sử dụng WebSocket
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });
    
    // Không cần gọi newSocket.connect() vì khi khởi tạo với io() nó tự động kết nối,
    // nhưng nếu muốn chắc chắn, có thể gọi newSocket.connect();
    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      // Lưu socket mới và reset flag kết nối
      set({ socket: newSocket, isSocketConnecting: false });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ socket: null });
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      set({ isSocketConnecting: false });
    });
  },

  // Hàm đóng kết nối socket
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  
}), {
  name: "auth-storage", // key lưu vào localStorage
  partialize: (state) => ({ authUser: state.authUser }), // chỉ lưu authUser, không lưu socket
}));