import React from 'react';
import Header from '../../components/Header/Header';
import { useTasks } from '../../context/TaskContext';
import './About.css';

function About() {
  // Latihan Mandiri Submodul 6: Konsumsi Context di halaman About
  const { stats } = useTasks();

  return (
    <div className="about">
      <Header
        title="Tentang Task Manager"
        description="Aplikasi Manajemen Tugas Praktikum Pemrograman Web (PAW)"
      />

      <main className="container">
        <div className="about-content">
          <h2>Tentang Aplikasi</h2>
          <p>
            Aplikasi Task Manager ini dibangun sebagai pemenuhan seluruh rangkaian latihan
            modul praktikum (Submodul 1 hingga Submodul 6). Aplikasi menerapkan prinsip
            komponen modular, React Hooks (<code>useState</code>, <code>useEffect</code>), custom hooks,
            dan Context API untuk state global.
          </p>

          {/* Latihan Mandiri Submodul 6: Tampilkan statistik tugas dari Context */}
          <div className="about-stats-box">
            <h3>📊 Ringkasan Data Tugas (Context API)</h3>
            <p className="highlight-stat">
              Saat ini Anda memiliki total <strong>{stats.total}</strong> tugas yang tersimpan di sistem.
            </p>
            <div className="about-stats-grid">
              <div className="stat-pill completed">
                <span>Selesai:</span> <strong>{stats.completed}</strong>
              </div>
              <div className="stat-pill pending">
                <span>Belum Selesai:</span> <strong>{stats.remaining}</strong>
              </div>
              <div className="stat-pill rate">
                <span>Tingkat Penyelesaian:</span> <strong>{stats.completionRate.toFixed(1)}%</strong>
              </div>
            </div>
          </div>

          <h3>Fitur Unggulan Modul:</h3>
          <ul>
            <li>Manajemen tugas real-time (tambah, tandai selesai, hapus)</li>
            <li>Penyimpanan lokal persisten melalui custom hook <code>useLocalStorage</code></li>
            <li>Navigasi kilat Single Page Application (SPA) dengan React Router</li>
            <li>State global terpusat tanpa prop drilling dengan Context API</li>
            <li>Deteksi adaptif ukuran viewport layar dengan <code>useWindowSize</code></li>
            <li>Wadah berbingkai modular berbasis <code>props.children</code> (komponen <code>Card</code>)</li>
          </ul>

          <div className="student-badge">
            <p><strong>Praktikan:</strong> Nahli Saud Ramdani (NIM: 123140049)</p>
            <p>Teknik Informatika - Institut Teknologi Sumatera (ITERA)</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
