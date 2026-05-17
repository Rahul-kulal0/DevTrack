import React, { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ totalUsers: 0, totalTasks: 0, recentLogs: [] });
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setStats(await res.json());
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setUsers(await res.json());
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setTasks(await res.json());
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setLogs(await res.json());
    } catch (err) { console.error(err); }
  }, [token]);

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'overview') fetchStats();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'tasks') fetchTasks();
    if (activeTab === 'logs') fetchLogs();
    setLoading(false);
  }, [activeTab, fetchStats, fetchUsers, fetchTasks, fetchLogs]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their tasks?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) { console.error(err); }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this inappropriate task?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchTasks();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="app-container fade-in">
      <nav className="navbar">
        <h1>DevTrack Admin</h1>
        <div className="flex items-center">
          <span style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Admin Portal</span>
          <button onClick={onLogout} className="btn btn-danger">Logout</button>
        </div>
      </nav>

      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('overview')} style={activeTab !== 'overview' ? { background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}>Overview</button>
        <button className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('users')} style={activeTab !== 'users' ? { background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}>Users</button>
        <button className={`btn ${activeTab === 'tasks' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('tasks')} style={activeTab !== 'tasks' ? { background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}>Tasks</button>
        <button className={`btn ${activeTab === 'logs' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('logs')} style={activeTab !== 'logs' ? { background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}>Activity Logs</button>
      </div>

      {loading ? <p className="text-center">Loading...</p> : (
        <div className="fade-in">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2">
              <div className="glass-panel text-center" style={{ padding: '3rem 1rem' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>Total Users</h3>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: '1rem 0' }}>{stats.totalUsers}</h1>
              </div>
              <div className="glass-panel text-center" style={{ padding: '3rem 1rem' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>Total Tasks</h3>
                <h1 style={{ fontSize: '3rem', color: 'var(--success-color)', margin: '1rem 0' }}>{stats.totalTasks}</h1>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Email</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Joined</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem' }}>{u.name}</td>
                      <td style={{ padding: '1rem' }}>{u.email}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', background: u.role === 'admin' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)' }}>{u.role}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>
                        {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Delete</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem' }}>Title</th>
                    <th style={{ padding: '1rem' }}>User</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => (
                    <tr key={t._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem' }}>{t.title}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t.user?.email || 'Unknown'}</td>
                      <td style={{ padding: '1rem' }}>{t.status}</td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => handleDeleteTask(t._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem' }}>Timestamp</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                    <th style={{ padding: '1rem' }}>User</th>
                    <th style={{ padding: '1rem' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(l => (
                    <tr key={l._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{new Date(l.createdAt).toLocaleString()}</td>
                      <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--primary-color)' }}>{l.action}</td>
                      <td style={{ padding: '1rem' }}>{l.performedBy?.email || 'System'}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{l.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
