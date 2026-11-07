"""
================================================================================
Program      : Program Utama Pengujian Modul Matematika (main.py)
Berkas       : main.py
Deskripsi    : Mengimpor modul kustom math_operations menggunakan berbagai teknik impor
               (aliased module import dan direct selective import), menjalankan seluruh
               fungsi geometri dan konversi suhu dengan ragam data uji, serta menyajikan
               hasil kalkulasi secara elegan dan terstruktur.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 4
Institusi    : Institut Teknologi Sumatera (ITERA)
================================================================================
"""

# ==============================================================================
# PENERAPAN MULTI-TEKNIK IMPOR MODUL (MINIMAL 2 CARA BERBEDA)
# ==============================================================================

# Cara 1: Mengimpor seluruh modul dengan alias (Aliased Module Import)
import math_operations as mo

# Cara 2: Mengimpor fungsi spesifik dan konstanta langsung ke local namespace (Selective Import)
from math_operations import (
    PI,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
    celsius_ke_reamur
)


def cetak_judul_seksi(judul: str) -> None:
    """Mencetak header seksi dengan pembatas garis visual."""
    lebar = 72
    print("\n" + "=" * lebar)
    print(f" {judul.upper():^70} ")
    print("=" * lebar)


def demonstrasikan_geometri_persegi() -> None:
    """Menguji fungsi luas dan keliling persegi menggunakan modul ber-alias (Cara 1)."""
    cetak_judul_seksi("1. Pengujian Geometri: Persegi (Square)")
    daftar_sisi = [4.0, 7.5, 12.0]
    
    print(f"| {'Panjang Sisi (s)':^20} | {'Luas Persegi (s^2)':^22} | {'Keliling Persegi (4s)':^22} |")
    print("|" + "-" * 22 + "|" + "-" * 24 + "|" + "-" * 24 + "|")
    
    for s in daftar_sisi:
        # Pemanggilan via Cara 1 (mo.nama_fungsi)
        luas = mo.luas_persegi(s)
        keliling = mo.keliling_persegi(s)
        print(f"| {s:>18.2f} m | {luas:>19.2f} m2 | {keliling:>19.2f} m |")


def demonstrasikan_geometri_persegi_panjang() -> None:
    """Menguji fungsi luas dan keliling persegi panjang via Cara 1 (mo.*)."""
    cetak_judul_seksi("2. Pengujian Geometri: Persegi Panjang (Rectangle)")
    daftar_dimensi = [
        (6.0, 3.0),
        (10.5, 5.0),
        (20.0, 8.5)
    ]
    
    print(f"| {'Panjang (p)':^14} | {'Lebar (l)':^14} | {'Luas (p x l)':^17} | {'Keliling 2(p+l)':^17} |")
    print("|" + "-" * 16 + "|" + "-" * 16 + "|" + "-" * 19 + "|" + "-" * 19 + "|")
    
    for p, l in daftar_dimensi:
        luas = mo.luas_persegi_panjang(p, l)
        keliling = mo.keliling_persegi_panjang(p, l)
        print(f"| {p:>12.2f} m | {l:>12.2f} m | {luas:>14.2f} m2 | {keliling:>14.2f} m |")


def demonstrasikan_geometri_lingkaran() -> None:
    """Menguji fungsi luas dan keliling lingkaran via Cara 2 (Selective Import)."""
    cetak_judul_seksi("3. Pengujian Geometri: Lingkaran (Circle)")
    print(f"[*] Menggunakan Nilai Konstanta PI Langsung: {PI:.8f}")
    print("-" * 72)
    
    daftar_jari_jari = [3.5, 7.0, 14.0, 21.0]
    
    print(f"| {'Jari-Jari (r)':^18} | {'Luas (PI x r^2)':^24} | {'Keliling (2 x PI x r)':^22} |")
    print("|" + "-" * 20 + "|" + "-" * 26 + "|" + "-" * 24 + "|")
    
    for r in daftar_jari_jari:
        # Pemanggilan via Cara 2 (fungsi diimpor langsung tanpa prefix)
        luas = luas_lingkaran(r)
        keliling = keliling_lingkaran(r)
        print(f"| {r:>16.2f} m | {luas:>21.2f} m2 | {keliling:>19.2f} m |")


