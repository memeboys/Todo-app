import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onKeyDown(e) {
    if (e.key !== 'Enter') return;
    const description = e.target.value.trim();
    if (description.length === 0) return;
    e.target.value = '';
    this.props.onNewTask(description);
  }
  render() {
    return <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={this.onKeyDown} />;
  }
}
