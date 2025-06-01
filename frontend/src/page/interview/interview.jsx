import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/interview/interview.css';

const sidebarItems = [
  {
    section: 'Giới thiệu chung', 
    items: [
      'Tổng quan trang web',
      'Gói đăng ký',
      'Model sử dụng',
      'Sơ lược về trang web'
    ]
  }
];

const Interview = () => {
  const [openSections, setOpenSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState('Your First API Call');

  const handleSectionClick = (section) => {
    setOpenSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const renderContent = (key) => {
    switch (key) {
      case 'Tổng quan trang web':
        return (
          <>
            <h2>Tổng quan trang web</h2>
            <p>
               Phía front-end: Sử dụng <b>Reactjs + Vite</b> tăng khả năng tối ưu trang web, thiết kế phù hợp với xu hướng hiện tại, thân thiện và dễ tiếp cận, Back-end sử dụng  <b>Nodejs, MongoDB </b>để theo dõi account, data, gói đăng kí... của quý khách hàng.Đây là trang web làm về  <strong>AI chat bot làm về nghệ sĩ Việt Nam đầu tiên tại Việt Nam</strong> do nhóm 4 phát triển và sẽ mở <strong>Open Source</strong>.
            </p>
          
          </>
        );
      case 'Gói đăng ký':
        return (
          <>
            <h2>Đến với AI ChatBot bạn nhận được gì?</h2>
            <p>
              Dưới đây là những quyền lợi mà chúng tôi đưa ra khi bạn đăng kí dịch vụ bên tôi: 
            </p>
             <table class="table_register_AI">
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
        <td>5 câu/ngày</td>
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
        <td> <del>500.000 VND</del>  <b>250.000 VND(-50%)</b></td>
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

          
          </>
        );

        case 'Sơ lược về trang web':
        return (
          <>
            <h2>Test Case Content Model</h2>
            <p>
              Đây là nội dung dùng để kiểm thử khi chọn mục "Test Case". Bạn có thể thay đổi bất kỳ thông tin gì ở đây.
            </p>
            <ul>
              <li>Item 1: Ví dụ nội dung 1</li>
              <li>Item 2: Ví dụ nội dung 2</li>
              <li>Item 3: Ví dụ nội dung 3</li>
            </ul>
          </>
        );
        
      default:
        return <h2><b>Welcome to AI ChatBot</b></h2>;
    }
  };

  return (
    <div className="containerI">
      <header className="headerI">
        <div className="logoI">AI ChatBot</div>
        <Link to="/" className="home-btn">Home</Link>
      </header>

      <div className="bodyI">
        <aside className="navI">
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
                      onClick={() => setSelectedItem(item)}
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
