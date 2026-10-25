import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css';

function TaskItem({ task, onDelete, onToggleComplete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <label htmlFor={`task-${task.id}`} className="task-title">
          {task.title}
        </label>
      </div>
      <div className="task-actions">
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Hapus tugas ${task.title}`}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;
