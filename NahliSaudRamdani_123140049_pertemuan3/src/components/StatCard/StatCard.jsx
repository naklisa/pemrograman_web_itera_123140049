import React from 'react';
import PropTypes from 'prop-types';
import './StatCard.css';

function StatCard({ title, value, icon, variant = 'primary', description, onClick }) {
  return (
    <div
      className={`stat-card stat-card-${variant} ${onClick ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && <span className="stat-card-icon">{icon}</span>}
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {description && <p className="stat-card-desc">{description}</p>}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'purple', 'danger']),
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default StatCard;
