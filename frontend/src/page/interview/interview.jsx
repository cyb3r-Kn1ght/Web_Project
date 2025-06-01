import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/interview/interview.css';

const sidebarItems = [
  {
    section: 'Giới thiệu chung', 
    items: [
      'Công nghệ trang web', 
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
      case 'Your First API Call':
        return (
          <>
            <h2>Your First API Call</h2>
            <p>
              The DeepSeek API uses an API format compatible with OpenAI. By modifying the configuration, you can use the OpenAI SDK
              or software compatible with the OpenAI API to access the DeepSeek API.
            </p>
            <table>
              <thead>
                <tr>
                  <th>PARAM</th>
                  <th>VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>base_url *</td>
                  <td><code>https://api.deepseek.com</code></td>
                </tr>
                <tr>
                  <td>api_key</td>
                  <td>apply for an <a href="#">API key</a></td>
                </tr>
              </tbody>
            </table>
            <p className="footnote">
              * To be compatible with OpenAI, you can also use <code>https://api.deepseek.com/v1</code> as the <code>base_url</code>.
            </p>
          </>
        );
      case 'Test Case':
        return (
          <>
            <h2>Test Case Content</h2>
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
        return <p>Content for <strong>{key}</strong> will be available soon.</p>;
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
