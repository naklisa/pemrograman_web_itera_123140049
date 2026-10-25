import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './NotFound.css';

/**
 * Halaman 404 Not Found - Latihan Mandiri Submodul 4
 */
function NotFound() {
  return (
    <div className="not-found-page">
      <Header
        title="404 - Halaman Tidak Ditemukan"
        description="Rute URL yang Anda cari tidak tersedia di Task Manager"
      />

      <main className="container">
        <div className="not-found-card">
          <div className="error-code">404</div>
          <h2>Ups! Halaman Hilang</h2>
          <p>
            Alamat URL yang Anda tuju tidak terdaftar dalam routing aplikasi ini.
          </p>
          <Link to="/" className="back-home-btn">
            ⬅ Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
