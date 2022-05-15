import React from 'react';
import './new-task-form.css';

const NewTaskForm = ({ onNewTask }) => {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e) => {
        if (e.key !== 'Enter') return;
        const description = e.target.value.trim();
        if (description.length === 0) return;
        e.target.value = '';
        onNewTask(description);
      }}
    />
  );
};

export default NewTaskForm;
