import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks harus digunakan di dalam TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Mendukung Latihan Mandiri Submodul 3: Hapus semua tugas
  const clearAllTasks = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    clearAllTasks,
    stats: {
      total: tasks.length,
      completed: completedCount,
      remaining: remainingCount,
      completionRate: tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0,
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
