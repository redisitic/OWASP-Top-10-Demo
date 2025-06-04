import React, { useState } from 'react';
import axios from 'axios';

function BrokenAccessControl() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [responseSecure, setResponseSecure] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setToken(res.data.token);
    } catch (err) {
      alert(err);
    }
  };

  const testSecure = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin-data-secure', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseSecure(res.data);
    } catch (err) {
      setResponseSecure(err.response?.data || 'Error');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Broken Access Control Demo</h2>

      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{' '}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{' '}
        <button onClick={login}>Login</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>JWT Token (Editable)</h4>
        <textarea
          rows="4"
          cols="80"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={testSecure}>Test /admin-data-secure (secure)</button>
      </div>

      <div style={{ display: 'flex', marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <h4>Endpoint Response:</h4>
          <pre>{responseSecure}</pre>
        </div>
      </div>
    </div>
  );
}

export default BrokenAccessControl;