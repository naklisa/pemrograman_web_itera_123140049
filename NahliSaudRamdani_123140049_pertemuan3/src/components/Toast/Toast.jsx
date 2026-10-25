import React from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const iconMap = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
  };

  return (
    <div className={`toast-notification toast-${type}`} role="alert">
      <span className="toast-icon">{iconMap[type] || 'ℹ'}</span>
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
