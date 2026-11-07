"""
================================================================================
Program      : Pengelolaan dan Analisis Data Nilai Mahasiswa
Berkas       : tugas2_nilai_mahasiswa.py
Deskripsi    : Mengelola data mahasiswa menggunakan struktur data List of Dictionaries,
               menghitung Nilai Akhir dengan pembobotan (30% UTS + 40% UAS + 30% Tugas),
               mengklasifikasikan Grade akademik (A - E), menyajikan tabel terformat,
               serta menemukan mahasiswa dengan nilai tertinggi dan terendah.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 4
Institusi    : Institut Teknologi Sumatera (ITERA)
================================================================================
"""

from typing import List, Dict, Any, Tuple


# ==============================================================================
# 1. DEFINISI DATASET MAHASISWA (MINIMAL 5 DATA MAHASISWA)
# ==============================================================================
DAFTAR_MAHASISWA: List[Dict[str, Any]] = [
    {
        "nama": "Nahli Saud Ramdani",
        "nim": "123140049",
        "nilai_uts": 92.0,
        "nilai_uas": 95.0,
        "nilai_tugas": 90.0,
    },
    {
        "nama": "Ahmad Fadhilah",
        "nim": "121140001",
        "nilai_uts": 82.5,
        "nilai_uas": 86.0,
        "nilai_tugas": 80.0,
    },
    {
        "nama": "Budi Santoso",
        "nim": "122140015",
        "nilai_uts": 72.0,
        "nilai_uas": 78.0,
        "nilai_tugas": 74.0,
    },
    {
        "nama": "Siti Nurhaliza",
        "nim": "122140032",
        "nilai_uts": 64.0,
        "nilai_uas": 68.0,
        "nilai_tugas": 65.0,
    },
    {
        "nama": "Rizky Ramadhan",
        "nim": "123140021",
        "nilai_uts": 54.0,
        "nilai_uas": 58.0,
        "nilai_tugas": 55.0,
    },
    {
        "nama": "Dewi Lestari",
        "nim": "123140078",
        "nilai_uts": 42.0,
        "nilai_uas": 45.0,
        "nilai_tugas": 48.0,
    },
    {
        "nama": "Eko Prasetyo",
        "nim": "122140090",
        "nilai_uts": 88.0,
        "nilai_uas": 82.0,
        "nilai_tugas": 85.0,
    },
]


# ==============================================================================
# 2. FUNGSI LOGIKA PERHITUNGAN & KLASIFIKASI
# ==============================================================================
def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir mahasiswa berdasarkan formula pembobotan:
    Nilai Akhir = (30% * UTS) + (40% * UAS) + (30% * Tugas)
    
    Parameter:
        uts (float)   : Nilai Ujian Tengah Semester (0 - 100)
        uas (float)   : Nilai Ujian Akhir Semester (0 - 100)
        tugas (float) : Nilai Kumulatif Tugas (0 - 100)
        
    Return:
        float: Nilai akhir terbobot
    """
    bobot_uts = 0.30
    bobot_uas = 0.40
    bobot_tugas = 0.30
    return (bobot_uts * uts) + (bobot_uas * uas) + (bobot_tugas * tugas)


def tentukan_grade(nilai_akhir: float) -> Tuple[str, str]:
    """
    Mengonversi nilai akhir menjadi predikat Grade huruf dan status kelulusan.
    
    Kriteria:
        - A : Nilai akhir >= 80.0
        - B : 70.0 <= Nilai akhir < 80.0
        - C : 60.0 <= Nilai akhir < 70.0
        - D : 50.0 <= Nilai akhir < 60.0
        - E : Nilai akhir < 50.0
        
    Parameter:
        nilai_akhir (float): Nilai akhir terbobot
        
    Return:
        Tuple[str, str]: (Huruf Grade, Status Keterangan Kelulusan)
    """
    if nilai_akhir >= 80.0:
        return "A", "Lulus (Sangat Memuaskan)"
    elif nilai_akhir >= 70.0:
        return "B", "Lulus (Memuaskan)"
    elif nilai_akhir >= 60.0:
        return "C", "Lulus (Cukup)"
    elif nilai_akhir >= 50.0:
        return "D", "Lulus Bersyarat (Kurang)"
    else:
        return "E", "Tidak Lulus (Gagal)"


def proses_data_mahasiswa(daftar_raw: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Menghitung nilai akhir dan menentukan grade untuk setiap mahasiswa.
    Menghasilkan list baru berisi dictionary lengkap tanpa memutasi data asli secara destruktif.
    """
    data_terproses: List[Dict[str, Any]] = []
    
    for mhs in daftar_raw:
        akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        grade, status = tentukan_grade(akhir)
        
        entri_lengkap = {
            "nama": mhs["nama"],
            "nim": mhs["nim"],
            "nilai_uts": mhs["nilai_uts"],
            "nilai_uas": mhs["nilai_uas"],
            "nilai_tugas": mhs["nilai_tugas"],
            "nilai_akhir": akhir,
            "grade": grade,
            "status": status,
        }
        data_terproses.append(entri_lengkap)
        
    return data_terproses


def cari_nilai_ekstrem(daftar_data: List[Dict[str, Any]]) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """
    Mencari mahasiswa dengan nilai akhir tertinggi dan nilai akhir terendah.
    
    Parameter:
        daftar_data (List[Dict[str, Any]]): List mahasiswa yang sudah dihitung nilai akhirnya.
        
    Return:
        Tuple[Dict[str, Any], Dict[str, Any]]: (Mahasiswa Tertinggi, Mahasiswa Terendah)
    """
    mahasiswa_tertinggi = max(daftar_data, key=lambda m: m["nilai_akhir"])
    mahasiswa_terendah = min(daftar_data, key=lambda m: m["nilai_akhir"])
    return mahasiswa_tertinggi, mahasiswa_terendah


