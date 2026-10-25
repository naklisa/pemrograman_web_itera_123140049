# Latihan Modul Praktikum PAW - Pertemuan 3
## React Fundamentals: Komponen, Props, Hooks, Router, Custom Hooks & Context API

**Data Mahasiswa:**
- **Nama** : Nahli Saud Ramdani
- **NIM** : 123140049
- **Kelas Praktikum** : RA
- **Program Studi** : Teknik Informatika
- **Institusi** : Institut Teknologi Sumatera (ITERA)

---

### Ringkasan Pengerjaan Modul

Proyek ini merupakan implementasi menyeluruh dari materi praktikum **Modul 3 Pemrograman Aplikasi Web (PAW)** yang mencakup 6 submodul inti dan penyelesaian seluruh **Latihan Mandiri**:

```
Modul/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/ (Header.jsx & Header.css)
│   │   ├── TaskItem/ (TaskItem.jsx & TaskItem.css)
│   │   ├── TaskForm/ (TaskForm.jsx & TaskForm.css)
│   │   ├── Navbar/ (Navbar.jsx & Navbar.css)
│   │   └── Card/ (Card.jsx & Card.css) -> [Latihan Mandiri 2: Children Props]
│   ├── pages/
│   │   ├── Home/ (Home.jsx & Home.css) -> [Latihan Mandiri 3 & 5]
│   │   ├── About/ (About.jsx & About.css) -> [Latihan Mandiri 6]
│   │   └── NotFound/ (NotFound.jsx & NotFound.css) -> [Latihan Mandiri 4: Rute 404]
│   ├── hooks/
│   │   ├── useLocalStorage.js -> [Submodul 5]
│   │   └── useWindowSize.js -> [Submodul 5 & Latihan Mandiri 5]
│   ├── context/
│   │   └── TaskContext.jsx -> [Submodul 6: Context API Global State]
│   ├── App.jsx
│   ├── App.css -> [Latihan Mandiri 1: HMR Header Color]
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

### Pemetaan Implementasi Submodul & Latihan Mandiri

#### 1. Submodul 1: Setup Project React & HMR Exploration
- **Deskripsi**: Inisialisasi workspace React modern berbasis Vite, pembersihan template bawaan, dan penyusunan struktur folder modular (`components`, `pages`, `hooks`, `context`).
- **Latihan Mandiri 1 (HMR)**:
  - Mengubah properti `background-color` pada selector `.App-header` di `src/App.css` menjadi warna `#0d9488` (Teal).
  - Mengamati mekanisme Hot Module Replacement (HMR) yang memperbarui tampilan peramban secara instan tanpa melakukan full-page reload.

#### 2. Submodul 2: Components & Props
- **Header (`src/components/Header/Header.jsx`)**: Menerima props `title` dan evaluasi short-circuit `description && <p>{description}</p>`.
- **TaskItem (`src/components/TaskItem/TaskItem.jsx`)**: Merender baris tugas dengan controlled checkbox untuk `onToggleComplete(task.id)` dan tombol `onDelete(task.id)`. Dilengkapi skema validasi `PropTypes`.
- **TaskForm (`src/components/TaskForm/TaskForm.jsx`)**: Controlled component dengan state lokal `title`, validasi input kosong, pembuatan objek `id: Date.now()`, dan reset state form pasca submit.
- **Latihan Mandiri 2 (Children Props)**:
  - Membuat komponen `src/components/Card/Card.jsx` yang membungkus konten dinamis menggunakan `props.children`.
  - Menggunakan komponen `Card` di `Home.jsx` untuk membungkus form `TaskForm` dengan bingkai kartu yang rapi.

#### 3. Submodul 3: State Management & Hooks (`useState` & `useEffect`)
- Mengelola state utama `tasks` menggunakan `useState([])`.
- Menggunakan `useEffect` untuk memulihkan data tugas dari `localStorage` saat mount awal dan otomatis menyinkronkan array `tasks` ke `localStorage` setiap kali terjadi mutasi state.
- Mempertahankan prinsip immutability melalui spread operator `[...tasks, newTask]` dan array method `filter()` serta `map()`.
- **Latihan Mandiri 3 (Tombol Bersihkan Semua)**:
  - Menambahkan tombol "Hapus Semua Tugas" di samping panel statistik pada `src/pages/Home/Home.jsx`.
  - Mengonfirmasi aksi pengguna menggunakan dialog `window.confirm('Apakah Anda yakin ingin menghapus seluruh tugas yang tersimpan?')` sebelum mengosongkan state tugas.

#### 4. Submodul 4: Routing dengan React Router
- Membungkus pohon aplikasi menggunakan `BrowserRouter`, `Routes`, dan `Route` dari `react-router-dom`.
- Menghubungkan navigasi SPA instan melalui komponen `Navbar` dan `Link` / `NavLink` ke path `/` (Beranda) dan `/about` (Tentang).
- **Latihan Mandiri 4 (Halaman 404 Not Found)**:
  - Membuat komponen `src/pages/NotFound/NotFound.jsx` dengan kode status 404, pesan informatif, dan tombol kembali ke beranda.
  - Mendaftarkan rute penangkap fallback `<Route path="*" element={<NotFound />} />` di `App.jsx`.

#### 5. Submodul 5: Pembuatan Custom Hook
- **`useLocalStorage.js`**:
  - Mengabstraksi boilerplate `useState` dan `useEffect` penyimpanan lokal.
  - Menggunakan lazy state initialization function `useState(() => { ... })` dengan penanganan error JSON parsing.
- **`useWindowSize.js`**:
  - Mendengarkan event `resize` pada objek global `window` dengan SSR-safe fallback.
  - Mendaftarkan cleanup function `removeEventListener` untuk mencegah memory leak.
- **Latihan Mandiri 5 (Deteksi Layar Responsif)**:
  - Mengonsumsi `useWindowSize()` di `Home.jsx`.
  - Menampilkan badge dinamis: jika `width < 768px` menampilkan badge `"📱 Mode Layar Mobile"`, jika tidak menampilkan `"💻 Mode Layar Desktop"` beserta ukuran piksel riil.

#### 6. Submodul 6: Global State dengan Context API
- **`TaskContext.jsx`**:
  - Membuat `TaskContext` dan provider `TaskProvider`.
  - Mengenkapsulasi seluruh state tugas dan fungsi mutasi (`addTask`, `deleteTask`, `toggleComplete`, `clearAllTasks`, dan objek `stats`).
  - Menyediakan custom consumer hook `useTasks()` yang melempar error deskriptif jika dipanggil di luar cakupan Provider.
- **Latihan Mandiri 6 (Statistik di Halaman About)**:
  - Mengimpor `useTasks()` pada `src/pages/About/About.jsx`.
  - Menampilkan ringkasan data tugas: *"Saat ini Anda memiliki total [stats.total] tugas yang tersimpan di sistem."* beserta rincian tugas selesai, belum selesai, dan tingkat penyelesaian (%).

---

### Cara Menjalankan Modul Latihan

1. Buka terminal dan masuk ke direktori `Modul`:
   ```bash
   cd "d:\S7.1\MKS7\Praktikum PAW\NahliSaudRamdani_123140049_pertemuan3\Modul"
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka peramban pada alamat lokal yang tertera (biasanya `http://localhost:3000` atau `http://localhost:5173`).
