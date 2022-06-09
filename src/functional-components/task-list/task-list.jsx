import React from 'react';
import Task from '../task/task';
import './task-list.css';

const TaskList = ({ tasks, onTaskDestroy, onTaskStatusChange, onTaskUpdate, timerStart, timerStop }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            start={() => timerStart(task)}
            stop={() => timerStop(task)}
            timer={task.timer}
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
