import React, { useState } from 'react';
import '../style/interview/Interview.css';

const sidebarItems = [
  { section: 'Quick Start', items: ['Your First API Call'] },
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
  // Khởi tạo state lưu mục đang chọn (mặc định là 'Quick Start')
  const [selected, setSelected] = useState('Quick Start');

  // Hàm để render nội dung bên phải dựa trên giá trị `selected`
  const renderContent = (key) => {
    switch (key) {
      case 'Quick Start':
        return (
          <>
            <h2>Your First API Call</h2>
            <p>
              The DeepSeek API uses an API format compatible with OpenAI. 
              By modifying the configuration, you can use the OpenAI SDK
              compatible with the OpenAI API to access the DeepSeek API.
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
              * To be compatible with OpenAI, you can also use <code>https://api.deepseek.com/v1</code> 
              as the <code>base_url</code>.
            </p>
          </>
        );

      default:
        // Nếu người dùng click vào những mục chưa có nội dung, hiển thị placeholder
        return (
          <p>
            Content for <strong>{key}</strong> will be available soon.
          </p>
        );
    }
  };

  return (
    <div className="containerI">
      {/* Header trên cùng */}
      <header className="headerI">
        <button 
          className="toggle-btn" 
          onClick={() => {
            /* Có thể gắn logic show/hide sidebar nếu cần */
          }}
        >
          ☰
        </button>
        <div className="logoI">DeepSeek API Docs</div>
      </header>

      {/* Phần thân chia làm 2 cột */}
      <div className="bodyI">
        {/* Cột trái: thanh điều hướng */}
        <aside className="navI">
          {sidebarItems.map((group, idx) => (
            <div key={idx} className="menu-groupI">
              {/* Tiêu đề section, click để chọn */}
              <div
                className={`menu-headerI ${selected === group.section ? 'activeI' : ''}`}
                onClick={() => setSelected(group.section)}
              >
                {group.section}
              </div>

              {/* Nếu section có items và đang được chọn, hiển thị danh sách items */}
              {group.items.length > 0 && selected === group.section && (
                <ul className="menu-listI">
                  {group.items.map((item, index) => (
                    <li
                      key={index}
                      className={`menu-itemI ${selected === item ? 'activeI' : ''}`}
                      onClick={() => setSelected(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        {/* Cột phải: nội dung tương ứng */}
        <main className="contentI">
          {renderContent(selected)}
        </main>
      </div>
    </div>
  );
};

export default Interview;
