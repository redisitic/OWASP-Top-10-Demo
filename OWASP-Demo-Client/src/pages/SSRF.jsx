import React, { useState } from 'react';
import axios from 'axios';

export default function SSRF() {
  const [url, setUrl] = useState('');
  const [responseInsecure, setResponseInsecure] = useState('');
  const [responseSecure, setResponseSecure] = useState('');

  const fetchInsecure = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ssrf/fetch?url=${encodeURIComponent(url)}`);
      setResponseInsecure(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponseInsecure(err.response?.data || err.message);
    }
  };

  const fetchSecure = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ssrf/fetch-secure?url=${encodeURIComponent(url)}`);
      setResponseSecure(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponseSecure(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>SSRF Demo</h2>
      <input
        placeholder="Enter URL to fetch"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '80%' }}
      />
      <div style={{ marginTop: 20 }}>
        <button onClick={fetchInsecure}>Fetch Insecure</button>{' '}
        <button onClick={fetchSecure}>Fetch Secure</button>
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h4>Insecure Endpoint Response</h4>
          <pre style={{ background: '#eee', padding: 10, height: 300, overflow: 'auto' }}>{responseInsecure}</pre>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Secure Endpoint Response</h4>
          <pre style={{ background: '#eee', padding: 10, height: 300, overflow: 'auto' }}>{responseSecure}</pre>
        </div>
      </div>
    </div>
  );
}