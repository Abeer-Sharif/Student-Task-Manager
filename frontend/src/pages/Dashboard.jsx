import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, filter, sortBy, searchTerm]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTasks = () => {
    let filtered = [...tasks];

    // Apply filter
    switch (filter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredTasks(filtered);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    if (editingTask) {
      // Update from modal
      setTasks(tasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      ));
      setEditingTask(null);
      setShowModal(false);
    } else {
      // Quick update from task card
      setTasks(tasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      ));
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="app">
        <Header onLogout={onLogout} />
        <div className="container">
          <div className="loading">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header onLogout={onLogout} />

      <div className="container">
        {error && <div className="error-message">{error}</div>}

        <AddTaskForm onTaskAdded={handleTaskAdded} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TaskList
          tasks={filteredTasks}
          onTaskUpdated={handleEditTask}
          onTaskDeleted={handleTaskDeleted}
        />

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          task={editingTask}
          onTaskUpdated={handleTaskUpdated}
        />
      </div>
    </div>
  );
};

export default Dashboard;
