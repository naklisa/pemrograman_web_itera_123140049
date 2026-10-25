import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookCard from '../components/BookCard/BookCard';

describe('Komponen BookCard (Kartu Buku Reusable)', () => {
  const sampleBook = {
    id: 'b1',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Gang of Four',
    status: 'milik',
    category: 'Teknologi',
    year: 1994,
    rating: 5,
    notes: 'Buku klasik tentang 23 pola desain OOP.',
  };

  it('merender judul buku, nama penulis, dan status lencana dengan tepat', () => {
    render(
      <BookCard
        book={sampleBook}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByText(sampleBook.title)).toBeInTheDocument();
    expect(screen.getByText(/gang of four/i)).toBeInTheDocument();
    expect(screen.getByText(/milik \(koleksi\)/i)).toBeInTheDocument();
    expect(screen.getByText('Teknologi')).toBeInTheDocument();
  });

  it('memanggil onEdit saat tombol Edit diklik', () => {
    const handleEdit = vi.fn();
    render(
      <BookCard
        book={sampleBook}
        onEdit={handleEdit}
        onDelete={vi.fn()}
        onStatusChange={vi.fn()}
      />
    );

    const editBtn = screen.getByRole('button', { name: /edit buku/i });
    fireEvent.click(editBtn);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(sampleBook);
  });

  it('memanggil onDelete dengan ID buku saat tombol Hapus diklik', () => {
    const handleDelete = vi.fn();
    render(
      <BookCard
        book={sampleBook}
        onEdit={vi.fn()}
        onDelete={handleDelete}
        onStatusChange={vi.fn()}
      />
    );

    const deleteBtn = screen.getByRole('button', { name: /hapus buku/i });
    fireEvent.click(deleteBtn);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith('b1');
  });

  it('memanggil onStatusChange saat dropdown status cepat diubah', () => {
    const handleStatusChange = vi.fn();
    render(
      <BookCard
        book={sampleBook}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onStatusChange={handleStatusChange}
      />
    );

    const statusDropdown = screen.getByTitle(/ubah status buku seketika/i);
    fireEvent.change(statusDropdown, { target: { value: 'baca' } });

    expect(handleStatusChange).toHaveBeenCalledWith('b1', 'baca');
  });
});
