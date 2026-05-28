import React, { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://16.16.182.156:5000';

const Dashboard = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch tasks');

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });

      if (!res.ok) throw new Error('Failed to create task');

      const created = await res.json();

      setTasks([created, ...tasks]);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const statuses = ['todo', 'in-progress', 'done'];

    const nextStatus =
      statuses[(statuses.indexOf(currentStatus || 'todo') + 1) % statuses.length];

    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        const updated = await res.json();

        setTasks(tasks.map(t => (t._id === id ? updated : t)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container fade-in">
      <nav className="navbar">
        <h1>DevTrack</h1>

        <div className="flex items-center">
          <span
            style={{
              marginRight: '1rem',
              color: 'var(--text-secondary)'
            }}
          >
            Welcome, {user.name}
          </span>

          <button onClick={onLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>

      <div className="glass-panel mb-4" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--primary-color)' }}>
          Add New Task
        </h3>

        <form
          onSubmit={handleCreateTask}
          className="flex"
          style={{ gap: '1rem', alignItems: 'flex-start' }}
        >
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Task Title"
              className="form-input mb-4"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Task Description (optional)"
              className="form-input"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value
                })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: '100%' }}
          >
            Create Task
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading tasks...</p>
      ) : error ? (
        <p
          className="text-center mt-4"
          style={{ color: 'var(--danger-color)' }}
        >
          {error}
        </p>
      ) : tasks.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '3rem 1rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>
            No tasks yet. Create one above!
          </h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div
              key={task._id}
              className="glass-panel fade-in"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  onClick={() =>
                    handleUpdateStatus(task._id, task.status)
                  }
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    backgroundColor:
                      task.status === 'done'
                        ? 'var(--success-color)'
                        : task.status === 'in-progress'
                          ? 'var(--warning-color)'
                          : 'var(--primary-color)'
                  }}
                >
                  {task.status === 'done'
                    ? 'Done'
                    : task.status === 'in-progress'
                      ? 'In Progress'
                      : 'To Do'}
                </span>

                <button
                  onClick={() => handleDelete(task._id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--danger-color)',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  &times;
                </button>
              </div>

              <h3 style={{ margin: '0 0 0.5rem 0' }}>
                {task.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  flex: 1,
                  margin: 0
                }}
              >
                {task.description}
              </p>

              <div
                style={{
                  marginTop: '1rem',
                  fontSize: '0.75rem',
                  color: 'var(--border-color)',
                  textAlign: 'right'
                }}
              >
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;