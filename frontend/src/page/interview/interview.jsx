import React from 'react';
import '../../style/interview/interview.css';

const sidebarItems = [
  { section: 'Quick Start', items: ['Your First API Call'] },
  { section: 'Models & Pricing', items: [] },
  { section: 'The Temperature Parameter', items: [] },
  { section: 'Token & Token Usage', items: [] },
  { section: 'Rate Limit', items: [] },
  { section: 'Error Codes', items: [] },
  { section: 'News', items: [
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
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">DeepSeek API Docs</div>
        {sidebarItems.map((group, idx) => (
          <div key={idx} className="menu-group">
            <div className="menu-header">{group.section}</div>
            {group.items.length > 0 && (
              <ul className="menu-list">
                {group.items.map((item, index) => (
                  <li key={index} className="menu-item">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>

      <main className="content">
        <nav className="breadcrumb">
          <span>Quick Start</span> &gt; <span className="active">Your First API Call</span>
        </nav>

        <h1>Your First API Call</h1>
        <p>
          The DeepSeek API uses an API format compatible with OpenAI. By modifying the configuration, you can use the OpenAI SDK
          or softwares compatible with the OpenAI API to access the DeepSeek API.
        </p>

        <table className="param-table">
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
          But note that the <code>v1</code> here has NO relationship with the model's version.
        </p>
        <p className="footnote">
          * The <code>deepseek-chat</code> model points to DeepSeek-V3-0324. You can invoke it by specifying <code>model='deepseek-chat'</code>.
        </p>
        <p className="footnote">
          * The <code>deepseek-reasoner</code> model points to DeepSeek-R1-0528. You can invoke it by specifying <code>model='deepseek-reasoner'</code>.
        </p>

        <h2>Invoke The Chat API</h2>
        <p>
          Once you have obtained an API key, you can access the DeepSeek API using the following example scripts.
          This is a non-stream example, you can set the <code>stream</code> parameter to <code>true</code> to get stream response.
        </p>
        {/* Example code snippet can go here */}
      </main>
    </div>
  );
};

export default Interview;
