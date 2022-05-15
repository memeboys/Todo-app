import React, { Component } from 'react';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.activeCount} items left</span>
        {this.props.children}
        <button className="clear-completed" onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
