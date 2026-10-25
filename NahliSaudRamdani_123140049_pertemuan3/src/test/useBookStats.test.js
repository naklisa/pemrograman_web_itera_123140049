import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBookStats from '../hooks/useBookStats';

describe('Custom Hook useBookStats (Agregasi Data & Analitik)', () => {
  const dummyBooks = [
    {
      id: '1',
      title: 'Buku A',
      author: 'Penulis A',
      status: 'milik',
      category: 'Teknologi',
      rating: 5,
      createdAt: 1000,
    },
    {
      id: '2',
      title: 'Buku B',
      author: 'Penulis B',
      status: 'baca',
      category: 'Teknologi',
      rating: 4,
      createdAt: 3000,
    },
    {
      id: '3',
      title: 'Buku C',
      author: 'Penulis C',
      status: 'beli',
      category: 'Fiksi',
      rating: 0,
      createdAt: 2000,
    },
    {
      id: '4',
      title: 'Buku D',
      author: 'Penulis D',
      status: 'milik',
      category: 'Sains',
      rating: 3,
      createdAt: 1500,
    },
  ];

  it('menghitung total dan agregasi status buku dengan benar', () => {
    const { result } = renderHook(() => useBookStats(dummyBooks));

    expect(result.current.total).toBe(4);
    expect(result.current.owned).toBe(2);
    expect(result.current.reading).toBe(1);
    expect(result.current.wishlist).toBe(1);
  });

  it('menghitung rasio baca aktif dengan benar', () => {
    const { result } = renderHook(() => useBookStats(dummyBooks));
    // reading: 1, owned: 2 -> total di rak: 3 -> 1/3 = 33%
    expect(result.current.activeReadRatio).toBe(33);
  });

  it('menghitung rata-rata rating hanya dari buku yang memiliki rating', () => {
    const { result } = renderHook(() => useBookStats(dummyBooks));
    // rated: Buku A (5), Buku B (4), Buku D (3) -> rata-rata: (5 + 4 + 3) / 3 = 4.0
    expect(result.current.avgRating).toBe(4.0);
    expect(result.current.ratedCount).toBe(3);
  });

  it('mengidentifikasi buku terbaru berdasarkan createdAt', () => {
    const { result } = renderHook(() => useBookStats(dummyBooks));
    expect(result.current.latestBook).not.toBeNull();
    expect(result.current.latestBook.id).toBe('2');
    expect(result.current.latestBook.title).toBe('Buku B');
  });
});
