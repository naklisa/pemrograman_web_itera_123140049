import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Halaman Tidak Ditemukan</h1>
        <p className="notfound-desc">
          Rute yang Anda cari tidak tersedia dalam aplikasi manajemen buku PustakaKu.
        </p>
        <Link to="/" className="btn-notfound-home">
          ← Kembali ke Katalog Utama
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
