import React, { useState } from 'react';
import './interview.css';

const sidebarItems = [
  { section: 'Quick Start', items: ['Your First API Call', 'Test Case'] },
  { section: 'Models & Pricing', items: [] },
  { section: 'The Temperature Parameter', items: [] },
  { section: 'Token & Token Usage', items: [] },
  { section: 'Rate Limit', items: [] },
  { section: 'Error Codes', items: [] },
  {
    section: 'News', 
    items: [
      'DeepSeek-R1-0528 Release 2025/05/28',
      'DeepSeek-V3-0324 Release 2025/03/25',
      'DeepSeek-R1 Release 2025/01/20',
      'DeepSeek APP 2025/01/15',
      'Introducing DeepSeek-V3 2024/12/26',
      'DeepSeek-V2.5-1210 Release 2024/12/10',
      'DeepSeek-R1-Lite Release 2024/11/20',
      'DeepSeek-V2.5 Release 2024/11/05'
    ]
  }
];

const Interview = () => {
  // State lưu các section đang mở (mở rộng)
  const [openSections, setOpenSections] = useState([]);
  // State lưu mục nhỏ đang chọn để render nội dung
  const [selectedItem, setSelectedItem] = useState('Your First API Call');

  // Toggle khi click vào section lớn
  const handleSectionClick = (section) => {
    setOpenSections(prev => {
      if (prev.includes(section)) {
        // Nếu đã mở thì đóng
        return prev.filter(s => s !== section);
      } else {
        // Mở thêm, không đóng các section khác
        return [...prev, section];
      }
    });
  };

  // Render nội dung khi click vào mục nhỏ
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
      {/* Header */}
      <header className="headerI">
        <button 
          className="toggle-btn" 
          onClick={() => {/* có thể thêm logic show/hide sidebar nếu muốn */}}
        >
          ☰
        </button>
        <div className="logoI">AI ChatBot</div>
      </header>

      <div className="bodyI">
        {/* Sidebar bên trái */}
        <aside className="navI">
          {sidebarItems.map((group, idx) => (
            <div key={idx} className="menu-groupI">
              {/* Mỗi section lớn chỉ toggle mở rộng item, không render nội dung */}
              <div
                className={`menu-headerI ${openSections.includes(group.section) ? 'activeI' : ''}`}
                onClick={() => handleSectionClick(group.section)}
              >
                {group.section}
              </div>

              {/* Hiển thị danh sách item nếu section đang mở */}
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

        {/* Phần content bên phải hiển thị theo selectedItem */}
        <main className="contentI">
          {renderContent(selectedItem)}
        </main>
      </div>
    </div>
  );
};

export default Interview;
