/**
 * LATIHAN 2: Perulangan, Fungsi & Event Handler
 * Praktikum PAW - Nahli Saud Ramdani (123140049)
 */

// 1. Loop Tabel Perkalian (1 s/d 10)
function cetakTabelPerkalian(angka) {
  let output = `Tabel Perkalian untuk Angka ${angka}:\n`;
  output += `-------------------------------\n`;
  for (let i = 1; i <= 10; i++) {
    output += `${angka} x ${i} = ${angka * i}\n`;
  }
  return output;
}

// 2. Fungsi Hitung Faktorial
function hitungFaktorial(n) {
  if (n < 0) return "Faktorial tidak terdefinisi untuk angka negatif.";
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

// 3. Fungsi Cek Bilangan Prima
function cekPrima(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// 4. Kalkulator BMI & Event Handler
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  if (tinggiM <= 0 || beratKg <= 0) return { bmi: 0, kategori: "Input tidak valid" };

  const bmi = beratKg / (tinggiM * tinggiM);
  let kategori = "";

  if (bmi < 18.5) {
    kategori = "Kekurangan Berat Badan (Kurus) ⚠️";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    kategori = "Berat Badan Normal (Ideal) ✅";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    kategori = "Kelebihan Berat Badan (Gemuk) ⚠️";
  } else {
    kategori = "Obesitas 🚨";
  }

  return { bmi: bmi.toFixed(2), kategori };
}

// 5. Program FizzBuzz (1 - 100)
function runFizzBuzz() {
  let list = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      list.push(`${i}: FizzBuzz ⚡`);
    } else if (i % 3 === 0) {
      list.push(`${i}: Fizz`);
    } else if (i % 5 === 0) {
      list.push(`${i}: Buzz`);
    } else {
      list.push(`${i}`);
    }
  }
  return list.join("\n");
}

// UI Triggers
document.addEventListener("DOMContentLoaded", () => {
  tampilkanPerkalianUI();
  hitungFaktorialUI();
  cekPrimaUI();
  jalankanFizzBuzzUI();

  const btnBMI = document.getElementById("btnHitungBMI");
  if (btnBMI) {
    btnBMI.addEventListener("click", () => {
      const b = parseFloat(document.getElementById("beratBMI").value);
      const t = parseFloat(document.getElementById("tinggiBMI").value);
      const res = hitungBMI(b, t);
      document.getElementById("bmiResult").innerText = `Skor BMI : ${res.bmi}\nKategori : ${res.kategori}`;
    });
    // Trigger initial calculation
    btnBMI.click();
  }
});

function tampilkanPerkalianUI() {
  const val = parseInt(document.getElementById("angkaPerkalian").value) || 1;
  document.getElementById("perkalianResult").innerText = cetakTabelPerkalian(val);
}

function hitungFaktorialUI() {
  const val = parseInt(document.getElementById("angkaFaktorial").value) || 0;
  const res = hitungFaktorial(val);
  document.getElementById("faktorialResult").innerText = `${val}! = ${res}`;
}

function cekPrimaUI() {
  const val = parseInt(document.getElementById("angkaPrima").value) || 1;
  const isP = cekPrima(val);
  document.getElementById("primaResult").innerText = `Angka ${val} adalah ${isP ? "BILANGAN PRIMA ✅" : "Bukan Bilangan Prima ❌"}`;
}

function jalankanFizzBuzzUI() {
  document.getElementById("fizzbuzzResult").innerText = runFizzBuzz();
}
