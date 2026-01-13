import React from 'react';

const FilterBar = ({ filter, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('all')}
        >
          All Tasks
        </button>
        <button
          className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>
        <button
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <div className="sort-controls">
        <label htmlFor="sort-select" style={{ marginRight: '10px', fontWeight: '500' }}>
          Sort by:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="createdAt">Date Created</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
