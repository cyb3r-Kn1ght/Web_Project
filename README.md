# Tổng quan trang web

## Thông tin thành viên
1. Lê Minh - 23520928
2. Nguyễn Gia Luân - 23520896
3. Lương Hoàng Long - 23520879
4. Dương Phước Nhật Nam -23520968
5. Võ Hoài Nam - 23520990
   
Link media video TikTok: https://vt.tiktok.com/ZSBATNMyN/
## Công nghệ

- **Front-end**: Sử dụng **React.js** kết hợp **Vite** nhằm tăng khả năng tối ưu trang web, thiết kế phù hợp với xu hướng hiện tại, thân thiện và dễ tiếp cận.
- **Back-end**: Sử dụng **Node.js**, **MongoDB** để theo dõi **account**, **data**, **gói đăng ký**... của quý khách hàng.
- Đây là **trang web AI chatbot về nghệ sĩ Việt Nam đầu tiên tại Việt Nam**, được phát triển bởi **nhóm 4** và sẽ được **mở mã nguồn (Open Source)**.

---

## Thông số

Để tối ưu hóa trải nghiệm người dùng, chúng tôi đã thiết kế **trang chủ** của trang web sao cho:
- **Đơn giản**
- **Dễ sử dụng**
- **Hiệu suất ổn định** trên cả **máy tính** và **thiết bị di động**

Chúng tôi ưu tiên các **chỉ số hiệu suất** và **hỗ trợ tiếp cận** trong suốt quá trình phát triển.

---

## Đánh giá hiệu suất

### Detail Rating for Mobile
![image](https://github.com/user-attachments/assets/6d579154-87e4-4aec-af0d-808d9cc118b0)


### Detail Rating for PC
![image](https://github.com/user-attachments/assets/165f5e7b-8ef9-4d7b-8a85-b4ccae5adb13)

---

## Một vài thao tác cơ bản trên web

![image](https://github.com/user-attachments/assets/e20c50bd-9a68-406a-a206-d0587c2a9a38)

---

# Model AI của trang Web

## Lựa chọn Model

Để có thể tạo ra một **chatbot AI người Việt**, chúng tôi đã sử dụng **model Ollama 3.2 3B-Instruction**. Sau đó tiến hành **fine-tune** dựa trên lượng **data được tìm kiếm thủ công và lọc chọn kỹ càng**, nhằm mang lại một model:
- Biết **nói Tiếng Việt**.
- Biết **sáng tạo theo phong cách của người nổi tiếng 100%**.
- Link drive model đã finetune: https://drive.google.com/file/d/1Qb67Rs_uKEAGNuu9gxsZ9F1_RBLO1F83/view?usp=sharing
- Link facebook liên hệ: https://www.facebook.com/le.minh.905864/
---

## Tại sao chúng tôi chọn Ollama 3.2 3B-Instruction?

- **Hỗ trợ đa ngôn ngữ**, đặc biệt là **Tiếng Việt**, giúp tiết kiệm công sức training thêm ngữ cảnh giao tiếp đặc trưng của người Việt.
- Với **3 tỷ tham số (3B)**, model đủ nhẹ để chạy trên cấu hình tầm trung, nhưng vẫn đủ mạnh để **không bị “ngơ”** trong các tương tác phức tạp.

### Hình ảnh benchmark giữa các model:
![image](https://github.com/user-attachments/assets/d1f0893c-2740-4cfe-9570-e4d006be4115)

---

## Quá trình Fine-tune Model

Việc fine-tune một model AI không đơn giản, nó đòi hỏi:

- **Kỹ thuật tối ưu phần cứng** để tiết kiệm chi phí và thời gian train.
- **Nguồn dữ liệu lớn, đúng chủ đề**, được thu thập chủ yếu từ:
  - Talkshow
  - Bài báo
  - Tạp chí
  - Video phỏng vấn
- **Lọc chọn những dữ liệu đặc trưng nhất** của từng nhân vật để làm nổi bật tính cách và phong cách giao tiếp.
- **Tạo dữ liệu ảo** dựa trên dữ liệu thật để làm sinh động thêm và mở rộng bối cảnh mô phỏng.
- **Định dạng dữ liệu theo persona**: giúp model nhận diện được từng nhân vật cụ thể, không chỉ qua nội dung mà còn là **cách nói chuyện, tính cách và câu chuyện cá nhân**.

### Hình ảnh thông số fine-tune AI
![image](https://github.com/user-attachments/assets/54f116be-95da-4cfa-8029-36cf7773d342)
