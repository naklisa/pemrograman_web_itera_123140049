import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import StatCard from '../../components/StatCard/StatCard';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import Modal from '../../components/Modal/Modal';
import BookForm from '../../components/BookForm/BookForm';
import useDebounce from '../../hooks/useDebounce';
import './Home.css';

function Home({ isAddModalOpen, onCloseAddModal, onOpenAddModal }) {
  const {
    books,
    stats,
    addBook,
    updateBook,
    deleteBook,
    changeStatus,
    resetToSampleData,
    clearAllBooks,
  } = useBooks();

  // State Filter & Pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [categoryFilter, setCategoryFilter] = useState('semua');
  const [sortBy, setSortBy] = useState('newest');

  // Modal State untuk Edit & Hapus
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);

  // Debounce search query untuk efisiensi
  const debouncedSearch = useDebounce(searchQuery, 250);

  // Daftar kategori unik yang tersedia
  const availableCategories = useMemo(() => {
    const defaultCategories = [
      'Teknologi',
      'Pengembangan Diri',
      'Sains & Sejarah',
      'Fiksi & Sastra',
      'Bisnis & Finansial',
      'Filsafat',
      'Komik & Grafis',
      'Lainnya',
    ];
    const fromBooks = books.map((b) => b.category).filter(Boolean);
    return Array.from(new Set([...defaultCategories, ...fromBooks]));
  }, [books]);

  // Filter & Urutkan Buku
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // 1. Filter Pencarian (Judul ATAU Penulis)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // 2. Filter Status
    if (statusFilter !== 'semua') {
      result = result.filter((b) => b.status === statusFilter);
    }

    // 3. Filter Kategori
    if (categoryFilter !== 'semua') {
      result = result.filter((b) => b.category === categoryFilter);
    }

    // 4. Pengurutan (Sorting)
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-desc':
          return (Number(b.year) || 0) - (Number(a.year) || 0);
        case 'year-asc':
          return (Number(a.year) || 0) - (Number(b.year) || 0);
        case 'rating-desc':
          return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        case 'newest':
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });

    return result;
  }, [books, debouncedSearch, statusFilter, categoryFilter, sortBy]);

  // Reset seluruh filter & pencarian
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('semua');
    setCategoryFilter('semua');
    setSortBy('newest');
  };

  // Handler Tambah Buku
  const handleAddSubmit = (formData) => {
    addBook(formData);
    onCloseAddModal();
  };

  // Handler Edit Buku
  const handleEditSubmit = (formData) => {
    if (editingBook) {
      updateBook(editingBook.id, formData);
      setEditingBook(null);
    }
  };

  // Handler Hapus Buku
  const handleConfirmDelete = () => {
    if (deletingBookId) {
      deleteBook(deletingBookId);
      setDeletingBookId(null);
    }
  };

  const bookToDelete = books.find((b) => b.id === deletingBookId);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Banner Selamat Datang */}
        <section className="welcome-hero">
          <div className="hero-content">
            <h1 className="hero-title">Katalog Koleksi Buku Pribadi</h1>
            <p className="hero-subtitle">
              Pantau buku milikmu, pantau progres bacaan harian, dan catat daftar impian buku yang ingin dibeli.
            </p>
          </div>
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary-hero"
              onClick={onOpenAddModal}
              id="hero-btn-add"
            >
              + Tambah Buku Baru
            </button>
          </div>
        </section>

        {/* Ringkasan Metrik Cepat */}
        <section className="stats-cards-grid" aria-label="Metrik Ringkasan">
          <StatCard
            title="Total Buku"
            value={stats.total}
            icon="📚"
            variant="primary"
            description="Koleksi buku terdaftar"
            onClick={() => setStatusFilter('semua')}
          />
          <StatCard
            title="Milik (Koleksi)"
            value={stats.owned}
            icon="📗"
            variant="success"
            description="Buku yang sudah dimiliki"
            onClick={() => setStatusFilter('milik')}
          />
          <StatCard
            title="Sedang Dibaca"
            value={stats.reading}
            icon="📖"
            variant="warning"
            description="Buku dalam proses dibaca"
            onClick={() => setStatusFilter('baca')}
          />
          <StatCard
            title="Ingin Dibeli"
            value={stats.wishlist}
            icon="🔖"
            variant="purple"
            description="Daftar wishlist buku"
            onClick={() => setStatusFilter('beli')}
          />
        </section>

        {/* Bilah Filter & Pencarian */}
        <section className="filter-section">
          <BookFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            stats={stats}
            categories={availableCategories}
          />
        </section>

        {/* Informasi Jumlah Hasil & Opsi Reset Cepat */}
        <section className="catalog-meta-bar">
          <p className="results-count">
            Menampilkan <strong>{filteredAndSortedBooks.length}</strong> dari{' '}
            <strong>{books.length}</strong> buku
            {statusFilter !== 'semua' && ` • Status: "${statusFilter}"`}
            {categoryFilter !== 'semua' && ` • Kategori: "${categoryFilter}"`}
            {searchQuery && ` • Kata kunci: "${searchQuery}"`}
          </p>

          <div className="catalog-tools">
            <button
              type="button"
              className="btn-tool-text"
              onClick={resetToSampleData}
              title="Kembalikan contoh buku awal"
            >
              ↺ Muat Contoh Buku
            </button>
            <button
              type="button"
              className="btn-tool-danger"
              onClick={() => {
                if (books.length === 0) return;
                if (window.confirm('Bersihkan semua buku dari penyimpanan lokal?')) {
                  clearAllBooks();
                }
              }}
              disabled={books.length === 0}
              title="Bersihkan semua buku"
            >
              Bersihkan Semua
            </button>
          </div>
        </section>

        {/* Daftar Buku */}
        <section className="books-display-section">
          <BookList
            books={filteredAndSortedBooks}
            totalAllBooks={books.length}
            onEditBook={(book) => setEditingBook(book)}
            onDeleteBook={(id) => setDeletingBookId(id)}
            onStatusChange={changeStatus}
            onResetFilters={handleResetFilters}
            onOpenAddModal={onOpenAddModal}
          />
        </section>
      </div>

      {/* Modal Tambah Buku Baru */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={onCloseAddModal}
        title="Tambah Buku Baru ke Katalog"
      >
        <BookForm
          onSubmit={handleAddSubmit}
          onCancel={onCloseAddModal}
          submitLabel="Simpan Buku Baru"
        />
      </Modal>

      {/* Modal Edit Buku */}
      <Modal
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
        title="Edit Detail Buku"
      >
        {editingBook && (
          <BookForm
            initialData={editingBook}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingBook(null)}
            submitLabel="Simpan Perubahan"
          />
        )}
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={Boolean(deletingBookId)}
        onClose={() => setDeletingBookId(null)}
        title="Konfirmasi Penghapusan Buku"
        maxWidth="440px"
      >
        <div className="delete-confirm-box">
          <p className="delete-warning-text">
            Apakah Anda yakin ingin menghapus buku{' '}
            <strong>&ldquo;{bookToDelete ? bookToDelete.title : ''}&rdquo;</strong> dari
            koleksi pribadi Anda?
          </p>
          <p className="delete-subtext">Tindakan ini tidak dapat dibatalkan.</p>
          <div className="delete-modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setDeletingBookId(null)}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn-confirm-delete"
              onClick={handleConfirmDelete}
              id="btn-confirm-delete-book"
            >
              Ya, Hapus Buku
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Home.propTypes = {
  isAddModalOpen: PropTypes.bool.isRequired,
  onCloseAddModal: PropTypes.func.isRequired,
  onOpenAddModal: PropTypes.func.isRequired,
};

export default Home;
