//lưu trữ thông tin xác thực và đăng kí, đăng nhập của người dùng
import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import {io} from 'socket.io-client';

const BASE_URL="http://localhost:3001";

export const useAuthStore = create((set, get) => ({ //useAuthStore là một hàm chứa các biến kiểm tra trạng thái người dùng và kiểm tra thông tin xác thực
    authUser:null, //thông tin người dùng được xác thực, mặc định là chưa có
    isLoggingIn:false,
    isSigningUp:false, //chủ yếu để cho UI, khi trong trạng thái đang đăng kí/đăng nhập thì có thể bỏ vào một progress bar hoặc vòng quay 
                       //chờ để trải nghiệm người dùng tốt hơn         

    isCheckingAuth:true,
    socket:null, //thông tin socket được sử dụng để kết nối client với server, mặc định là null
 
    checkAuth: async () => { //hiện tại chưa cần dùng hàm này
        try {
            const res = await axiosInstance.get("/api/auth/check"); //gửi HTTP request GET thông tin xác thực người dùng
            set({authUser:res.data});
            get().connectSocket(); //nếu xác thực thành công thì gán thông tin được nhập cho người dùng được xác thực và kết nối tới server
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser:null});
        } finally { //thực thi bất kể code ban đầu được thực thi ở try hay là catch
            set({isCheckingAuth:false});
        }
    },

    SignUp: async (data) => { //xử lí yêu cầu dăng kí tài khoản mới
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data); //gửi request POST đến /auth/signup (backend/src/controllers/auth.controller.js) với thông tin người dùng nhập vào để xử lí yêu cầu đăng kí

            //thêm thông báo tạo tài khoản thành công
            set({authUser:res.data.user}); //vì sao lại là .user? backend khi xử lí xong sẽ gửi JWT và thông tin người dùng, hiện tại chỉ cần chọn user
            get().connectSocket(); //nếu thành công thì kết nối socket tới server và gắn thông tin (username, email, password) cho authUser
            //connectSocket() được định nghĩa ở cuối file này
        } catch (error) {
            //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
        } finally {
            set({isSigningUp:false});
        }
    },

    LogOut: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout"); //tương tự, gửi request POST tới /auth/logout (backend/src/controllers/auth.comtroller.js) để xử lí yêu cầu đăng xuất

            set({authUser:null});
            get().disconnectSocket(); //ngắt kết nối server và xóa thông tin authUser
            //disconnectSocket() được định nghĩa ở cuối file
        } catch (error) {
            //thông báo lỗi ở đây
        }
    },

    LogIn: async (data) => {
        console.log("Data: ",data);
        set({isLoggingIn:true});
        try {
            //tương tự, gửi request POST tới /auth/login (backend/src/controllers/auth.controller.js) để xử lí yêu cầu đăng nhập
            const res = await axiosInstance.post("/auth/login", data);

            //thêm thông báo tạo tài khoản thành công
            set({authUser:res.data.user});  //vì sao lại là .user? backend khi xử lí xong sẽ gửi JWT và thông tin người dùng, hiện tại chỉ cần chọn user
            get().connectSocket(); //nếu thành công thì kết nối socket tới server và gắn thông tin (email, password) cho authUser
            //connectSocket() được định nghĩa ở cuối file này

            console.log("Logged in successfully!"); //debug
            return res.data; //cần return data để xác thực xem đã thực sự đăng nhập chưa để có thể điều hướng tới /chat
        } catch (error) {
            //thêm thông báo lỗi (lỗi cụ thể nằm ở các cách thức kiểm tra mật khẩu ở backend/src/controllers/auth.controller.js)
            console.log("Error in LogIn:", error);
        } finally {
            set({isLoggingIn:false});
        }
    },

    connectSocket: () => {
        const {authUser} = get(); //truy xuất thông tin authUser
        if (!authUser || get().socket?.connected) return; //không tạo kết nối nếu như người dùng không được xác thực hoặc khi đã kết nối

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        }); //định nghĩa socket kết nối tới server với query là id của người dùng xác thực
        //VD: localhost:3000/chat?userId=123456789
        
        socket.connect(); //kết nối tới server (BASE_URL là đường dẫn tới server định nghĩa ở đầu file này)

        set({socket:socket}); //để đề phòng, đặt thông tin socket đã được kết nối để có thể truy xuất sau
    },

    disconnectSocket: () => {
        //nếu đang có thông tin socket đang được kết nối thì ngắt kết nối
        if (get().socket?.connected) get().socket.disconnect();
    },
}));