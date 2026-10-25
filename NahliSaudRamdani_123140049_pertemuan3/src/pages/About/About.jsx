import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="about-hero-title">Tentang Aplikasi PustakaKu</h1>
          <p className="about-hero-subtitle">
            Aplikasi Manajemen Buku Pribadi Modern Berbasis React, Context API, dan React Router
          </p>
        </section>

        {/* Profil Mahasiswa */}
        <section className="about-card profile-card">
          <div className="profile-badge">Mahasiswa Pengembang</div>
          <div className="profile-details">
            <h2 className="profile-name">Nahli Saud Ramdani</h2>
            <p className="profile-nim">NIM: 123140049</p>
            <p className="profile-meta">
              Program Studi Teknik Informatika • Jurusan Teknologi Produksi dan Industri
            </p>
            <p className="profile-inst">Institut Teknologi Sumatera (ITERA)</p>
          </div>
        </section>

        {/* Deskripsi Proyek */}
        <section className="about-card">
          <h2 className="section-heading">Latar Belakang & Deskripsi Aplikasi</h2>
          <p className="section-paragraph">
            <strong>PustakaKu</strong> adalah aplikasi Single Page Application (SPA) manajemen buku pribadi
            yang dirancang untuk membantu pembaca mengorganisir koleksi literasi mereka secara efisien.
            Aplikasi ini mendukung pencatatan status buku (<strong>Milik / Koleksi</strong>,{' '}
            <strong>Sedang Dibaca</strong>, dan <strong>Ingin Dibeli / Wishlist</strong>), pencarian real-time
            berdasarkan judul atau penulis, pemfilteran multi-kategori, sistem rating personal,
            serta dashboard statistik analitik kebiasaan membaca.
          </p>
        </section>

        {/* Konsep React yang Diimplementasikan */}
        <section className="about-card">
          <h2 className="section-heading">Penerapan Konsep & Teknologi React</h2>
          <div className="concept-grid">
            <div className="concept-box">
              <span className="concept-icon">⚡</span>
              <h3>Functional Components & Hooks</h3>
              <p>
                Seluruh komponen dibangun menggunakan <em>functional components</em> dengan memanfaatkan{' '}
                <code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, dan <code>useCallback</code>{' '}
                untuk render yang optimal dan reaktif.
              </p>
            </div>

            <div className="concept-box">
              <span className="concept-icon">🌐</span>
              <h3>Global State Context API</h3>
              <p>
                Dikelola terpusat oleh <code>BookContext.jsx</code> yang menyediakan operasi CRUD lengkap,
                kalkulasi statistik, serta toast notification tanpa <em>prop drilling</em>.
              </p>
            </div>

            <div className="concept-box">
              <span className="concept-icon">🪝</span>
              <h3>Minimal 2 Custom Hooks</h3>
              <p>
                Mengimplementasikan <code>useLocalStorage.js</code> (sinkronisasi persisten otomatis),{' '}
                <code>useBookStats.js</code> (agregasi analitik performan), serta bonus <code>useDebounce.js</code>.
              </p>
            </div>

            <div className="concept-box">
              <span className="concept-icon">🧭</span>
              <h3>React Router Multi-Halaman</h3>
              <p>
                Navigasi cepat tanpa reload peramban menggunakan <code>react-router-dom</code> dengan rute{' '}
                <code>/</code> (Katalog), <code>/stats</code> (Analitik), <code>/about</code> (Tentang), dan{' '}
                <code>*</code> (Fallback 404).
              </p>
            </div>

            <div className="concept-box">
              <span className="concept-icon">🛡️</span>
              <h3>Validasi PropTypes Lengkap</h3>
              <p>
                Seluruh komponen reusable (<code>BookForm</code>, <code>BookCard</code>, <code>BookFilter</code>,{' '}
                <code>BookList</code>, <code>StatCard</code>, <code>Modal</code>, <code>Toast</code>) diverifikasi
                secara ketat menggunakan <code>prop-types</code>.
              </p>
            </div>

            <div className="concept-box">
              <span className="concept-icon">🧪</span>
              <h3>Unit Testing (Vitest & RTL)</h3>
              <p>
                Dilengkapi rangkaian unit test otomatis dengan Vitest dan React Testing Library untuk menjamin
                keandalan validasi form, render komponen, interaksi tombol, dan kalkulasi hook.
              </p>
            </div>
          </div>
        </section>

        {/* Pemetaan Fitur & File */}
        <section className="about-card">
          <h2 className="section-heading">Struktur Berkas & Organisasi Komponen</h2>
          <div className="file-table-wrapper">
            <table className="file-table">
              <thead>
                <tr>
                  <th>Fitur / Kebutuhan</th>
                  <th>Berkas Sumber</th>
                  <th>Deskripsi Peran</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Form Input & Error Handling</td>
                  <td><code>src/components/BookForm/</code></td>
                  <td>Validasi judul, penulis, status, serta feedback visual jika input kosong</td>
                </tr>
                <tr>
                  <td>Daftar & Kartu Buku</td>
                  <td><code>src/components/BookList/ & BookCard/</code></td>
                  <td>Grid kartu responsif, lencana status, tombol aksi edit, hapus, & ganti status</td>
                </tr>
                <tr>
                  <td>Pencarian & Filter Status</td>
                  <td><code>src/components/BookFilter/</code></td>
                  <td>Pencarian judul/penulis, filter status tabs, selector sorting, filter genre</td>
                </tr>
                <tr>
                  <td>Custom Hook Persistensi</td>
                  <td><code>src/hooks/useLocalStorage.js</code></td>
                  <td>Membaca dan menyimpan data JSON ke Web Storage API secara persisten</td>
                </tr>
                <tr>
                  <td>Custom Hook Statistik</td>
                  <td><code>src/hooks/useBookStats.js</code></td>
                  <td>Kalkulasi total, rasio baca, rating rata-rata, dan distribusi kategori</td>
                </tr>
                <tr>
                  <td>Global Context API</td>
                  <td><code>src/context/BookContext.jsx</code></td>
                  <td>State manajemen terpusat dengan Provider dan consumer hook <code>useBooks()</code></td>
                </tr>
                <tr>
                  <td>Navigasi Multi-halaman</td>
                  <td><code>src/App.jsx & Navbar/</code></td>
                  <td>Routing SPA (Home, Stats, About, 404)</td>
                </tr>
                <tr>
                  <td>Unit Testing Suite</td>
                  <td><code>src/test/*.test.jsx</code></td>
                  <td>5+ skenario pengujian komprehensif Vitest & React Testing Library</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Kembali ke Beranda */}
        <div className="about-cta-bar">
          <Link to="/" className="btn-primary-hero">
            ← Jelajahi Katalog Buku
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
