import { useMemo } from 'react';

/**
 * Custom Hook: useBookStats
 * Melakukan agregasi statistik analitik dari daftar buku secara reaktif
 * @param {Array} books Daftar array objek buku
 * @returns {Object} Objek ringkasan statistik
 */
function useBookStats(books = []) {
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter((b) => b.status === 'milik').length;
    const reading = books.filter((b) => b.status === 'baca').length;
    const wishlist = books.filter((b) => b.status === 'beli').length;

    // Tingkat baca aktif: persentase buku yang sedang dibaca dibanding buku yang sudah dimiliki
    const activeReadRatio =
      owned + reading > 0 ? (reading / (owned + reading)) * 100 : 0;

    // Rata-rata rating
    const ratedBooks = books.filter((b) => b.rating && Number(b.rating) > 0);
    const avgRating =
      ratedBooks.length > 0
        ? (
            ratedBooks.reduce((acc, curr) => acc + Number(curr.rating), 0) /
            ratedBooks.length
          ).toFixed(1)
        : '0.0';

    // Distribusi Kategori
    const categoryCounts = books.reduce((acc, book) => {
      const cat = book.category || 'Umum';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    // Buku terbaru ditambahkan
    const sortedByDate = [...books].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
    const latestBook = sortedByDate[0] || null;

    return {
      total,
      owned,
      reading,
      wishlist,
      activeReadRatio: Math.round(activeReadRatio),
      avgRating: Number(avgRating),
      ratedCount: ratedBooks.length,
      categoryCounts,
      latestBook,
    };
  }, [books]);

  return stats;
}

export default useBookStats;
