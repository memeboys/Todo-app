import React from 'react';
import PropTypes from 'prop-types';
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

Footer.propTypes = {
  onclearCompleted: PropTypes.func,
};
export default Footer;
