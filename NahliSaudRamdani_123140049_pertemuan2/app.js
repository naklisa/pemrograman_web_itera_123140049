/**
 * ============================================================================
 * ITERA ACADEMIC HUB - PERSONAL STUDENT DASHBOARD
 * Script: ES6+ Object-Oriented Architecture, Web Storage API & Async Fetch
 * Author: Nahli Saud Ramdani (123140049) - Mahasiswa Teknik Informatika ITERA
 * Mata Kuliah: Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 2
 * ============================================================================
 */

'use strict';

/**
 * ----------------------------------------------------------------------------
 * 1. CLASS TaskItem
 * Model struktur data berorientasi objek untuk merepresentasikan satu tugas.
 * ----------------------------------------------------------------------------
 */
class TaskItem {
  /**
   * Konstruktor dengan teknik Object Parameter Destructuring dan Default Values
   */
  constructor({
    id = `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title = '',
    course = '',
    deadline = '',
    priority = 'Sedang', // 'Tinggi' | 'Sedang' | 'Rendah'
    category = 'Tugas Kuliah', // 'Praktikum' | 'Tugas Kuliah' | 'Tubes / Proyek' | 'Ujian / Kuis' | 'Organisasi / Lainnya'
    completed = false,
    notes = '',
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.category = category;
    this.completed = completed;
    this.notes = notes;
    this.createdAt = createdAt;
  }

  /**
   * Getter: Mengecek apakah batas waktu pengumpulan sudah terlewat
   */
  get isOverdue() {
    if (!this.deadline || this.completed) return false;
    const now = new Date();
    const taskDate = new Date(this.deadline);
    return taskDate < now;
  }

  /**
   * Getter: Menentukan apakah tugas ini mendesak (< 24 jam atau Prioritas Tinggi)
   */
  get isUrgent() {
    if (this.completed) return false;
    if (this.priority === 'Tinggi') return true;
    if (!this.deadline) return false;

    const diffHours = (new Date(this.deadline) - new Date()) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24;
  }

  /**
   * Getter: Format tanggal & waktu deadline yang manusiawi (ID-id)
   */
  get formattedDeadline() {
    if (!this.deadline) return 'Tidak ada deadline';
    const dateObj = new Date(this.deadline);
    return dateObj.toLocaleString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Getter: Sisa waktu relatif (Hari ini, Besok, Terlewat, dsb)
   */
  get relativeRemaining() {
    if (!this.deadline) return 'Tanpa batas waktu';
    if (this.completed) return 'Tugas tuntas';

    const now = new Date();
    const target = new Date(this.deadline);
    const diffMs = target - now;

    if (diffMs < 0) {
      const pastDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
      return pastDays === 0 ? 'Terlewat beberapa jam lalu' : `Terlewat ${pastDays} hari`;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      return diffHours === 0 ? 'Kurang dari 1 jam lagi!' : `Hari ini (${diffHours} jam lagi)`;
    } else if (diffDays === 1) {
      return 'Besok';
    } else {
      return `${diffDays} hari lagi`;
    }
  }

  /**
   * Method: Toggle status selesai
   */
  toggleComplete() {
    this.completed = !this.completed;
  }

  /**
   * Konversi instance ke plain object untuk serialisasi JSON localStorage
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      course: this.course,
      deadline: this.deadline,
      priority: this.priority,
      category: this.category,
      completed: this.completed,
      notes: this.notes,
      createdAt: this.createdAt
    };
  }

  /**
   * Static Factory Method: Rekonstruksi instance TaskItem dari data JSON mentah
   */
  static fromJSON(jsonObj) {
    return new TaskItem(jsonObj);
  }
}

/**
 * ----------------------------------------------------------------------------
 * 2. CLASS DashboardApp
 * Pengelola status (State Manager), interaksi DOM, LocalStorage & Async API
 * ----------------------------------------------------------------------------
 */
class DashboardApp {
  constructor() {
    // Kunci LocalStorage
    this.STORAGE_KEY_TASKS = 'itera_dashboard_tasks_v1';
    this.STORAGE_KEY_NOTES = 'itera_dashboard_notes_v1';
    this.STORAGE_KEY_THEME = 'itera_dashboard_theme_v1';

    // State Aplikasi
    this.tasks = [];
    this.statusFilter = 'all'; // 'all' | 'active' | 'completed' | 'urgent'
    this.categoryFilter = 'all';
    this.searchQuery = '';
    this.sortBy = 'deadlineAsc'; // 'deadlineAsc' | 'deadlineDesc' | 'priority' | 'createdDesc'

    // Target modal edit/hapus yang sedang aktif
    this.editingTaskId = null;
    this.deletingTaskId = null;

    // Pomodoro Timer State
    this.pomoDuration = 25 * 60; // 25 Menit dalam detik
    this.pomoRemaining = this.pomoDuration;
    this.pomoInterval = null;
    this.isPomoRunning = false;

    // Inisialisasi Elemen DOM
    this.cacheDomElements();
  }

  /**
   * Menghubungkan variabel internal dengan node elemen DOM
   */
  cacheDomElements() {
    // Header & Clock
    this.liveTimeEl = document.getElementById('liveTime');
    this.liveDateEl = document.getElementById('liveDate');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeIconSun = document.getElementById('themeIconSun');
    this.themeIconMoon = document.getElementById('themeIconMoon');

    // Weather Widget
    this.weatherTempEl = document.getElementById('weatherTemp');
    this.weatherDescEl = document.getElementById('weatherDesc');
    this.weatherWindEl = document.getElementById('weatherWind');
    this.weatherStatusEl = document.getElementById('weatherStatus');
    this.adviceTextEl = document.getElementById('adviceText');
    this.weatherIllustrationEl = document.getElementById('weatherIconContainer');
    this.refreshWeatherBtn = document.getElementById('refreshWeatherBtn');

    // Quote Section
    this.quoteContentEl = document.getElementById('quoteContent');
    this.refreshQuoteBtn = document.getElementById('refreshQuoteBtn');

    // Scratchpad
    this.scratchpadArea = document.getElementById('scratchpadArea');
    this.clearNoteBtn = document.getElementById('clearNoteBtn');
    this.noteSaveStatus = document.getElementById('noteSaveStatus');

    // Pomodoro Elements
    this.pomodoroDisplay = document.getElementById('pomodoroDisplay');
    this.pomoStartBtn = document.getElementById('pomoStartBtn');
    this.pomoPauseBtn = document.getElementById('pomoPauseBtn');
    this.pomoResetBtn = document.getElementById('pomoResetBtn');

    // Metrics Overview
    this.statTotalEl = document.getElementById('statTotal');
    this.statPendingEl = document.getElementById('statPending');
    this.statCompletedEl = document.getElementById('statCompleted');
    this.statUrgentEl = document.getElementById('statUrgent');
    this.progressPercentageEl = document.getElementById('progressPercentage');
    this.progressBarEl = document.getElementById('progressBar');

    // Filter Badges Count
    this.countAllEl = document.getElementById('countAll');
    this.countActiveEl = document.getElementById('countActive');
    this.countCompletedEl = document.getElementById('countCompleted');
    this.countUrgentEl = document.getElementById('countUrgent');

    // Search & Filters
    this.searchInput = document.getElementById('searchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.categoryFilterSelect = document.getElementById('categoryFilter');
    this.sortBySelect = document.getElementById('sortBySelect');
    this.statusFilterTabs = document.getElementById('statusFilterTabs');

    // Task List & Actions
    this.taskListContainer = document.getElementById('taskListContainer');
    this.emptyStateContainer = document.getElementById('emptyStateContainer');
    this.emptyStateAddBtn = document.getElementById('emptyStateAddBtn');
    this.openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
    this.importSampleBtn = document.getElementById('importSampleBtn');
    this.resetSampleBtn = document.getElementById('resetSampleBtn');

    // Task Form Modal
    this.taskModal = document.getElementById('taskModal');
    this.taskForm = document.getElementById('taskForm');
    this.modalTitle = document.getElementById('modalTitle');
    this.taskIdInput = document.getElementById('taskIdInput');
    this.taskTitleInput = document.getElementById('taskTitleInput');
    this.taskCourseInput = document.getElementById('taskCourseInput');
    this.taskCategorySelect = document.getElementById('taskCategorySelect');
    this.taskDeadlineInput = document.getElementById('taskDeadlineInput');
    this.taskPrioritySelect = document.getElementById('taskPrioritySelect');
    this.taskNotesInput = document.getElementById('taskNotesInput');
    this.closeModalBtn = document.getElementById('closeModalBtn');
    this.cancelModalBtn = document.getElementById('cancelModalBtn');
    this.saveBtnText = document.getElementById('saveBtnText');

    // Delete Modal
    this.deleteModal = document.getElementById('deleteModal');
    this.deleteTargetTitle = document.getElementById('deleteTargetTitle');
    this.cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    this.confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    // Toast Container
    this.toastContainer = document.getElementById('toastContainer');
  }

  /**
   * Booting & Inisialisasi awal seluruh komponen aplikasi
   */
  async init() {
    this.initTheme();
    this.startDigitalClock();
    this.loadNotes();
    this.loadTasks();
    this.initEventListeners();

    // Jalankan operasi Asinkron secara paralel untuk data eksternal API riil
    await Promise.allSettled([
      this.fetchCampusWeather(),
      this.fetchInspirationalQuote()
    ]);
  }

  /**
   * --------------------------------------------------------------------------
   * 3. THEME & LOCAL STORAGE SISTEM
   * --------------------------------------------------------------------------
   */
  initTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY_THEME) || 'theme-light';
    document.body.className = savedTheme;
    this.updateThemeIcons(savedTheme);
  }

  toggleTheme = () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'theme-light' : 'theme-dark';
    document.body.className = newTheme;
    localStorage.setItem(this.STORAGE_KEY_THEME, newTheme);
    this.updateThemeIcons(newTheme);
    this.showToast(`Beralih ke mode ${newTheme === 'theme-dark' ? 'gelap' : 'terang'}`, 'info');
  };

  updateThemeIcons(theme) {
    if (theme === 'theme-dark') {
      this.themeIconSun.classList.add('hidden');
      this.themeIconMoon.classList.remove('hidden');
    } else {
      this.themeIconSun.classList.remove('hidden');
      this.themeIconMoon.classList.add('hidden');
    }
  }

  /**
   * Menyimpan array instance tasks ke localStorage dalam bentuk string JSON
   */
  saveTasks() {
    const serialized = JSON.stringify(this.tasks.map(item => item.toJSON()));
    localStorage.setItem(this.STORAGE_KEY_TASKS, serialized);
  }

  /**
   * Membaca array tasks dari localStorage atau inisialisasi contoh tugas ITERA
   */
  loadTasks() {
    const raw = localStorage.getItem(this.STORAGE_KEY_TASKS);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.tasks = parsed.map(obj => TaskItem.fromJSON(obj));
      } catch (err) {
        console.error('Gagal mengurai data tasks dari localStorage:', err);
        this.loadDefaultIteraTasks();
      }
    } else {
      // Inisialisasi data bawaan jika pertama kali dibuka
      this.loadDefaultIteraTasks();
    }
    this.render();
  }

  /**
   * Preset tugas bawaan mahasiswa ITERA (Teknik Informatika)
   */
  loadDefaultIteraTasks() {
    // Generate deadline yang realistis
    const now = new Date();
    
    // Deadline 1: 2 hari lagi jam 23:59
    const d1 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    d1.setHours(23, 59, 0, 0);

    // Deadline 2: 5 hari lagi jam 17:00
    const d2 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    d2.setHours(17, 0, 0, 0);

    // Deadline 3: 1 hari lagi jam 10:00 (Mendesak)
    const d3 = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    d3.setHours(10, 0, 0, 0);

    // Deadline 4: 7 hari lagi jam 15:30
    const d4 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    d4.setHours(15, 30, 0, 0);

    const defaultItems = [
      {
        title: 'Laporan Akhir Praktikum PAW Modul 2 (ES6+ & Async API)',
        course: 'Pengembangan Aplikasi Web (PAW)',
        deadline: d1.toISOString().slice(0, 16),
        priority: 'Tinggi',
        category: 'Praktikum',
        completed: false,
        notes: 'Implementasikan Classes, Destructuring, Spread Operator, dan konsumsi API publik Open-Meteo & DummyJSON.'
      },
      {
        title: 'Tubes Perancangan Basis Data: Relasi Antarmuka Web Toko',
        course: 'Sistem Basis Data (Basdat)',
        deadline: d2.toISOString().slice(0, 16),
        priority: 'Tinggi',
        category: 'Tubes / Proyek',
        completed: false,
        notes: 'Siapkan diagram konseptual ERD dan physical database schema untuk asistensi dengan asisten lab.'
      },
      {
        title: 'Persiapan Kuis Struktur Data: Tree Traversal & Graph',
        course: 'Algoritma & Struktur Data',
        deadline: d3.toISOString().slice(0, 16),
        priority: 'Sedang',
        category: 'Ujian / Kuis',
        completed: false,
        notes: 'Pelajari kembali slide perkuliahan Bab 6 dan latihan studi kasus traversal BFS/DFS.'
      },
      {
        title: 'Rapat Koordinasi Divisi IT HMIF ITERA (Persiapan Informatics Fest)',
        course: 'Himpunan Mahasiswa (HMIF)',
        deadline: d4.toISOString().slice(0, 16),
        priority: 'Rendah',
        category: 'Organisasi / Lainnya',
        completed: true,
        notes: 'Finalisasi jadwal rapat kerja dan pembagian tugas backend pendaftaran lomba.'
      }
    ];

    this.tasks = defaultItems.map(item => new TaskItem(item));
    this.saveTasks();
  }

  /**
   * Manajemen Catatan Cepat (Scratchpad)
   */
  loadNotes() {
    const savedNotes = localStorage.getItem(this.STORAGE_KEY_NOTES) || '';
    this.scratchpadArea.value = savedNotes;
  }

  saveNotes = () => {
    localStorage.setItem(this.STORAGE_KEY_NOTES, this.scratchpadArea.value);
    this.noteSaveStatus.textContent = 'Tersimpan otomatis';
    setTimeout(() => {
      this.noteSaveStatus.textContent = 'Otomatis tersimpan';
    }, 2000);
  };

  clearNotes = () => {
    if (confirm('Bersihkan catatan cepat ini?')) {
      this.scratchpadArea.value = '';
      localStorage.removeItem(this.STORAGE_KEY_NOTES);
      this.showToast('Catatan cepat berhasil dikosongkan', 'info');
    }
  };

  /**
   * --------------------------------------------------------------------------
   * 4. LIVE DIGITAL CLOCK (Waktu Kampus ITERA - WIB)
   * --------------------------------------------------------------------------
   */
  startDigitalClock() {
    const updateTime = () => {
      const now = new Date();
      // Format Jam (HH:mm:ss)
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.liveTimeEl.textContent = `${hours}:${minutes}:${seconds} WIB`;

      // Format Tanggal
      this.liveDateEl.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  /**
   * --------------------------------------------------------------------------
   * 5. ASYNC / AWAIT OPERATIONS DENGAN REAL PUBLIC API
   * --------------------------------------------------------------------------
   */

  /**
   * Async Operation 1: Fetch Cuaca Real-time Kampus ITERA via Open-Meteo
   * Koordinat ITERA Lampung Selatan: Latitude -5.36, Longitude 105.31
   */
  async fetchCampusWeather() {
    const endpoint = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true';
    
    try {
      this.weatherDescEl.textContent = 'Menghubungkan ke satelit cuaca...';
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Destructuring objek respon Open-Meteo
      const { current_weather } = data;
      const { temperature, windspeed, weathercode } = current_weather;

      // Interpretasi Weather Code WMO
      const weatherInfo = this.interpretWeatherCode(weathercode);

      // Render ke DOM
      this.weatherTempEl.textContent = `${Math.round(temperature)}°C`;
      this.weatherDescEl.textContent = weatherInfo.label;
      this.weatherWindEl.textContent = `${windspeed} km/jam`;
      this.weatherStatusEl.textContent = weatherInfo.condition;
      this.adviceTextEl.textContent = weatherInfo.advice;

      // Update Icon SVG
      this.weatherIllustrationEl.innerHTML = weatherInfo.iconSvg;

    } catch (error) {
      console.warn('Gagal memuat cuaca Open-Meteo:', error);
      // Fallback Data Elegan
      this.weatherTempEl.textContent = '29°C';
      this.weatherDescEl.textContent = 'Cerah Berawan (Data Tersimpan)';
      this.weatherWindEl.textContent = '12 km/jam';
      this.weatherStatusEl.textContent = 'Tropis Hangat';
      this.adviceTextEl.textContent = 'Tips: Kampus ITERA cerah berawan, cuaca nyaman untuk beraktivitas.';
    }
  }

  /**
   * Helper: Penerjemah kode cuaca WMO (World Meteorological Organization)
   */
  interpretWeatherCode(code) {
    if (code === 0) {
      return {
        label: 'Langit Cerah Bersih',
        condition: 'Sangat Cerah',
        advice: 'Tips: Cuaca cerah di ITERA, jangan lupa minum air agar tetap terhidrasi di kampus!',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#f59e0b"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      };
    } else if (code >= 1 && code <= 3) {
      return {
        label: 'Cerah Berawan',
        condition: 'Sebagian Berawan',
        advice: 'Tips: Suhu kampus ITERA cukup bersahabat untuk jalan kaki antar gedung kuliah.',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#3b82f6"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`
      };
    } else if (code >= 51 && code <= 67) {
      return {
        label: 'Gerimis / Hujan Ringan',
        condition: 'Hujan Gerimis',
        advice: 'Tips: ITERA sedang hujan ringan, siapkan payung atau jas hujan saat menuju Labtek!',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#0284c7"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>`
      };
    } else if (code >= 80 && code <= 99) {
      return {
        label: 'Hujan Deras / Badai',
        condition: 'Potensi Badai',
        advice: 'Peringatan: Angin kencang dan hujan lebat, hindari berteduh di bawah pohon rindang.',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#6366f1"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`
      };
    } else {
      return {
        label: 'Berawan Rata',
        condition: 'Mendung Teduh',
        advice: 'Tips: Kondisi teduh di Lampung Selatan, cocok untuk belajar di perpustakaan atau gazebo.',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#64748b"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`
      };
    }
  }

  /**
   * Async Operation 2: Fetch Kutipan Inspiratif Harian via DummyJSON Quotes API
   */
  async fetchInspirationalQuote() {
    const endpoint = 'https://dummyjson.com/quotes/random';

    try {
      this.quoteContentEl.innerHTML = `
        <p class="quote-text skeleton-text">&ldquo;Mengambil kata mutiara hari ini...&rdquo;</p>
        <p class="quote-author skeleton-text-sm">&mdash; Server Quotes</p>
      `;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP status: ${res.status}`);

      const data = await res.json();
      
      // Object Destructuring
      const { quote, author } = data;

      // Render menggunakan ES6 Template Literals
      this.quoteContentEl.innerHTML = `
        <p class="quote-text">&ldquo;${quote}&rdquo;</p>
        <p class="quote-author">&mdash; ${author}</p>
      `;
    } catch (err) {
      console.warn('Gagal memuat quote online:', err);
      // Fallback Quote Akademik
      this.quoteContentEl.innerHTML = `
        <p class="quote-text">&ldquo;Disiplin dan konsistensi hari ini adalah pondasi kesuksesan akademik masa depan.&rdquo;</p>
        <p class="quote-author">&mdash; Pepatah Mahasiswa ITERA</p>
      `;
    }
  }

  /**
   * Async Operation 3: Import Contoh Data Tugas Eksternal via JSONPlaceholder API
   * Memenuhi skenario bonus asinkron dan demonstrasi konsumsi endpoint Todos
   */
  async importExternalSampleTasks() {
    const endpoint = 'https://jsonplaceholder.typicode.com/todos?_limit=4';
    
    try {
      this.showToast('Menghubungi JSONPlaceholder API...', 'info');
      const res = await fetch(endpoint);
      
      if (!res.ok) throw new Error('Gagal mengambil data JSONPlaceholder');

      const data = await res.json();

      // Transformasi item eksternal menjadi TaskItem baru menggunakan Arrow Function & Destructuring
      const newTasks = data.map(({ title, completed }, index) => {
        const deadlineDate = new Date(Date.now() + (index + 2) * 24 * 60 * 60 * 1000);
        deadlineDate.setHours(20, 0, 0, 0);

        return new TaskItem({
          title: `[Simulasi API] ${title.charAt(0).toUpperCase() + title.slice(1)}`,
          course: 'Pengembangan Aplikasi Web (PAW)',
          deadline: deadlineDate.toISOString().slice(0, 16),
          priority: index % 2 === 0 ? 'Tinggi' : 'Sedang',
          category: 'Tugas Kuliah',
          completed: completed,
          notes: 'Diimpor otomatis dari JSONPlaceholder API untuk simulasi data tugas cloud.'
        });
      });

      // Update State secara Immutable menggunakan Spread Operator (...)
      this.tasks = [...newTasks, ...this.tasks];
      this.saveTasks();
      this.render();
      this.showToast(`Berhasil mengimpor ${newTasks.length} tugas dari JSONPlaceholder!`, 'success');

    } catch (err) {
      console.error(err);
      this.showToast('Gagal mengimpor tugas dari server eksternal.', 'error');
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 6. POMODORO STUDY TIMER
   * --------------------------------------------------------------------------
   */
  startPomodoro = () => {
    if (this.isPomoRunning) return;
    this.isPomoRunning = true;
    this.pomoStartBtn.disabled = true;
    this.pomoPauseBtn.disabled = false;

    this.pomoInterval = setInterval(() => {
      if (this.pomoRemaining > 0) {
        this.pomoRemaining--;
        this.updatePomodoroDisplay();
      } else {
        clearInterval(this.pomoInterval);
        this.isPomoRunning = false;
        this.pomoStartBtn.disabled = false;
        this.pomoPauseBtn.disabled = true;
        this.showToast('Sesi Pomodoro selesai! Waktunya istirahat sejenak 5 menit.', 'success');
      }
    }, 1000);
  };

  pausePomodoro = () => {
    if (!this.isPomoRunning) return;
    clearInterval(this.pomoInterval);
    this.isPomoRunning = false;
    this.pomoStartBtn.disabled = false;
    this.pomoPauseBtn.disabled = true;
    this.showToast('Timer belajar dijeda.', 'info');
  };

  resetPomodoro = () => {
    clearInterval(this.pomoInterval);
    this.isPomoRunning = false;
    this.pomoRemaining = this.pomoDuration;
    this.pomoStartBtn.disabled = false;
    this.pomoPauseBtn.disabled = true;
    this.updatePomodoroDisplay();
  };

  updatePomodoroDisplay() {
    const mins = Math.floor(this.pomoRemaining / 60);
    const secs = this.pomoRemaining % 60;
    this.pomodoroDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  /**
   * --------------------------------------------------------------------------
   * 7. CRUD LOGIC DENGAN ES6 SPREAD OPERATOR & DESTRUCTURING
   * --------------------------------------------------------------------------
   */

  /**
   * Tambah tugas baru ke state
   */
  addTask(taskData) {
    const newTask = new TaskItem(taskData);
    
    // Immutable array addition using ES6 Spread Operator
    this.tasks = [newTask, ...this.tasks];
    
    this.saveTasks();
    this.render();
    this.showToast('Tugas baru berhasil ditambahkan!', 'success');
  }

  /**
   * Update tugas yang ada berdasarkan ID
   */
  updateTask(id, updatedFields) {
    // Immutable array update using map and spread operator
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return new TaskItem({
          ...task.toJSON(),
          ...updatedFields
        });
      }
      return task;
    });

    this.saveTasks();
    this.render();
    this.showToast('Perubahan tugas berhasil disimpan!', 'success');
  }

  /**
   * Hapus tugas berdasarkan ID
   */
  deleteTask(id) {
    // Immutable array filter using spread operator
    this.tasks = [...this.tasks.filter(task => task.id !== id)];
    this.saveTasks();
    this.render();
    this.showToast('Tugas telah dihapus.', 'info');
  }

  /**
   * Toggle status tugas (Selesai <-> Belum)
   */
  toggleTaskStatus = (id) => {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        const updated = new TaskItem({ ...task.toJSON(), completed: !task.completed });
        return updated;
      }
      return task;
    });

    this.saveTasks();
    this.render();
  };

  /**
   * --------------------------------------------------------------------------
   * 8. FILTERING, SEARCHING & SORTING LOGIC
   * --------------------------------------------------------------------------
   */
  getFilteredTasks() {
    let result = [...this.tasks];

    // 1. Filter Status
    if (this.statusFilter === 'active') {
      result = result.filter(item => !item.completed);
    } else if (this.statusFilter === 'completed') {
      result = result.filter(item => item.completed);
    } else if (this.statusFilter === 'urgent') {
      result = result.filter(item => item.isUrgent);
    }

    // 2. Filter Kategori
    if (this.categoryFilter !== 'all') {
      result = result.filter(item => item.category === this.categoryFilter);
    }

    // 3. Search Bar Query
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.course.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (this.sortBy === 'deadlineAsc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (this.sortBy === 'deadlineDesc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(b.deadline) - new Date(a.deadline);
      } else if (this.sortBy === 'priority') {
        const priorityScore = { 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };
        return (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
      } else if (this.sortBy === 'createdDesc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return result;
  }

  /**
   * --------------------------------------------------------------------------
   * 9. DYNAMIC RENDERING MENGGUNAKAN ES6 TEMPLATE LITERALS
   * --------------------------------------------------------------------------
   */

  /**
   * Render kartu tugas individual dengan Parameter Destructuring
   */
  renderTaskCard = ({
    id,
    title,
    course,
    deadline,
    priority,
    category,
    completed,
    notes,
    formattedDeadline,
    relativeRemaining,
    isOverdue,
    isUrgent
  }) => {
    // Sanitasi teks ringan
    const safeTitle = this.escapeHtml(title);
    const safeCourse = this.escapeHtml(course);
    const safeNotes = this.escapeHtml(notes);

    const completedClass = completed ? 'is-completed' : '';
    const priorityClass = `priority-${priority.toLowerCase()}`;
    const badgePriorityClass = `badge-priority-${priority.toLowerCase()}`;

    // Overdue / Urgent Badge Markup
    let statusBadgeMarkup = '';
    if (isOverdue) {
      statusBadgeMarkup = `<span class="badge badge-overdue">Terlewat</span>`;
    } else if (isUrgent) {
      statusBadgeMarkup = `<span class="badge badge-priority-tinggi">Mendesak</span>`;
    }

    return `
      <article class="task-item-card ${completedClass} ${priorityClass}" data-id="${id}">
        <!-- Custom Checkbox -->
        <div class="task-checkbox-wrap" onclick="window.dashboardApp.toggleTaskStatus('${id}')" title="${completed ? 'Tandai belum selesai' : 'Tandai selesai'}">
          <div class="custom-checkbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        <!-- Task Content Details -->
        <div class="task-details">
          <div class="task-top-row">
            <span class="badge badge-course">${safeCourse}</span>
            <span class="badge badge-category">${category}</span>
            <span class="badge ${badgePriorityClass}">${priority}</span>
            ${statusBadgeMarkup}
          </div>

          <h3 class="task-title">${safeTitle}</h3>

          ${safeNotes ? `<p class="task-notes">${safeNotes}</p>` : ''}

          <div class="task-meta-footer">
            <div class="meta-footer-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>${formattedDeadline}</span>
            </div>

            <div class="meta-footer-item">
              <span class="countdown-badge ${isUrgent || isOverdue ? 'urgent' : ''}">
                ${relativeRemaining}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Edit & Delete) -->
        <div class="task-actions">
          <button class="action-btn edit-btn" onclick="window.dashboardApp.openEditModal('${id}')" title="Edit Tugas" aria-label="Edit Tugas">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="action-btn delete-btn" onclick="window.dashboardApp.openDeleteModal('${id}')" title="Hapus Tugas" aria-label="Hapus Tugas">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </article>
    `;
  };

  /**
   * Render seluruh daftar tugas yang lolos filter
   */
  renderTaskList() {
    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      this.taskListContainer.innerHTML = '';
      this.emptyStateContainer.classList.remove('hidden');
    } else {
      this.emptyStateContainer.classList.add('hidden');
      // ES6 Map & Join dengan Template Literals
      this.taskListContainer.innerHTML = filtered.map(item => this.renderTaskCard(item)).join('');
    }
  }

  /**
   * Render statistik, metrics cards, dan progress bar
   */
  renderMetrics() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const urgent = this.tasks.filter(t => t.isUrgent).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Update Counter Cards
    this.statTotalEl.textContent = total;
    this.statPendingEl.textContent = pending;
    this.statCompletedEl.textContent = completed;
    this.statUrgentEl.textContent = urgent;

    // Update Progress Bar
    this.progressPercentageEl.textContent = `${percentage}%`;
    this.progressBarEl.style.width = `${percentage}%`;

    // Update Tab Counters
    this.countAllEl.textContent = total;
    this.countActiveEl.textContent = pending;
    this.countCompletedEl.textContent = completed;
    this.countUrgentEl.textContent = urgent;
  }

  /**
   * Main Render Trigger
   */
  render() {
    this.renderTaskList();
    this.renderMetrics();
  }

  /**
   * --------------------------------------------------------------------------
   * 10. MODAL HANDLING & FORM VALIDATION
   * --------------------------------------------------------------------------
   */
  openAddModal = () => {
    this.editingTaskId = null;
    this.modalTitle.textContent = 'Tambah Tugas Akademik Baru';
    this.saveBtnText.textContent = 'Simpan Tugas';
    this.taskForm.reset();
    this.taskIdInput.value = '';

    // Set default deadline ke 2 hari dari sekarang pada jam 23:59
    const defaultDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    defaultDate.setHours(23, 59, 0, 0);
    this.taskDeadlineInput.value = defaultDate.toISOString().slice(0, 16);

    this.clearValidationErrors();
    this.taskModal.classList.remove('hidden');
    this.taskTitleInput.focus();
  };

  openEditModal = (id) => {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.editingTaskId = id;
    this.modalTitle.textContent = 'Edit Tugas Akademik';
    this.saveBtnText.textContent = 'Perbarui Tugas';

    this.taskIdInput.value = task.id;
    this.taskTitleInput.value = task.title;
    this.taskCourseInput.value = task.course;
    this.taskCategorySelect.value = task.category;
    this.taskDeadlineInput.value = task.deadline;
    this.taskPrioritySelect.value = task.priority;
    this.taskNotesInput.value = task.notes;

    this.clearValidationErrors();
    this.taskModal.classList.remove('hidden');
    this.taskTitleInput.focus();
  };

  closeModal = () => {
    this.taskModal.classList.add('hidden');
    this.editingTaskId = null;
  };

  clearValidationErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const title = this.taskTitleInput.value.trim();
    const course = this.taskCourseInput.value.trim();
    const category = this.taskCategorySelect.value;
    const deadline = this.taskDeadlineInput.value;
    const priority = this.taskPrioritySelect.value;
    const notes = this.taskNotesInput.value.trim();

    // Validasi Form Interaktif
    let isValid = true;
    this.clearValidationErrors();

    if (title.length < 3) {
      this.taskTitleInput.classList.add('is-invalid');
      isValid = false;
    }

    if (course.length < 2) {
      this.taskCourseInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!deadline) {
      this.taskDeadlineInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) return;

    if (this.editingTaskId) {
      // Update Tugas
      this.updateTask(this.editingTaskId, {
        title,
        course,
        category,
        deadline,
        priority,
        notes
      });
    } else {
      // Tambah Tugas Baru
      this.addTask({
        title,
        course,
        category,
        deadline,
        priority,
        notes
      });
    }

    this.closeModal();
  };

  /**
   * Delete Confirmation Modal
   */
  openDeleteModal = (id) => {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.deletingTaskId = id;
    this.deleteTargetTitle.textContent = `"${task.title}"`;
    this.deleteModal.classList.remove('hidden');
  };

  closeDeleteModal = () => {
    this.deleteModal.classList.add('hidden');
    this.deletingTaskId = null;
  };

  confirmDelete = () => {
    if (this.deletingTaskId) {
      this.deleteTask(this.deletingTaskId);
      this.closeDeleteModal();
    }
  };

  /**
   * --------------------------------------------------------------------------
   * 11. TOAST NOTIFICATION UTILITY
   * --------------------------------------------------------------------------
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * --------------------------------------------------------------------------
   * 12. EVENT LISTENERS SETUP
   * --------------------------------------------------------------------------
   */
  initEventListeners() {
    // Theme Switcher
    this.themeToggleBtn.addEventListener('click', this.toggleTheme);

    // Weather & Quote Refresh
    this.refreshWeatherBtn.addEventListener('click', () => {
      this.fetchCampusWeather();
      this.showToast('Memperbarui data cuaca ITERA...', 'info');
    });

    this.refreshQuoteBtn.addEventListener('click', () => {
      this.fetchInspirationalQuote();
      this.showToast('Mengambil kutipan baru...', 'info');
    });

    // Scratchpad Auto-save
    this.scratchpadArea.addEventListener('input', this.saveNotes);
    this.clearNoteBtn.addEventListener('click', this.clearNotes);

    // Pomodoro Controls
    this.pomoStartBtn.addEventListener('click', this.startPomodoro);
    this.pomoPauseBtn.addEventListener('click', this.pausePomodoro);
    this.pomoResetBtn.addEventListener('click', this.resetPomodoro);

    // Search Input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      if (this.searchQuery.length > 0) {
        this.clearSearchBtn.classList.remove('hidden');
      } else {
        this.clearSearchBtn.classList.add('hidden');
      }
      this.render();
    });

    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearSearchBtn.classList.add('hidden');
      this.render();
    });

    // Status Filter Tabs
    this.statusFilterTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      tab.classList.add('active');

      this.statusFilter = tab.dataset.filter;
      this.render();
    });

    // Category Filter Dropdown
    this.categoryFilterSelect.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.render();
    });

    // Sort Dropdown
    this.sortBySelect.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.render();
    });

    // Modal Triggers
    this.openAddTaskModalBtn.addEventListener('click', this.openAddModal);
    this.emptyStateAddBtn.addEventListener('click', this.openAddModal);
    this.closeModalBtn.addEventListener('click', this.closeModal);
    this.cancelModalBtn.addEventListener('click', this.closeModal);
    this.taskForm.addEventListener('submit', this.handleFormSubmit);

    // Close Modal on Backdrop Click
    this.taskModal.addEventListener('click', (e) => {
      if (e.target === this.taskModal) this.closeModal();
    });

    // Delete Modal Actions
    this.cancelDeleteBtn.addEventListener('click', this.closeDeleteModal);
    this.confirmDeleteBtn.addEventListener('click', this.confirmDelete);
    this.deleteModal.addEventListener('click', (e) => {
      if (e.target === this.deleteModal) this.closeDeleteModal();
    });

    // Import Sample from JSONPlaceholder API
    this.importSampleBtn.addEventListener('click', () => {
      this.importExternalSampleTasks();
    });

    // Reset Default ITERA Presets
    this.resetSampleBtn.addEventListener('click', () => {
      if (confirm('Muat ulang paket tugas contoh ITERA? Data saat ini akan diganti dengan paket standar.')) {
        this.loadDefaultIteraTasks();
        this.render();
        this.showToast('Paket data tugas contoh ITERA berhasil dimuat ulang!', 'success');
      }
    });

    // Keyboard Shortcuts (Esc to close modal)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.taskModal.classList.contains('hidden')) this.closeModal();
        if (!this.deleteModal.classList.contains('hidden')) this.closeDeleteModal();
      }
    });
  }
}

/**
 * ----------------------------------------------------------------------------
 * 13. BOOTSTRAP APLIKASI SAAT DOM SELESAI DIMUAT
 * ----------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  // Buat instance singleton dari DashboardApp
  const app = new DashboardApp();
  window.dashboardApp = app; // Expose ke window untuk callback inline jika diperlukan
  app.init();
});
