import React from 'react';
import './tasks-filter.css';

export const TaskFilterValue = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};

const TasksFilter = ({ filterValue, onFilterChange }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={filterValue === TaskFilterValue.ALL ? 'selected' : ''}
          onClick={() => onFilterChange(TaskFilterValue.ALL)}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filterValue === TaskFilterValue.ACTIVE ? 'selected' : ''}
          onClick={() => onFilterChange(TaskFilterValue.ACTIVE)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filterValue === TaskFilterValue.COMPLETED ? 'selected' : ''}
          onClick={() => onFilterChange(TaskFilterValue.COMPLETED)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
