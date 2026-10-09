/**
 * LATIHAN 1: Dasar JavaScript & Kontrol Alur
 * Praktikum PAW - Nahli Saud Ramdani (123140049)
 */

// 1. Variabel Data Diri (const dan let)
const nama = "Nahli Saud Ramdani";
const nim = "123140049";
let umur = 20;
let kotaAsal = "Bandar Lampung";

console.log("=== DATA DIRI ===");
console.log(`Nama      : ${nama}`);
console.log(`NIM       : ${nim}`);
console.log(`Umur      : ${umur} tahun`);
console.log(`Kota Asal : ${kotaAsal}`);

// 2. Program Pengecekan Kelulusan (Nilai >= 70)
function cekKelulusan(nilai) {
  if (nilai >= 70) {
    return `Nilai ${nilai}: LULUS ✅`;
  } else {
    return `Nilai ${nilai}: TIDAK LULUS ❌`;
  }
}

// 3. Program Kategori Umur
function cekKategoriUmur(u) {
  if (u < 12) {
    return `Umur ${u} tahun: Kategori Anak-anak 👶`;
  } else if (u >= 12 && u <= 17) {
    return `Umur ${u} tahun: Kategori Remaja 🧒`;
  } else if (u >= 18 && u <= 59) {
    return `Umur ${u} tahun: Kategori Dewasa 👨‍💼`;
  } else {
    return `Umur ${u} tahun: Kategori Lansia 👴`;
  }
}

// 4. Switch-case Konversi Angka Hari (1-7) ke Nama Hari Bahasa Inggris
function konversiHari(angkaHari) {
  let namaHari;
  switch (parseInt(angkaHari)) {
    case 1:
      namaHari = "Monday";
      break;
    case 2:
      namaHari = "Tuesday";
      break;
    case 3:
      namaHari = "Wednesday";
      break;
    case 4:
      namaHari = "Thursday";
      break;
    case 5:
      namaHari = "Friday";
      break;
    case 6:
      namaHari = "Saturday";
      break;
    case 7:
      namaHari = "Sunday";
      break;
    default:
      namaHari = "Invalid day number! Must be between 1 and 7.";
  }
  return namaHari;
}

// 5. Kalkulator Grade Nilai dengan Ternary Operator
function hitungGradeTernary(nilai) {
  const n = Number(nilai);
  const grade = n >= 85 ? "A" :
                n >= 75 ? "B" :
                n >= 65 ? "C" :
                n >= 50 ? "D" : "E";
  return `Nilai ${n} mendapatkan Grade: ${grade}`;
}

// UI Handlers
document.addEventListener("DOMContentLoaded", () => {
  const containerDataDiri = document.getElementById("dataDiriResult");
  if (containerDataDiri) {
    containerDataDiri.innerText = `Nama      : ${nama}\nNIM       : ${nim}\nUmur      : ${umur} tahun\nKota Asal : ${kotaAsal}`;
  }

  cekKelulusanUI();
  cekKategoriUmurUI();
  konversiHariUI();
  hitungGradeTernaryUI();
});

function cekKelulusanUI() {
  const val = document.getElementById("nilaiLulus").value;
  document.getElementById("kelulusanResult").innerText = cekKelulusan(Number(val));
}

function cekKategoriUmurUI() {
  const val = document.getElementById("inputUmur").value;
  document.getElementById("kategoriUmurResult").innerText = cekKategoriUmur(Number(val));
}

function konversiHariUI() {
  const val = document.getElementById("inputHari").value;
  document.getElementById("konversiHariResult").innerText = `Day ${val} = ${konversiHari(val)}`;
}

function hitungGradeTernaryUI() {
  const val = document.getElementById("inputGradeNilai").value;
  document.getElementById("gradeTernaryResult").innerText = hitungGradeTernary(val);
}
