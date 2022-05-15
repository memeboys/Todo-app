import { formatDistance } from 'date-fns';
import React, { Component } from 'react';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    this.updateTask(event.target.value);
  }

  updateTask(newDescription) {
    newDescription = newDescription.trim();
    if (newDescription !== '') {
      this.props.onUpdate(newDescription);
    }
    this.setState(() => {
      return { isEditing: false };
    });
  }

  getClassName() {
    let className = '';
    if (this.state.isEditing) className += 'editing ';
    if (this.props.isCompleted) className += 'completed';
    return className;
  }

  getFormattedDate() {
    const dateNow = new Date();
    return formatDistance(this.props.createDate, dateNow, { addSuffix: true });
  }

  render() {
    return (
      <li className={this.getClassName()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.isCompleted}
            onChange={this.props.onStatusChange}
          />
          <label>
            <span className="description">{this.props.description}</span>
            <span className="created">Created {this.getFormattedDate()}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              return this.setState(() => ({ isEditing: true }));
            }}
          ></button>
          <button className="icon icon-destroy" onClick={this.props.onDestroy}></button>
        </div>
        <input className="edit" type="text" defaultValue={this.props.description} onKeyDown={this.handleKeyDown} />
      </li>
    );
  }
}

Task.defaultProps = {
  onDestroy: () => undefined,
  onStatusChange: () => undefined,
  onUpdate: () => undefined,
};
