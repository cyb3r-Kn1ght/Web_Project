import dotenv from 'dotenv'; //import vì lí do bảo mật (không để lộ connection string với server)
import mongoose from 'mongoose';

// để có thể đọc dữ liệu bên trong file .env
dotenv.config();

const db_connect_string = process.env.MONGO_URI // lấy connection string trong file .env

export const ConnectDB = async () => {
    try {
        const connectVar = await mongoose.connect(db_connect_string);

        // dòng để xác nhận kết nối thành công
        console.log(`MongoDB connected successfully: ${connectVar.connection.host}`);
    } catch(error) {
        console.log(`Error: ${error.message}`);
    }
};
