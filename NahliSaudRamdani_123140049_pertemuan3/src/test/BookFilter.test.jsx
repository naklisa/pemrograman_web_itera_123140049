import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookFilter from '../components/BookFilter/BookFilter';

describe('Komponen BookFilter (Pencarian & Pemfilteran)', () => {
  const dummyStats = {
    total: 10,
    owned: 5,
    reading: 3,
    wishlist: 2,
  };

  const dummyCategories = ['Teknologi', 'Fiksi', 'Sains'];

  it('merender input pencarian dan memicu callback onSearchChange saat mengetik', () => {
    const handleSearchChange = vi.fn();
    render(
      <BookFilter
        searchQuery=""
        onSearchChange={handleSearchChange}
        statusFilter="semua"
        onStatusChange={vi.fn()}
        categoryFilter="semua"
        onCategoryChange={vi.fn()}
        sortBy="newest"
        onSortChange={vi.fn()}
        stats={dummyStats}
        categories={dummyCategories}
      />
    );

    const searchInput = screen.getByPlaceholderText(/cari buku berdasarkan judul/i);
    fireEvent.change(searchInput, { target: { value: 'clean code' } });

    expect(handleSearchChange).toHaveBeenCalledWith('clean code');
  });

  it('memicu callback onStatusChange saat tab status diklik', () => {
    const handleStatusChange = vi.fn();
    render(
      <BookFilter
        searchQuery=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={handleStatusChange}
        categoryFilter="semua"
        onCategoryChange={vi.fn()}
        sortBy="newest"
        onSortChange={vi.fn()}
        stats={dummyStats}
        categories={dummyCategories}
      />
    );

    const readingTab = screen.getByRole('tab', { name: /sedang dibaca/i });
    fireEvent.click(readingTab);

    expect(handleStatusChange).toHaveBeenCalledWith('baca');
  });

  it('memicu callback onCategoryChange saat dropdown kategori berubah', () => {
    const handleCategoryChange = vi.fn();
    render(
      <BookFilter
        searchQuery=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={vi.fn()}
        categoryFilter="semua"
        onCategoryChange={handleCategoryChange}
        sortBy="newest"
        onSortChange={vi.fn()}
        stats={dummyStats}
        categories={dummyCategories}
      />
    );

    const categorySelect = screen.getByLabelText(/filter berdasarkan kategori/i);
    fireEvent.change(categorySelect, { target: { value: 'Teknologi' } });

    expect(handleCategoryChange).toHaveBeenCalledWith('Teknologi');
  });
});
