import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

const STATUS_LABELS = {
  milik: 'Milik (Koleksi)',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

function BookCard({ book, onEdit, onDelete, onStatusChange }) {
  const { id, title, author, status, category, year, rating, notes } = book;

  // Render bintang rating
  const renderStars = (count) => {
    if (!count || count <= 0) return null;
    return (
      <div className="book-card-rating" title={`Rating: ${count} dari 5 bintang`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star-icon ${star <= count ? 'star-filled' : 'star-empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <article className={`book-card book-card-status-${status}`}>
      {/* Header Kartu: Status Badge & Kategori */}
      <div className="book-card-top">
        <span className={`status-badge status-${status}`}>
          {STATUS_LABELS[status] || status}
        </span>
        {category && <span className="category-tag">{category}</span>}
      </div>

      {/* Konten Utama */}
      <div className="book-card-main">
        <h3 className="book-card-title" title={title}>
          {title}
        </h3>
        <p className="book-card-author">
          <span className="author-label">Oleh:</span> {author}
        </p>

        <div className="book-card-meta">
          {year && <span className="meta-year">📅 {year}</span>}
          {renderStars(rating)}
        </div>

        {notes && (
          <p className="book-card-notes" title={notes}>
            &ldquo;{notes}&rdquo;
          </p>
        )}
      </div>

      {/* Footer Kartu: Quick Status Switcher & Tombol Aksi */}
      <div className="book-card-footer">
        <div className="status-selector">
          <label htmlFor={`quick-status-${id}`} className="sr-only">
            Ubah Status
          </label>
          <select
            id={`quick-status-${id}`}
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            className="quick-status-dropdown"
            title="Ubah status buku seketika"
          >
            <option value="milik">Milik</option>
            <option value="baca">Dibaca</option>
            <option value="beli">Beli</option>
          </select>
        </div>

        <div className="book-card-actions">
          <button
            type="button"
            className="card-btn btn-edit"
            onClick={() => onEdit(book)}
            title="Edit detail buku"
            aria-label={`Edit buku ${title}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="card-btn btn-delete"
            onClick={() => onDelete(id)}
            title="Hapus buku ini"
            aria-label={`Hapus buku ${title}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    category: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    notes: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookCard;
