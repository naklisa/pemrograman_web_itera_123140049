import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import Card from '../../components/Card/Card';
import useWindowSize from '../../hooks/useWindowSize';
import { useTasks } from '../../context/TaskContext';
import './Home.css';

function Home() {
  const { tasks, addTask, deleteTask, toggleComplete, clearAllTasks, stats } = useTasks();
  const { width } = useWindowSize();

  // Latihan Mandiri Submodul 3: Tombol Bersihkan Semua dengan konfirmasi
  const handleClearAll = () => {
    if (tasks.length === 0) return;
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus seluruh tugas yang tersimpan?'
    );
    if (confirmDelete) {
      clearAllTasks();
    }
  };

  // Latihan Mandiri Submodul 5: Label status ukuran layar responsif
  const isMobile = width < 768;

  return (
    <div className="home">
      <Header
        title="React Task Manager"
        description="Kelola tugas harian Anda secara terstruktur dengan React Hooks & Context API"
      />

      <main className="container">
        {/* Latihan Mandiri Submodul 5: Badge deteksi ukuran layar */}
        <div className="screen-badge-container">
          <span className={`screen-badge ${isMobile ? 'mobile' : 'desktop'}`}>
            {isMobile ? '📱 Mode Layar Mobile' : '💻 Mode Layar Desktop'} ({width}px)
          </span>
        </div>

        {/* Panel Statistik & Aksi Bersihkan Semua */}
        <div className="stats-bar">
          <div className="stats">
            <p>Total: <strong>{stats.total}</strong></p>
            <p>Selesai: <strong className="stat-completed">{stats.completed}</strong></p>
            <p>Belum: <strong className="stat-remaining">{stats.remaining}</strong></p>
            <p>Progress: <strong>{stats.completionRate.toFixed(0)}%</strong></p>
          </div>

          {/* Latihan Mandiri Submodul 3 */}
          <button
            type="button"
            className="clear-all-btn"
            onClick={handleClearAll}
            disabled={tasks.length === 0}
            title="Hapus semua tugas yang ada"
          >
            Hapus Semua Tugas
          </button>
        </div>

        {/* Latihan Mandiri Submodul 2: Children Props menggunakan Card */}
        <Card title="Tambah Tugas Baru">
          <TaskForm onAddTask={addTask} />
        </Card>

        {/* Daftar Tugas */}
        <div className="task-list-section">
          <h2 className="section-title">Daftar Tugas Praktikum</h2>
          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="empty-message">
                <p>Belum ada tugas.</p>
                <small>Ketik tugas baru pada form di atas lalu tekan Enter atau klik Tambah!</small>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onToggleComplete={toggleComplete}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
