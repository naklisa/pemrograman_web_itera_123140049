import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  stats,
  categories,
}) {
  return (
    <div className="book-filter-root">
      {/* Baris Atas: Input Pencarian & Pengurutan */}
      <div className="filter-top-bar">
        <div className="search-box">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Cari buku berdasarkan judul atau nama penulis..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Pencarian buku berdasarkan judul atau penulis"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Hapus kata kunci pencarian"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown Kategori & Sorting */}
        <div className="filter-dropdowns">
          <div className="select-wrapper">
            <select
              id="category-filter"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter berdasarkan kategori"
            >
              <option value="semua">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Urutkan daftar buku"
            >
              <option value="newest">Terbaru Ditambahkan</option>
              <option value="title-asc">Judul (A - Z)</option>
              <option value="title-desc">Judul (Z - A)</option>
              <option value="year-desc">Tahun (Terbaru)</option>
              <option value="year-asc">Tahun (Terlama)</option>
              <option value="rating-desc">Rating Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Tab Status Filter */}
      <div className="status-tabs" role="tablist" aria-label="Filter Status Buku">
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'semua'}
          className={`status-tab ${statusFilter === 'semua' ? 'tab-active' : ''}`}
          onClick={() => onStatusChange('semua')}
          id="tab-status-semua"
        >
          Semua Buku
          <span className="tab-count">{stats.total}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'milik'}
          className={`status-tab tab-milik ${statusFilter === 'milik' ? 'tab-active' : ''}`}
          onClick={() => onStatusChange('milik')}
          id="tab-status-milik"
        >
          Milik
          <span className="tab-count">{stats.owned}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'baca'}
          className={`status-tab tab-baca ${statusFilter === 'baca' ? 'tab-active' : ''}`}
          onClick={() => onStatusChange('baca')}
          id="tab-status-baca"
        >
          Sedang Dibaca
          <span className="tab-count">{stats.reading}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'beli'}
          className={`status-tab tab-beli ${statusFilter === 'beli' ? 'tab-active' : ''}`}
          onClick={() => onStatusChange('beli')}
          id="tab-status-beli"
        >
          Ingin Dibeli
          <span className="tab-count">{stats.wishlist}</span>
        </button>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    owned: PropTypes.number.isRequired,
    reading: PropTypes.number.isRequired,
    wishlist: PropTypes.number.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BookFilter;
