import React, { useState } from 'react';
import './new-task-form.css';

function NewTaskForm({ onNewTask }) {
  const [textField, setText] = useState('');
  const [secondsField, setSeconds] = useState('');
  const [minutesField, setMinutes] = useState('');

  const onToggleText = (e) => {
    setText(e.target.value);
  };

  const onToggleMinutes = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    setMinutes(e.target.value);
  };

  const onToggleSeconds = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    setSeconds(e.target.value);
  };

  const onSubmit = () => {
    onNewTask(textField, minutesField, secondsField);
    setText('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit();
        }
      }}
      className="new-todo-form"
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onToggleText}
        value={textField}
      />
      <input
        className="new-todo-form__timer input-timer-minutes"
        placeholder="Min"
        onChange={onToggleMinutes}
        value={minutesField}
        maxLength={2}
        autoFocus
      />
      <input
        className="new-todo-form__timer input-timer-seconds"
        placeholder="Sec"
        onChange={onToggleSeconds}
        value={secondsField}
        maxLength={2}
        autoFocus
      />
    </form>
  );
}

export default NewTaskForm;
