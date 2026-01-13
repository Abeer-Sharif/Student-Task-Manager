import React, { useState } from 'react';
import axios from 'axios';

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/tasks/${task._id}`, {
        ...task,
        completed: !task.completed
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskUpdated(response.data);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskDeleted(task._id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className={`task-card fade-in ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
        <div className="task-actions">
          <button
            className="btn btn-outline"
            onClick={() => onTaskUpdated(task)}
            disabled={loading}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="task-meta">
        <div>
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          {task.dueDate && (
            <span className="due-date">Due: {formatDate(task.dueDate)}</span>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={loading}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
