import React from 'react';
import './footer.css';

const Footer = ({ onClearCompleted, activeCount, children }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      {children}
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
