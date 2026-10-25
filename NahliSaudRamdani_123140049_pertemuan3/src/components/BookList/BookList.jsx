import React from 'react';
import PropTypes from 'prop-types';
import BookCard from '../BookCard/BookCard';
import './BookList.css';

function BookList({
  books,
  totalAllBooks,
  onEditBook,
  onDeleteBook,
  onStatusChange,
  onResetFilters,
  onOpenAddModal,
}) {
  if (books.length === 0) {
    const isFiltered = totalAllBooks > 0;
    return (
      <div className="empty-book-list" role="status">
        <div className="empty-icon-box">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="9" y1="9" x2="15" y2="9" />
          </svg>
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'Tidak ada buku yang sesuai kriteria' : 'Belum Ada Buku Tersimpan'}
        </h3>
        <p className="empty-desc">
          {isFiltered
            ? 'Coba ganti kata kunci pencarian atau ubah filter status & kategori.'
            : 'Mulai bangun perpustakaan pribadi Anda dengan menambahkan buku pertama!'}
        </p>
        <div className="empty-actions">
          {isFiltered ? (
            <button
              type="button"
              className="btn-empty-action"
              onClick={onResetFilters}
            >
              Reset Filter & Pencarian
            </button>
          ) : (
            <button
              type="button"
              className="btn-empty-action"
              onClick={onOpenAddModal}
            >
              + Tambah Buku Sekarang
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid" role="region" aria-label="Daftar Buku">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEditBook}
          onDelete={onDeleteBook}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
      category: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      notes: PropTypes.string,
    })
  ).isRequired,
  totalAllBooks: PropTypes.number.isRequired,
  onEditBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onOpenAddModal: PropTypes.func.isRequired,
};

export default BookList;
