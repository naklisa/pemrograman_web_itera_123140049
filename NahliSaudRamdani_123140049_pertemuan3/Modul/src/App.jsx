import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

/**
 * Komponen Utama App - Modul Praktikum PAW Pertemuan 3
 * Mengintegrasikan Router, Context Provider, dan Fallback 404
 */
function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Latihan Mandiri Submodul 4: Fallback Rute 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="footer">
            <p>Praktikum Pengembangan Aplikasi Web - Modul 3: React Fundamentals</p>
            <small>Nahli Saud Ramdani (123140049) - Teknik Informatika ITERA</small>
          </footer>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;
