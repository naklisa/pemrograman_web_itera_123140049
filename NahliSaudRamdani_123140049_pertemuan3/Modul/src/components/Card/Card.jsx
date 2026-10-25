import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Komponen Card - Latihan Mandiri Submodul 2
 * Komponen wadah berbingkai reusable yang memanfaatkan props.children
 */
function Card({ children, title, className = '' }) {
  return (
    <div className={`custom-card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
