import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from '../components/BookList/BookList';

describe('Komponen BookList (Koleksi Kartu & Status Kosong)', () => {
  const booksSample = [
    {
      id: '1',
      title: 'Buku Satu',
      author: 'Penulis Satu',
      status: 'milik',
      category: 'Teknologi',
    },
    {
      id: '2',
      title: 'Buku Dua',
      author: 'Penulis Dua',
      status: 'baca',
      category: 'Fiksi',
    },
  ];

  it('merender seluruh daftar kartu buku saat data tersedia', () => {
    render(
      <BookList
        books={booksSample}
        totalAllBooks={2}
        onEditBook={vi.fn()}
        onDeleteBook={vi.fn()}
        onStatusChange={vi.fn()}
        onResetFilters={vi.fn()}
        onOpenAddModal={vi.fn()}
      />
    );

    expect(screen.getByText('Buku Satu')).toBeInTheDocument();
    expect(screen.getByText('Buku Dua')).toBeInTheDocument();
  });

  it('merender tampilan empty state ketika daftar buku kosong karena filter', () => {
    render(
      <BookList
        books={[]}
        totalAllBooks={5}
        onEditBook={vi.fn()}
        onDeleteBook={vi.fn()}
        onStatusChange={vi.fn()}
        onResetFilters={vi.fn()}
        onOpenAddModal={vi.fn()}
      />
    );

    expect(
      screen.getByText(/tidak ada buku yang sesuai kriteria/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reset filter & pencarian/i })
    ).toBeInTheDocument();
  });

  it('merender ajakan tambah buku ketika sistem sama sekali belum memiliki buku', () => {
    render(
      <BookList
        books={[]}
        totalAllBooks={0}
        onEditBook={vi.fn()}
        onDeleteBook={vi.fn()}
        onStatusChange={vi.fn()}
        onResetFilters={vi.fn()}
        onOpenAddModal={vi.fn()}
      />
    );

    expect(screen.getByText(/belum ada buku tersimpan/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /\+ tambah buku sekarang/i })
    ).toBeInTheDocument();
  });
});
