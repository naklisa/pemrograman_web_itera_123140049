import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Teks tugas tidak boleh kosong!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    onAddTask(newTask);
    setTitle('');
    setError('');
  };

  return (
    <form className="task-form-wrapper" onSubmit={handleSubmit}>
      <div className="task-form">
        <input
          type="text"
          placeholder="Ketik tugas baru lalu tekan Enter..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          className={error ? 'input-error' : ''}
        />
        <button type="submit">Tambah</button>
      </div>
      {error && <p className="form-error-msg">{error}</p>}
    </form>
  );
}

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