def demonstrasikan_geometri_segitiga() -> None:
    """Menguji fungsi geometri segitiga pendukung via Cara 1 (mo.*)."""
    cetak_judul_seksi("4. Pengujian Geometri Tambahan: Segitiga (Triangle)")
    contoh_segitiga = [
        {"alas": 6.0, "tinggi": 8.0, "sisi_a": 6.0, "sisi_b": 8.0, "sisi_c": 10.0},
        {"alas": 12.0, "tinggi": 9.0, "sisi_a": 12.0, "sisi_b": 10.0, "sisi_c": 10.0},
    ]
    
    for idx, tri in enumerate(contoh_segitiga, start=1):
        luas = mo.luas_segitiga(tri["alas"], tri["tinggi"])
        keliling = mo.keliling_segitiga(tri["sisi_a"], tri["sisi_b"], tri["sisi_c"])
        print(f"  Kasus #{idx}: Alas={tri['alas']} m, Tinggi={tri['tinggi']} m, Sisi=({tri['sisi_a']}, {tri['sisi_b']}, {tri['sisi_c']})")
        print(f"           -> Luas Segitiga     : {luas:.2f} m2")
        print(f"           -> Keliling Segitiga : {keliling:.2f} m\n")


def demonstrasikan_konversi_suhu() -> None:
    """Menguji fungsi-fungsi konversi temperatur suhu."""
    cetak_judul_seksi("5. Pengujian Konversi Temperatur Suhu")
    
    sampel_celsius = [
        (-40.0, "Titik Temu Suhu Dingin Ekstrem"),
        (0.0, "Titik Beku Air Murni"),
        (27.0, "Suhu Rata-rata Kampus ITERA"),
        (37.0, "Suhu Normal Tubuh Manusia"),
        (100.0, "Titik Didih Air Murni"),
    ]
    
    print(f"| {'Celsius':^10} | {'Fahrenheit':^13} | {'Kelvin':^13} | {'Reamur':^11} | {'Kondisi Fenomena':<22} |")
    print("|" + "-" * 12 + "|" + "-" * 15 + "|" + "-" * 15 + "|" + "-" * 13 + "|" + "-" * 24 + "|")
    
    for c, label in sampel_celsius:
        # Gabungan Cara 1 dan Cara 2
        f = celsius_ke_fahrenheit(c)
        k = celsius_ke_kelvin(c)
        r = celsius_ke_reamur(c)
        print(f"| {c:>8.1f} C | {f:>10.2f} F | {k:>10.2f} K | {r:>8.2f} R | {label:<22} |")


def demonstrasikan_error_handling() -> None:
    """Menguji penanganan input negatif / tidak valid (Robustness)."""
    cetak_judul_seksi("6. Pengujian Robustness: Pencegahan Nilai Negatif")
    
    print("[*] Menguji validasi sisi negatif pada luas_persegi(-5.0):")
    try:
        mo.luas_persegi(-5.0)
    except ValueError as e:
        print(f"    [SUKSES DITANGANI] ValueError tertangkap: {e}")
        
    print("[*] Menguji validasi jari-jari negatif pada luas_lingkaran(-10.0):")
    try:
        luas_lingkaran(-10.0)
    except ValueError as e:
        print(f"    [SUKSES DITANGANI] ValueError tertangkap: {e}")

    print("[*] Menguji suhu di bawah nol mutlak pada celsius_ke_kelvin(-300.0):")
    try:
        celsius_ke_kelvin(-300.0)
    except ValueError as e:
        print(f"    [SUKSES DITANGANI] ValueError tertangkap: {e}")


def main() -> None:
    """Fungsi utama program pengujian modul matematika."""
    print("*" * 72)
    print("      PRAKTIKUM PEMROGRAMAN WEB (PAW) - PERTEMUAN 4 (PYTHON DASAR)       ")
    print("           PROGRAM PENGUJIAN MODUL MATEMATIKA: math_operations          ")
    print("*" * 72)
    print(" Pengembang : Nahli Saud Ramdani (NIM: 123140049)")
    print(" Institusi  : Institut Teknologi Sumatera (ITERA)")
    print(" Teknik Impor yang Digunakan:")
    print("   1. 'import math_operations as mo'         (Aliased Module Import)")
    print("   2. 'from math_operations import PI, ...'  (Selective Function Import)")
    
    # Jalankan seluruh rangkaian demonstrasi
    demonstrasikan_geometri_persegi()
    demonstrasikan_geometri_persegi_panjang()
    demonstrasikan_geometri_lingkaran()
    demonstrasikan_geometri_segitiga()
    demonstrasikan_konversi_suhu()
    demonstrasikan_error_handling()
    
    print("\n" + "=" * 72)
    print(" [SELESAI] Seluruh fungsi modul math_operations telah berhasil diuji! ")
    print("=" * 72 + "\n")


if __name__ == "__main__":
    main()

