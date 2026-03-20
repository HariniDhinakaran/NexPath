import React, { useState } from 'react';

function TestAPI() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testBackend = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>API Test</h2>
      <button onClick={testBackend}>Test Backend Connection</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
}

export default TestAPI;