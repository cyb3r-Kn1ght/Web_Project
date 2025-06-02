import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/interview/interview.css';
import AI_img from "../../assets/interview/AI_fine_tune.png";
import SS_AI_img from "../../assets/interview/SS_model_Ollama.png";
import page_speed_rating_mobile from "../../assets/interview/page_speed_rating_mobile.jpg";
import page_speed_rating_pc from "../../assets/interview/page_speed_rating_pc.jpg";
import guide from "../../assets/interview/guide.png";
const sidebarItems = [
  {
    section: 'Giới thiệu chung',
    items: [
      'Tổng quan trang web',
      'Gói đăng ký',
      'Model sử dụng'
    ]
  }
];

const Interview = () => {
  const [openSections, setOpenSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState('Your First API Call');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSectionClick = (section) => {
    setOpenSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const renderContent = (key) => {
    switch (key) {
      case 'Tổng quan trang web':
        return (
          <>
            <h2>Tổng quan trang web</h2>
            <h3>Công nghệ:</h3>
            <p>
              Phía front-end: Sử dụng <b>Reactjs + Vite</b> tăng khả năng tối ưu trang web, thiết kế phù hợp với xu hướng hiện tại, thân thiện và dễ tiếp cận, Back-end sử dụng  <b>Nodejs, MongoDB </b>để theo dõi account, data, gói đăng kí... của quý khách hàng.Đây là trang web làm về  <strong>AI chat bot làm về nghệ sĩ Việt Nam đầu tiên tại Việt Nam</strong> do nhóm 4 phát triển và sẽ mở <strong>Open Source</strong>.
            </p>
            <h3>Thông số:</h3>
            <p>
              Để tối ưu hóa trải nghiệm người dùng, chúng tôi đã thiết kế trang chủ của trang web sao cho đơn giản, dễ dàng sử dụng với hiệu suất ổn định trên cả máy tính lẫn di động. Do đó, chỉ số <strong>hiệu suất</strong> và <strong>hỗ trợ tiếp cận</strong> được ưu tiên trong quá trình thiết kế trang chủ.

            </p>
            <div className='About_img'>
              <img src={page_speed_rating_mobile} alt="Detail Rating for mobile" className="img_off_page" />
              <p className='text_script_img'>Hình ảnh đánh giá trang chủ bằng PageSpeed Insights (mobile) </p>
            </div>
            <div className='About_img'>
              <img src={page_speed_rating_pc} alt="Detail Rating for pc" className="img_off_page" />
              <p className='text_script_img'>Hình ảnh đánh giá trang chủ bằng PageSpeed Insights (máy tính) </p>
            </div>
            <h3>Một vài thao tác cơ bản trên web:</h3>
            <div className='About_img'>
              <img src={guide} alt="Detail Rating for pc" className="img_off_page" />
              <p className='text_script_img'>Hướng dẫn một vài thao tác trên web</p>
            </div>

          </>
        );
      case 'Gói đăng ký':
        return (
          <>
            <h2>Đến với AI ChatBot bạn nhận được gì?</h2>
            <p>
              Dưới đây là những quyền lợi mà chúng tôi đưa ra khi bạn đăng kí dịch vụ bên tôi:
            </p>
            <table className="table_register_AI">
              <thead>
                <tr>
                  <th>Gói</th>
                  <th>Free</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>Giới hạn lượt hỏi</td>
                  <td>10 câu/ngày</td>
                  <td>Không giới hạn</td>
                </tr>


                <tr>
                  <td>Text-to-Speech</td>
                  <td>
                    ✗
                  </td>
                  <td>
                    ✓
                  </td>
                </tr>

                <tr>
                  <td>Trải nghiệm phiên bản mới</td>
                  <td>✗</td>
                  <td>✓</td>
                </tr>

                <tr>
                  <td>Có thể chọn việc cho model học phong cách nói chuyện của chính mình (Đang phát triển) </td>
                  <td>✗</td>
                  <td>✓</td>
                </tr>

                <tr>
                  <td>Giá</td>
                  <td>0 VND</td>
                  <td> <del>500.000 VND</del>  <b>250.000 VND</b> <b className="discount-value">(-50%)</b></td>
                </tr>

              </tbody>
            </table>
            <p>Hãy đăng kí ngay hôm nay để nhận được ưu đãi giá tốt! </p>
          </>
        );
      case 'Model sử dụng':
        return (
          <>
            <h2>Model AI của trang Web</h2>
            <p>
              Để có thể tạo ra 1 chat bot AI người Việt, chúng tôi đã sử dụng model <strong>Ollama 3.2 3B-Instruction</strong> sau đó fine-tune dựa trên lượng data đã được tìm kiếm thủ công, lọc data để mang lại một <strong>model biết nói Tiếng Việt</strong>, biết sáng tạo nói theo phong cách của người nổi tiếng 100%.
            </p>

            <h3 className='Title_of_page'>Tại sao chúng tôi lại sử dụng Ollama 3.2 3B - Instruction?</h3>
            <div className='About_img'>
              <img src={SS_AI_img} alt="Detail fine-tune AI" className="img_off_page" />
              <p className='text_script_img'>Hình ảnh benchmark giữa các model </p>
            </div>
            <p>Bởi vì <strong>OLlama 3.2 3B-Instruction </strong> có hỗ trợ đa ngôn ngữ đặc biệt là Tiếng Việt, đó là 1 điều kiện tuyệt vời để tránh việc phải train lại model thêm nhiều ngữ cảnh ứng xử của người Việt. Cùng với yếu tố cấu hình 3B tức 3 tỷ tham số sẽ phù hợp để chạy với cấu hình yếu và sẽ là vừa đủ để model không quá "ngơ".</p>

            <h3 className='Title_of_page'>Vậy chúng tôi đã fine-tune model như thế nào?</h3>
            <p>Để fine-tune được một model sẽ cần rất nhiều yếu tố và cần biết <b>tối ưu phần cứng </b> để chạy fine-tune model. Ngoài ra chúng ta cần phải có được nguồn data dồi dào của các nhân vật được nhắc đến, nguồn chủ yếu để có thể khai thác thông tin đến từ các talkshow, bài báo, tạp chí... của nhân vật đó, chúng ta sẽ lấy những data đặc trưng nhất của nhân vật và chọn lọc. Ngoài ra chúng ta sẽ sử dụng những data ảo được tạo từ những data thật để có thể làm sinh động hơn data để fine-tune. Ngoài ra để model có thể đúng như mong đợi là một "Chat Bot" thì ta cần phải format sang dạng có persona riêng của từng nhân vật. Xây dựng hình tượng nhân vật không chỉ qua data mà thêm vào đó sẽ kà các tính cách, những câu chuyện của nhân vật để model có thể nhận diện và hiểu rõ hơn về hình tượng nhân vật mà nó cần mô phỏng.</p>
            <div className='About_img'>
              <img src={AI_img} alt="Detail fine-tune AI" className="img_off_page" />
              <p className='text_script_img'>Hình ảnh về thông số mô tả quá trình fine-tune AI</p>
            </div>

            <p></p>

          </>
        );

      default:
        return <h2><b>Welcome to AI ChatBot</b></h2>;
    }
  };

  return (
    <div className="containerI">
      <header className="headerI">
        <button
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(prev => !prev)}
        >
          ☰
        </button>
        <div className="logoI">AI ChatBot</div>
        <Link to="/" className="home-btn">Home</Link>
      </header>

      <div className="bodyI">

        <aside className={`navI ${isSidebarOpen ? 'open' : ''}`}>

          {sidebarItems.map((group, idx) => (
            <div key={idx} className="menu-groupI">
              <div
                className={`menu-headerI ${openSections.includes(group.section) ? 'activeI' : ''}`}
                onClick={() => handleSectionClick(group.section)}
              >
                {group.section}
              </div>
              {group.items.length > 0 && openSections.includes(group.section) && (
                <ul className="menu-listI">
                  {group.items.map((item, index) => (
                    <li
                      key={index}
                      className={`menu-itemI ${selectedItem === item ? 'activeI' : ''}`}
                      onClick={() => {
                        if (window.innerWidth < 768) {  
                          setIsSidebarOpen(false);
                        }
                        setSelectedItem(item)
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        <main className="contentI">
          {renderContent(selectedItem)}
        </main>
      </div>
    </div>
  );
};

export default Interview;