# ==============================================================================
# 3. FUNGSI PENYAJIAN TABEL DAN STATISTIK
# ==============================================================================
def cetak_tabel_mahasiswa(daftar_data: List[Dict[str, Any]]) -> None:
    """
    Menampilkan data seluruh mahasiswa dalam bentuk tabel berformat rapi di konsol terminal.
    """
    print("\n" + "=" * 90)
    print("                     DAFTAR REKAPITULASI NILAI AKADEMIK MAHASISWA                 ")
    print("                      PROGRAM STUDI TEKNIK INFORMATIKA - ITERA                    ")
    print("=" * 90)
    
    # Header Tabel
    print(f"| {'No':^3} | {'NIM':^11} | {'Nama Mahasiswa':<22} | {'UTS':^6} | {'UAS':^6} | {'Tugas':^6} | {'Akhir':^7} | {'Grade':^5} |")
    print("|" + "-" * 5 + "|" + "-" * 13 + "|" + "-" * 24 + "|" + "-" * 8 + "|" + "-" * 8 + "|" + "-" * 8 + "|" + "-" * 9 + "|" + "-" * 7 + "|")
    
    # Isi Baris Data
    for no, m in enumerate(daftar_data, start=1):
        print(
            f"| {no:^3} "
            f"| {m['nim']:^11} "
            f"| {m['nama']:<22} "
            f"| {m['nilai_uts']:>6.1f} "
            f"| {m['nilai_uas']:>6.1f} "
            f"| {m['nilai_tugas']:>6.1f} "
            f"| {m['nilai_akhir']:>7.2f} "
            f"|   {m['grade']:^3} |"
        )
        
    print("=" * 90)


def cetak_sorotan_ekstrem(tertinggi: Dict[str, Any], terendah: Dict[str, Any]) -> None:
    """
    Mencetak kartu informasi khusus mahasiswa dengan nilai tertinggi dan terendah.
    """
    print("\n--- INFORMASI CAPAIAN EKSTREM NILAI AKHIR ---")
    
    print("\n[+] MAHASISWA DENGAN NILAI AKHIR TERTINGGI (TOP PERFORMER):")
    print(f"    - Nama Lengkap : {tertinggi['nama']}")
    print(f"    - NIM          : {tertinggi['nim']}")
    print(f"    - Nilai Akhir  : {tertinggi['nilai_akhir']:.2f}")
    print(f"    - Grade        : {tertinggi['grade']} ({tertinggi['status']})")
    print(f"    - Rincian      : UTS={tertinggi['nilai_uts']}, UAS={tertinggi['nilai_uas']}, Tugas={tertinggi['nilai_tugas']}")
    
    print("\n[-] MAHASISWA DENGAN NILAI AKHIR TERENDAH:")
    print(f"    - Nama Lengkap : {terendah['nama']}")
    print(f"    - NIM          : {terendah['nim']}")
    print(f"    - Nilai Akhir  : {terendah['nilai_akhir']:.2f}")
    print(f"    - Grade        : {terendah['grade']} ({terendah['status']})")
    print(f"    - Rincian      : UTS={terendah['nilai_uts']}, UAS={terendah['nilai_uas']}, Tugas={terendah['nilai_tugas']}")


def cetak_ringkasan_statistik(daftar_data: List[Dict[str, Any]]) -> None:
    """
    Menghitung dan mencetak ringkasan distribusi grade dan rata-rata kelas.
    """
    total_mhs = len(daftar_data)
    semua_nilai = [m["nilai_akhir"] for m in daftar_data]
    rata_rata = sum(semua_nilai) / total_mhs if total_mhs > 0 else 0.0
    
    distribusi_grade: Dict[str, int] = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0}
    for m in daftar_data:
        distribusi_grade[m["grade"]] += 1
        
    jumlah_lulus = sum(1 for m in daftar_data if m["grade"] in ("A", "B", "C", "D"))
    persentase_kelulusan = (jumlah_lulus / total_mhs) * 100 if total_mhs > 0 else 0.0
    
    print("\n" + "-" * 62)
    print("                    STATISTIK KELAS                      ")
    print("-" * 62)
    print(f" Jumlah Mahasiswa Terdaftar : {total_mhs} orang")
    print(f" Rata-rata Nilai Akhir      : {rata_rata:.2f}")
    print(f" Distribusi Perolehan Grade : " + ", ".join([f"Grade {k}: {v}" for k, v in distribusi_grade.items()]))
    print(f" Tingkat Kelulusan (A-D)    : {persentase_kelulusan:.1f}% ({jumlah_lulus}/{total_mhs} mahasiswa)")
    print("-" * 62)


# ==============================================================================
# 4. FUNGSI EKSEKUSI UTAMA (ENTRY POINT)
# ==============================================================================
def main() -> None:
    """
    Titik masuk utama eksekusi program.
    """
    # 1. Proses kalkulasi nilai akhir dan grade
    data_hasil = proses_data_mahasiswa(DAFTAR_MAHASISWA)
    
    # 2. Tampilkan tabel komprehensif
    cetak_tabel_mahasiswa(data_hasil)
    
    # 3. Cari dan tampilkan nilai tertinggi serta terendah
    tertinggi, terendah = cari_nilai_ekstrem(data_hasil)
    cetak_sorotan_ekstrem(tertinggi, terendah)
    
    # 4. Tampilkan wawasan statistik kelas
    cetak_ringkasan_statistik(data_hasil)


if __name__ == "__main__":
    main()

