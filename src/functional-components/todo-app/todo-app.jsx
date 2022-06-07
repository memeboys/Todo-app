import { nanoid } from 'nanoid';
import React, { useState } from 'react';
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

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => [
    createTask({ description: 'H' }),
    createTask({ description: 'B' }),
    createTask({ description: 'C' }),
  ]);

  const [filterValue, setFilterValueChange] = useState(TaskFilterValue.ALL);

  const getActiveCount = () => {
    return tasks.reduce((result, task) => {
      return !task.isCompleted ? result + 1 : result;
    }, 0);
  };

  const handleClearCompleted = () => {
    const withoutCompleted = tasks.filter((task) => !task.isCompleted);
    setTasks(withoutCompleted);
  };

  const handleFilterValueChange = (filterValue) => {
    setFilterValueChange(filterValue);
  };

  const getFilteredTasks = () => {
    switch (filterValue) {
      case TaskFilterValue.ACTIVE:
        return tasks.filter((task) => !task.isCompleted);
      case TaskFilterValue.COMPLETED:
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  const handleTaskDestroy = (destroyedTask) => {
    const newTasks = tasks.filter((task) => task !== destroyedTask);
    setTasks(newTasks);
  };

  const handleTaskStatusChange = (updatedTask) => {
    const newTasks = tasks.map((task) => {
      if (task !== updatedTask) return task;
      return {
        ...task,
        isCompleted: !task.isCompleted,
      };
    });
    setTasks(newTasks);
  };

  const handleNewTask = (description) => {
    const newTask = createTask({ description });
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const handleTaskUpdate = (updatedTask, updatedDescription) => {
    const newTasks = tasks.map((task) => {
      if (task !== updatedTask) return task;
      return {
        ...task,
        description: updatedDescription,
      };
    });
    setTasks(newTasks);
  };

  return (
    <section className="todoapp">
      <Header>
        <NewTaskForm onNewTask={handleNewTask} />
      </Header>
      <section className="main">
        <TaskList
          tasks={getFilteredTasks()}
          onTaskDestroy={handleTaskDestroy}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskUpdate={handleTaskUpdate}
        />
        <Footer onClearCompleted={handleClearCompleted} activeCount={getActiveCount()}>
          <TasksFilter filterValue={filterValue} onFilterChange={handleFilterValueChange} />
        </Footer>
      </section>
    </section>
  );
};

export default TodoApp;
