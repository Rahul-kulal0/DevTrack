import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        const user = JSON.parse(savedUser);
        setRole(user.role);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setRole(null);
  };

  const handleAuthSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
  };

  return (
    <>
      {token ? (
        role === 'admin' ? (
          <AdminDashboard token={token} onLogout={handleLogout} />
        ) : (
          <Dashboard token={token} onLogout={handleLogout} />
        )
      ) : (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}

export default App;
