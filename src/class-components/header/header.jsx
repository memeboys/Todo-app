import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>ToDos</h1>
        {this.props.children}
      </header>
    );
  }
}
