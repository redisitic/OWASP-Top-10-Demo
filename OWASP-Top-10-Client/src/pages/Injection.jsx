import React, { useState } from 'react';
import axios from 'axios';

function Injection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vulnerableResponse, setVulnerableResponse] = useState('');
  const [secureResponse, setSecureResponse] = useState('');

  const loginVulnerable = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login-insecure', {
        username,
        password,
      });
      setVulnerableResponse(`Success!`);
    } catch (err) {
      setVulnerableResponse(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const loginSecure = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login-secure', {
        username,
        password,
      });
      setSecureResponse(`Success!`);
    } catch (err) {
      setSecureResponse(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Injection Demo (MongoDB Injection)</h2>

      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={loginVulnerable} style={{ marginRight: 10 }}>
          Login (Vulnerable)
        </button>
        <button onClick={loginSecure}>Login (Secure)</button>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 40 }}>
        <div>
          <h4>Vulnerable Login Response:</h4>
          <pre>{vulnerableResponse}</pre>
        </div>
        <div>
          <h4>Secure Login Response:</h4>
          <pre>{secureResponse}</pre>
        </div>
      </div>
    </div>
  );
}

export default Injection;