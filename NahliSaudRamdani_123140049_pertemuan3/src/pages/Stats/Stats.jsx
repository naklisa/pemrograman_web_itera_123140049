import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import StatCard from '../../components/StatCard/StatCard';
import './Stats.css';

function Stats() {
  const { stats, books } = useBooks();

  // Urutkan kategori berdasarkan frekuensi buku terbanyak
  const sortedCategories = Object.entries(stats.categoryCounts).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* Header Halaman */}
        <section className="stats-hero">
          <div className="stats-hero-content">
            <h1 className="stats-title">Statistik & Analisis Koleksi Buku</h1>
            <p className="stats-subtitle">
              Wawasan data komprehensif mengenai kebiasaan membaca, koleksi fisik, dan wishlist buku pribadi Anda.
            </p>
          </div>
          <Link to="/" className="btn-back-catalog">
            ← Kembali ke Katalog
          </Link>
        </section>

        {/* Kartu Ringkasan Metrik */}
        <section className="stats-overview-grid">
          <StatCard
            title="Total Koleksi"
            value={stats.total}
            icon="📚"
            variant="primary"
            description="Buku tercatat dalam sistem"
          />
          <StatCard
            title="Sudah Dimiliki"
            value={stats.owned}
            icon="📗"
            variant="success"
            description="Buku dalam perpustakaan fisik/digital"
          />
          <StatCard
            title="Sedang Dibaca"
            value={stats.reading}
            icon="📖"
            variant="warning"
            description="Buku dalam proses pembacaan aktif"
          />
          <StatCard
            title="Daftar Ingin Dibeli"
            value={stats.wishlist}
            icon="🔖"
            variant="purple"
            description="Wishlist target pembelian"
          />
          <StatCard
            title="Rata-rata Rating"
            value={stats.avgRating > 0 ? `${stats.avgRating} / 5` : 'N/A'}
            icon="⭐"
            variant="primary"
            description={`Berdasarkan ${stats.ratedCount} buku yang dinilai`}
          />
        </section>

        {/* Progres & Rasio Baca */}
        <section className="stats-detail-card">
          <h2 className="detail-card-title">Rasio Baca Aktif</h2>
          <p className="detail-card-subtitle">
            Persentase buku yang sedang aktif Anda baca dibandingkan dengan buku yang sudah ada di rak (milik + dibaca).
          </p>

          <div className="progress-container">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, stats.activeReadRatio)}%` }}
                role="progressbar"
                aria-valuenow={stats.activeReadRatio}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <div className="progress-labels">
              <span>{stats.reading} buku sedang dibaca</span>
              <strong>{stats.activeReadRatio}% Aktif</strong>
            </div>
          </div>
        </section>

        {/* Distribusi Kategori & Genre */}
        <div className="stats-two-col">
          <section className="stats-detail-card">
            <h2 className="detail-card-title">Distribusi Berdasarkan Kategori</h2>
            <p className="detail-card-subtitle">
              Sebaran genre buku dalam koleksi Anda:
            </p>

            {sortedCategories.length === 0 ? (
              <p className="empty-stats-note">Belum ada data kategori buku.</p>
            ) : (
              <div className="category-bars-list">
                {sortedCategories.map(([category, count]) => {
                  const percentage =
                    stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <div key={category} className="cat-bar-item">
                      <div className="cat-bar-header">
                        <span className="cat-name">{category}</span>
                        <span className="cat-count">
                          {count} buku ({percentage}%)
                        </span>
                      </div>
                      <div className="cat-bar-bg">
                        <div
                          className="cat-bar-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Buku Terbaru & Sorotan */}
          <section className="stats-detail-card">
            <h2 className="detail-card-title">Sorotan Buku Terakhir Ditambahkan</h2>
            <p className="detail-card-subtitle">
              Buku yang paling baru Anda input ke dalam sistem:
            </p>

            {stats.latestBook ? (
              <div className="latest-book-box">
                <span className="latest-badge">Terbaru</span>
                <h3 className="latest-title">{stats.latestBook.title}</h3>
                <p className="latest-author">Penulis: {stats.latestBook.author}</p>
                <div className="latest-meta">
                  <span className={`status-badge status-${stats.latestBook.status}`}>
                    {stats.latestBook.status === 'milik'
                      ? 'Milik'
                      : stats.latestBook.status === 'baca'
                      ? 'Sedang Dibaca'
                      : 'Ingin Dibeli'}
                  </span>
                  <span className="category-tag">{stats.latestBook.category}</span>
                </div>
                {stats.latestBook.notes && (
                  <p className="latest-notes">&ldquo;{stats.latestBook.notes}&rdquo;</p>
                )}
              </div>
            ) : (
              <p className="empty-stats-note">Belum ada buku dalam katalog.</p>
            )}

            <div className="reading-tip-box">
              <span className="tip-icon">💡</span>
              <div>
                <strong>Tips Membaca:</strong>
                <p>
                  Membaca 15 halaman setiap hari secara konsisten memungkinkan Anda menyelesaikan 15-20 buku per tahun!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Stats;
