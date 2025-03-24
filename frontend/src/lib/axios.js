import axios from 'axios'; // cài đặt thư viện HTP client

//mọi request HTTP sẽ được đính kèm các thông tin xác thực, được gửi đến đường dẫn http://localhost:3000/<relative URL>
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
}); 
