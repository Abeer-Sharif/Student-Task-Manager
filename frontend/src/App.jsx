import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTasks();
    }
  }, [token]);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, filter, sortBy, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTasks = () => {
    let filtered = tasks.filter(task => {
      if (filter === 'pending') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });

    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredTasks(filtered);
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      setTasks([...tasks, res.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    await handleUpdateTask(id, { ...task, completed: !task.completed });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError('Signup failed');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setTasks([]);
  };

  if (!token) {
    return (
      <div className="auth-container">
        <h1>Student Task Manager</h1>
        {error && <div className="error">{error}</div>}
        <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header onLogout={handleLogout} user={user} />
      <main className="main-content">
        <AddTaskForm onAddTask={handleAddTask} />
        <div className="controls">
          <FilterBar filter={filter} onFilterChange={setFilter} sortBy={sortBy} onSortChange={setSortBy} />
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        {error && <div className="error">{error}</div>}
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </main>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddTaskForm
            onAddTask={(taskData) => handleUpdateTask(editingTask._id, taskData)}
            editingTask={editingTask}
          />
        </Modal>
      )}
    </div>
  );
}

function AuthForm({ onLogin, onSignup }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
      </button>
    </form>
  );
}

export default App;
