import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext(null);

export const STORAGE_KEY = 'pustakaku_books_data_v1';

export const INITIAL_BOOKS = [
  {
    id: '1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    status: 'milik',
    category: 'Teknologi',
    year: 2008,
    rating: 5,
    notes: 'Buku fundamental arsitektur dan gaya penulisan kode bersih untuk developer profesional.',
    createdAt: 1700000000000,
  },
  {
    id: '2',
    title: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa',
    author: 'James Clear',
    status: 'baca',
    category: 'Pengembangan Diri',
    year: 2018,
    rating: 5,
    notes: 'Sedang membaca bab 3 tentang sistem pembentukan kebiasaan 1% setiap hari.',
    createdAt: 1700100000000,
  },
  {
    id: '3',
    title: 'The Pragmatic Programmer: Your Journey To Mastery',
    author: 'Andrew Hunt & David Thomas',
    status: 'milik',
    category: 'Teknologi',
    year: 2019,
    rating: 4,
    notes: 'Koleksi tips praktis menjadi pengembang perangkat lunak yang pragmatis.',
    createdAt: 1700200000000,
  },
  {
    id: '4',
    title: 'Sapiens: Riwayat Singkat Umat Manusia',
    author: 'Yuval Noah Harari',
    status: 'beli',
    category: 'Sains & Sejarah',
    year: 2014,
    rating: 5,
    notes: 'Rekomendasi dari teman untuk wishlist buku bulan depan.',
    createdAt: 1700300000000,
  },
  {
    id: '5',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'beli',
    category: 'Teknologi',
    year: 2017,
    rating: 5,
    notes: 'Panduan mendalam arsitektur sistem terdistribusi, database, dan streaming data.',
    createdAt: 1700400000000,
  },
];

/**
 * Custom Hook: useBooks
 * Mempermudah konsumsi BookContext di seluruh komponen anak
 */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

/**
 * Provider Utama BookContext
 */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, INITIAL_BOOKS);
  const [toast, setToast] = useState(null);

  // Custom hook untuk analitik
  const stats = useBookStats(books);

  // Menampilkan notifikasi visual toast
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current));
    }, 3500);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Menambah buku baru
  const addBook = useCallback((bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      year: bookData.year ? Number(bookData.year) : undefined,
      rating: bookData.rating ? Number(bookData.rating) : 0,
    };
    setBooks((prev) => [newBook, ...prev]);
    showToast(`Buku "${newBook.title}" berhasil ditambahkan!`, 'success');
    return newBook;
  }, [setBooks, showToast]);

  // Mengedit buku yang sudah ada
  const updateBook = useCallback((id, updatedData) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === id) {
          return {
            ...book,
            ...updatedData,
            year: updatedData.year ? Number(updatedData.year) : book.year,
            rating: updatedData.rating !== undefined ? Number(updatedData.rating) : book.rating,
            updatedAt: Date.now(),
          };
        }
        return book;
      })
    );
    showToast('Data buku berhasil diperbarui!', 'success');
  }, [setBooks, showToast]);

  // Menghapus buku
  const deleteBook = useCallback((id) => {
    const target = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    showToast(`Buku "${target ? target.title : 'terpilih'}" berhasil dihapus.`, 'info');
  }, [books, setBooks, showToast]);

  // Mengubah status buku secara cepat
  const changeStatus = useCallback((id, newStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus, updatedAt: Date.now() } : b))
    );
    const labelMap = { milik: 'Koleksi Pribadi', baca: 'Sedang Dibaca', beli: 'Ingin Dibeli' };
    showToast(`Status buku diubah menjadi "${labelMap[newStatus] || newStatus}"`, 'success');
  }, [setBooks, showToast]);

  // Reset ke data awal demo
  const resetToSampleData = useCallback(() => {
    setBooks(INITIAL_BOOKS);
    showToast('Koleksi contoh buku berhasil dipulihkan!', 'info');
  }, [setBooks, showToast]);

  // Hapus semua buku
  const clearAllBooks = useCallback(() => {
    setBooks([]);
    showToast('Semua buku telah dibersihkan.', 'warning');
  }, [setBooks, showToast]);

  const value = {
    books,
    stats,
    toast,
    showToast,
    closeToast,
    addBook,
    updateBook,
    deleteBook,
    changeStatus,
    resetToSampleData,
    clearAllBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookContext;
