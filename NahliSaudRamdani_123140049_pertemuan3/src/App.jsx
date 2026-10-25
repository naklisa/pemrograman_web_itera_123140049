import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider, useBooks } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Toast from './components/Toast/Toast';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

/**
 * ToastContainer: Mengonsumsi state notifikasi toast dari BookContext
 */
function ToastContainer() {
  const { toast, closeToast } = useBooks();
  if (!toast) return null;
  return (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={closeToast}
    />
  );
}

/**
 * AppContent: Menampung rute aplikasi di dalam BookProvider
 */
function AppContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Navbar Global */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Rute Navigasi SPA */}
      <main className="app-main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAddModalOpen={isAddModalOpen}
                onCloseAddModal={() => setIsAddModalOpen(false)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            }
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Footer Aplikasi */}
      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-title">
            <strong>PustakaKu</strong> — Aplikasi Manajemen Buku Pribadi
          </p>
          <p className="footer-author">
            Praktikum Pengembangan Aplikasi Web (PAW) Pertemuan 3 •{' '}
            <span className="footer-student">Nahli Saud Ramdani (123140049)</span>
          </p>
          <p className="footer-campus">
            Teknik Informatika • Institut Teknologi Sumatera (ITERA)
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <BookProvider>
        <AppContent />
      </BookProvider>
    </Router>
  );
}

export default App;
