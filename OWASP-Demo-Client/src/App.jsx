import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrokenAccessControlDemo from './pages/BrokenAccessControl';
import Injection from './pages/Injection';
import SSRF from './pages/SSRF.jsx';

const App = () => {
  const vulnerabilities = [
    "Broken Access Control",
    "Injection",
    "Server-Side Request Forgery (SSRF)",
  ];

  return (
    <Router> 
      <div style={{ padding: '2rem' }}>
        <h1>OWASP Top 10 Demos</h1>
        <ul>
          {vulnerabilities.map((vuln, idx) => (
            <li key={idx}>
              <Link to={`/vulnerability/${idx + 1}`}>{idx + 1}. {vuln}</Link>
            </li>
          ))}
        </ul>

        <hr />

        <Routes>
          <Route path="/vulnerability/1" element={<BrokenAccessControlDemo />} />
          <Route path="/vulnerability/2" element={<Injection />} />
          <Route path="/vulnerability/3" element={<SSRF />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
