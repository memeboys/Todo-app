import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import TasksFilter, { TaskFilterValue } from '../tasks-filter/tasks-filter';
import './todo-app.css';

function createTask({ description }) {
  return {
    id: nanoid(),
    description,
    isCompleted: false,
    createDate: new Date(),
  };
}

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTaskDestroy = this.handleTaskDestroy.bind(this);
    this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.state = {
      filterValue: TaskFilterValue.ALL,
      tasks: [createTask({ description: 'A' }), createTask({ description: 'B' }), createTask({ description: 'C' })],
    };
  }

  getActiveCount() {
    return this.state.tasks.reduce((result, task) => {
      return !task.isCompleted ? result + 1 : result;
    }, 0);
  }

  handleClearCompleted() {
    const newTasks = this.state.tasks.filter((task) => !task.isCompleted);
    this.setState((prevState) => {
      return { ...prevState, tasks: newTasks };
    });
  }

  handleFilterValueChange(filterValue) {
    this.setState((prevState) => {
      return { ...prevState, filterValue };
    });
  }

  getFilteredTasks() {
    switch (this.state.filterValue) {
      case TaskFilterValue.ACTIVE:
        return this.state.tasks.filter((task) => !task.isCompleted);
      case TaskFilterValue.COMPLETED:
        return this.state.tasks.filter((task) => task.isCompleted);
      default:
        return this.state.tasks;
    }
  }

  handleTaskDestroy(destroyedTask) {
    const newTasks = this.state.tasks.filter((task) => task.id !== destroyedTask.id);
    this.setState((prevState) => {
      return { ...prevState, tasks: newTasks };
    });
  }

  handleTaskStatusChange(updatedTask) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id !== updatedTask.id) return task;
      return {
        ...task,
        isCompleted: !task.isCompleted,
      };
    });
    this.setState((prevState) => {
      return { ...prevState, tasks: newTasks };
    });
  }

  handleNewTask(description) {
    const newTask = createTask({ description });
    const nextTasks = [...this.state.tasks, newTask];
    this.setState((prevState) => {
      return { ...prevState, tasks: nextTasks };
    });
  }

  handleTaskUpdate(updatedTask, updatedDescription) {
    const nextTasks = this.state.tasks.map((task) => {
      if (updatedTask.id !== task.id) return task;
      return {
        ...task,
        description: updatedDescription,
      };
    });
    this.setState((prevState) => {
      return { ...prevState, tasks: nextTasks };
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header>
          <NewTaskForm onNewTask={this.handleNewTask} />
        </Header>
        <section className="main">
          <TaskList
            tasks={this.getFilteredTasks()}
            onTaskDestroy={this.handleTaskDestroy}
            onTaskStatusChange={this.handleTaskStatusChange}
            onTaskUpdate={this.handleTaskUpdate}
          />
          <Footer onClearCompleted={this.handleClearCompleted} activeCount={this.getActiveCount()}>
            <TasksFilter filterValue={this.state.filterValue} onFilterChange={this.handleFilterValueChange} />
          </Footer>
        </section>
      </section>
    );
  }
}
