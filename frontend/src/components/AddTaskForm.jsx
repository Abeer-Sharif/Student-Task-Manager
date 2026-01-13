import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/tasks', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskAdded(response.data);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-header">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
