import axios from "axios"; // cài đặt thư viện HTP client

//mọi request HTTP sẽ được đính kèm các thông tin xác thực, được gửi đến đường dẫn http://localhost:3001/<relative URL>
export const axiosInstance = axios.create({
  baseURL: "https://celebritychatbot.up.railway.app/api" /*"http://localhost:3001/api"*/,
  withCredentials: true,
});
