import { formatDistance } from 'date-fns';
import React, { useState } from 'react';
import './task.css';

const Task = ({ description, isCompleted, createDate, onDestroy, onStatusChange, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getClassName = () => {
    let className = '';
    if (isEditing) className += 'editing ';
    if (isCompleted) className += 'completed';
    return className;
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return;
    updateTask(event.target.value);
  };

  const updateTask = (newDescription) => {
    newDescription = newDescription.trim();
    if (newDescription !== '') {
      onUpdate(newDescription);
    }
    setIsEditing(false);
  };

  const getFormattedDate = () => {
    const dateNow = new Date();
    return formatDistance(createDate, dateNow, { addSuffix: true });
  };

  return (
    <li className={getClassName()}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} onChange={onStatusChange} />
        <label>
          <span className="description">{description}</span>
          <span className="created">Created {getFormattedDate()}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setIsEditing(true)}></button>
        <button className="icon icon-destroy" onClick={onDestroy}></button>
      </div>
      <input className="edit" type="text" defaultValue={description} onKeyDown={handleKeyDown} />
    </li>
  );
};

export default Task;
