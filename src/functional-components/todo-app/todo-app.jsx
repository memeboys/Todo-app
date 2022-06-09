import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import TasksFilter, { TaskFilterValue } from '../tasks-filter/tasks-filter';
import './todo-app.css';

function createTask({ description, minutes = 240000, seconds = 20000 }) {
  return {
    id: nanoid(),
    description,
    isCompleted: false,
    createDate: new Date(),
    timerStatus: false,
    timer: minutes + seconds,
  };
}

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => [
    createTask({ description: 'Т' }),
    createTask({ description: 'У' }),
    createTask({ description: 'Д' }),
    createTask({ description: 'У' }),
  ]);
  const [filterValue, setFilterValueChange] = useState(TaskFilterValue.ALL);

  useEffect(() => {
    let prevTime = Date.now();
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = currentTime - prevTime;
      prevTime = currentTime;
      timerChange(delta);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  const handleNewTask = (description, min, sec) => {
    let minutes = min * 60 * 1000;
    let seconds = sec * 1000;
    const newTask = createTask({ description, minutes, seconds });
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

  const timerChange = (delta) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (!task.timerStatus) return task;
        return {
          ...task,
          timer: Math.max(0, task.timer - delta),
        };
      });
    });
  };

  const handleTimerStart = (taskChange) => {
    const newTasks = tasks.map((task) => {
      if (task !== taskChange) return task;
      return {
        ...task,
        timerStatus: true,
      };
    });
    setTasks(newTasks);
  };
  const handleTimerStop = (taskChange) => {
    const newTasks = tasks.map((task) => {
      if (task !== taskChange) return task;
      return {
        ...task,
        timerStatus: false,
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
          timerStart={handleTimerStart}
          timerStop={handleTimerStop}
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
