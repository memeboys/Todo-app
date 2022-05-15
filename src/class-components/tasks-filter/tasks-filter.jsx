import React, { Component } from 'react';
import './tasks-filter.css';

export const TaskFilterValue = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};

export default class TasksFilter extends Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className={this.props.filterValue === TaskFilterValue.ALL ? 'selected' : ''}
            onClick={() => this.props.onFilterChange(TaskFilterValue.ALL)}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.props.filterValue === TaskFilterValue.ACTIVE ? 'selected' : ''}
            onClick={() => this.props.onFilterChange(TaskFilterValue.ACTIVE)}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.props.filterValue === TaskFilterValue.COMPLETED ? 'selected' : ''}
            onClick={() => this.props.onFilterChange(TaskFilterValue.COMPLETED)}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
