/**
 * LATIHAN 3: Array Objek, Method Array & Fitur CRUD Data Mahasiswa
 * Praktikum PAW - Nahli Saud Ramdani (123140049)
 */

// 1. Initial Array Mahasiswa (Minimal 5 Objek)
let dataMahasiswa = [
  { nama: "Nahli Saud Ramdani", nim: "123140049", jurusan: "Teknik Informatika", nilai: 95 },
  { nama: "Ahmad Rizky", nim: "123140001", jurusan: "Teknik Informatika", nilai: 82 },
  { nama: "Budi Santoso", nim: "123140015", jurusan: "Teknik Sipil", nilai: 68 },
  { nama: "Citra Lestari", nim: "123140022", jurusan: "Sistem Informasi", nilai: 88 },
  { nama: "Dewi Anggraini", nim: "123140030", jurusan: "Teknik Elektro", nilai: 74 }
];

document.addEventListener("DOMContentLoaded", () => {
  renderTable(dataMahasiswa);
  updateAnalisis(dataMahasiswa);

  // Form Submit Handler (Create / Update)
  document.getElementById("btnSimpanMhs").addEventListener("click", simpanMahasiswa);
  document.getElementById("btnBatalMhs").addEventListener("click", batalEdit);
});

// Render HTML Table
function renderTable(list) {
  const tbody = document.getElementById("mhsTableBody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: #64748b;">Tidak ada data mahasiswa.</td></tr>`;
    return;
  }

  list.forEach((mhs, index) => {
    // Find original index in dataMahasiswa for edit/delete
    const originalIndex = dataMahasiswa.indexOf(mhs);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${mhs.nim}</strong></td>
      <td>${mhs.nama}</td>
      <td>${mhs.jurusan}</td>
      <td><span style="font-weight:bold; color: ${mhs.nilai >= 70 ? '#10b981' : '#ef4444'}">${mhs.nilai}</span></td>
      <td>
        <button onclick="editMahasiswa(${originalIndex})" class="btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
        <button onclick="hapusMahasiswa(${originalIndex})" class="btn-danger btn-sm"><i class="fa-solid fa-trash"></i> Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Update Ringkasan Analisis (Rata-rata, Jumlah Data)
function updateAnalisis(list) {
  if (list.length === 0) {
    document.getElementById("infoAnalisis").innerText = "Belum ada data mahasiswa untuk dianalisis.";
    return;
  }
  const totalNilai = list.reduce((sum, item) => sum + item.nilai, 0);
  const rataRata = (totalNilai / list.length).toFixed(2);
  document.getElementById("infoAnalisis").innerText = `Total Mahasiswa: ${list.length} | Rata-Rata Nilai: ${rataRata}`;
}

// 2. Cari Mahasiswa Nilai Tertinggi (Method Array reduce)
function cariTertinggi() {
  if (dataMahasiswa.length === 0) return;
  const tertinggi = dataMahasiswa.reduce((prev, current) => (prev.nilai > current.nilai) ? prev : current);
  renderTable([tertinggi]);
  document.getElementById("infoAnalisis").innerText = `Mahasiswa Nilai Tertinggi: ${tertinggi.nama} (NIM: ${tertinggi.nim}) dengan Nilai: ${tertinggi.nilai}`;
}

// 3. Filter Mahasiswa di Atas Rata-rata
function filterDiatasRataRata() {
  if (dataMahasiswa.length === 0) return;
  const totalNilai = dataMahasiswa.reduce((sum, item) => sum + item.nilai, 0);
  const avg = totalNilai / dataMahasiswa.length;
  const filtered = dataMahasiswa.filter(mhs => mhs.nilai > avg);
  
  renderTable(filtered);
  document.getElementById("infoAnalisis").innerText = `Daftar Mahasiswa dengan Nilai di Atas Rata-rata (${avg.toFixed(2)}): ${filtered.length} Orang`;
}

// 4. Urutkan Mahasiswa Berdasarkan Nama (Ascending/Descending)
function urutkanNama(order = 'asc') {
  const sorted = [...dataMahasiswa].sort((a, b) => {
    if (order === 'asc') return a.nama.localeCompare(b.nama);
    return b.nama.localeCompare(a.nama);
  });
  renderTable(sorted);
  document.getElementById("infoAnalisis").innerText = `Data diurutkan berdasarkan Nama (${order.toUpperCase()})`;
}

function tampilkanSemuaMhs() {
  renderTable(dataMahasiswa);
  updateAnalisis(dataMahasiswa);
}

// 5. CRUD: Create & Update
function simpanMahasiswa() {
  const namaInput = document.getElementById("mhsNama").value.trim();
  const nimInput = document.getElementById("mhsNim").value.trim();
  const jurusanInput = document.getElementById("mhsJurusan").value.trim();
  const nilaiInput = parseFloat(document.getElementById("mhsNilai").value);
  const editIndex = parseInt(document.getElementById("editIndex").value);

  if (!namaInput || !nimInput || !jurusanInput || isNaN(nilaiInput)) {
    alert("Harap isi seluruh field data mahasiswa dengan benar!");
    return;
  }

  const objMhs = { nama: namaInput, nim: nimInput, jurusan: jurusanInput, nilai: nilaiInput };

  if (editIndex >= 0) {
    // Update
    dataMahasiswa[editIndex] = objMhs;
    alert("Data mahasiswa berhasil diperbarui!");
  } else {
    // Create
    dataMahasiswa.push(objMhs);
    alert("Mahasiswa baru berhasil ditambahkan!");
  }

  resetForm();
  tampilkanSemuaMhs();
}

function editMahasiswa(index) {
  const mhs = dataMahasiswa[index];
  document.getElementById("mhsNama").value = mhs.nama;
  document.getElementById("mhsNim").value = mhs.nim;
  document.getElementById("mhsJurusan").value = mhs.jurusan;
  document.getElementById("mhsNilai").value = mhs.nilai;
  document.getElementById("editIndex").value = index;

  document.getElementById("formTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Data Mahasiswa: ${mhs.nama}`;
  document.getElementById("btnBatalMhs").style.display = "inline-block";
}

function hapusMahasiswa(index) {
  if (confirm(`Yakin ingin menghapus data mahasiswa "${dataMahasiswa[index].nama}"?`)) {
    dataMahasiswa.splice(index, 1);
    tampilkanSemuaMhs();
  }
}

function batalEdit() {
  resetForm();
}

function resetForm() {
  document.getElementById("mhsNama").value = "";
  document.getElementById("mhsNim").value = "";
  document.getElementById("mhsJurusan").value = "";
  document.getElementById("mhsNilai").value = "";
  document.getElementById("editIndex").value = "-1";

  document.getElementById("formTitle").innerHTML = `<i class="fa-solid fa-user-plus"></i> Form Data Mahasiswa (Create / Update)`;
  document.getElementById("btnBatalMhs").style.display = "none";
}
