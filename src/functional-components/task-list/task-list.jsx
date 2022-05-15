import React from 'react';
import Task from '../task/task';
import './task-list.css';

const TaskList = ({ tasks, onTaskDestroy, onTaskStatusChange, onTaskUpdate }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            description={task.description}
            isCompleted={task.isCompleted}
            createDate={task.createDate}
            onDestroy={() => onTaskDestroy(task)}
            onStatusChange={() => onTaskStatusChange(task)}
            onUpdate={(description) => onTaskUpdate(task, description)}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;
