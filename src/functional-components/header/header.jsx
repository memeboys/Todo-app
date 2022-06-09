import React from 'react';

const Header = ({ children }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      {children}
    </header>
  );
};

export default Header;
