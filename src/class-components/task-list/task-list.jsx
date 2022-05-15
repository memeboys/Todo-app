import React, { Component } from 'react';
import Task from '../task/task';
import './task-list.css';

export default class TaskList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              description={task.description}
              isCompleted={task.isCompleted}
              createDate={task.createDate}
              onDestroy={() => this.props.onTaskDestroy(task)}
              onStatusChange={() => this.props.onTaskStatusChange(task)}
              onUpdate={(description) => this.props.onTaskUpdate(task, description)}
            />
          );
        })}
      </ul>
    );
  }
}
