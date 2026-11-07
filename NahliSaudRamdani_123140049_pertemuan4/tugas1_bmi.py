"""
================================================================================
Program      : Program Penghitung BMI (Body Mass Index) Sederhana
Berkas       : tugas1_bmi.py
Deskripsi    : Menghitung indeks massa tubuh (BMI) berdasarkan berat dan tinggi badan,
               kemudian mengklasifikasikan status gizi menggunakan percabangan if-elif-else.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 4
Institusi    : Institut Teknologi Sumatera (ITERA)
================================================================================
"""

def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung nilai Body Mass Index (BMI).
    
    Parameter:
        berat (float): Berat badan dalam satuan kilogram (kg).
        tinggi (float): Tinggi badan dalam satuan meter (m).
        
    Return:
        float: Nilai skor BMI.
    """
    if tinggi <= 0:
        raise ValueError("Tinggi badan harus bernilai positif lebih dari 0!")
    return berat / (tinggi ** 2)


def tentukan_kategori_bmi(bmi: float) -> tuple[str, str]:
    """
    Menentukan kategori status gizi berdasarkan nilai BMI sesuai standar WHO.
    
    Kriteria:
        - BMI < 18.5          : Berat badan kurang
        - 18.5 <= BMI < 25.0  : Berat badan normal
        - 25.0 <= BMI < 30.0  : Berat badan berlebih
        - BMI >= 30.0         : Obesitas
        
    Parameter:
        bmi (float): Nilai skor Body Mass Index.
        
    Return:
        tuple[str, str]: (Kategori status berat badan, Rekomendasi kesehatan).
    """
    if bmi < 18.5:
        kategori = "Berat badan kurang"
        rekomendasi = "Perbanyak asupan gizi seimbang dan konsultasikan diet tinggi kalori sehat."
    elif 18.5 <= bmi < 25.0:
        kategori = "Berat badan normal"
        rekomendasi = "Pertahankan pola makan bergizi seimbang dan olahraga teratur."
    elif 25.0 <= bmi < 30.0:
        kategori = "Berat badan berlebih"
        rekomendasi = "Tingkatkan intensitas aktivitas fisik dan kurangi konsumsi gula/lemak jenuh."
    else:
        kategori = "Obesitas"
        rekomendasi = "Sangat dianjurkan untuk konsultasi dengan dokter/ahli gizi dan mulai program penurunan berat badan."
        
    return kategori, rekomendasi


def cetak_kartu_hasil(nama: str, berat: float, tinggi: float, bmi: float, kategori: str, rekomendasi: str) -> None:
    """
    Mencetak kartu hasil kalkulasi BMI dengan tata letak rapi ke konsol.
    """
    lebar = 62
    garis_ganda = "=" * lebar
    garis_tunggal = "-" * lebar
    
    print("\n" + garis_ganda)
    print("        HASIL ANALISIS BODY MASS INDEX (BMI) - ITERA         ")
    print(garis_ganda)
    print(f" Nama Individu     : {nama}")
    print(f" Berat Badan       : {berat:.2f} kg")
    print(f" Tinggi Badan      : {tinggi:.2f} m ({tinggi * 100:.1f} cm)")
    print(garis_tunggal)
    print(f" Skor Indeks (BMI) : {bmi:.2f}")
    print(f" Kategori Status   : [ {kategori.upper()} ]")
    print(garis_tunggal)
    print(f" Rekomendasi       : {rekomendasi}")
    print(garis_ganda)


def main() -> None:
    """
    Fungsi utama program penghitung BMI dengan dukungan input interaktif.
    """
    print("=" * 62)
    print("   PROGRAM KALKULATOR BODY MASS INDEX (BMI) MAHASISWA ITERA   ")
    print("=" * 62)
    print("Silakan masukkan data berat dan tinggi badan Anda di bawah ini.\n")

    try:
        try:
            input_nama = input(" Masukkan Nama Lengkap [default: Nahli Saud Ramdani]: ").strip()
            nama = input_nama if input_nama else "Nahli Saud Ramdani"
        except EOFError:
            nama = "Nahli Saud Ramdani"
            print(" Nahli Saud Ramdani (Otomatis)")

        # Input Berat Badan
        try:
            input_berat = input(" Masukkan Berat Badan (kg) [contoh: 68]: ").strip()
            if not input_berat:
                berat = 68.0
                print(f" -> Menggunakan nilai default berat: {berat:.1f} kg")
            else:
                berat = float(input_berat)
        except EOFError:
            berat = 68.0
            print(f" 68.0 (Otomatis)\n -> Menggunakan nilai default berat: {berat:.1f} kg")

        # Input Tinggi Badan
        try:
            input_tinggi = input(" Masukkan Tinggi Badan (m atau cm) [contoh: 1.72 atau 172]: ").strip()
            if not input_tinggi:
                tinggi = 1.72
                print(f" -> Menggunakan nilai default tinggi: {tinggi:.2f} m")
            else:
                nilai_tinggi = float(input_tinggi)
                if nilai_tinggi > 3.0:
                    tinggi = nilai_tinggi / 100.0
                    print(f" -> Terdeteksi input satuan cm. Dikonversi menjadi: {tinggi:.2f} m")
                else:
                    tinggi = nilai_tinggi
        except EOFError:
            tinggi = 1.72
            print(f" 1.72 (Otomatis)\n -> Menggunakan nilai default tinggi: {tinggi:.2f} m")

        if berat <= 0 or tinggi <= 0:
            print("\n[!] Kesalahan: Berat dan tinggi badan harus lebih besar dari 0.")
            return

        # Perhitungan BMI
        bmi = hitung_bmi(berat, tinggi)
        kategori, rekomendasi = tentukan_kategori_bmi(bmi)

        # Cetak output terformat
        cetak_kartu_hasil(nama, berat, tinggi, bmi, kategori, rekomendasi)

        # Demonstrasi Matriks Kategori BMI untuk Seluruh Klasifikasi
        print("\n--- MATRIKS REFERENSI KLASIFIKASI BMI (WHO) ---")
        tabel_kategori = [
            ("< 18.50", "Berat badan kurang", "Perlu peningkatan nutrisi"),
            ("18.50 - 24.99", "Berat badan normal", "Ideal dan sehat"),
            ("25.00 - 29.99", "Berat badan berlebih", "Waspada potensi risiko metabolik"),
            (">= 30.00", "Obesitas", "Risiko tinggi penyakit kardiovaskular")
        ]
        print(f"{'Rentang BMI':<16} | {'Klasifikasi Status':<22} | {'Catatan Klinis'}")
        print("-" * 62)
        for rentang, status, catatan in tabel_kategori:
            penanda = " <--" if status.lower() == kategori.lower() else ""
            print(f"{rentang:<16} | {status:<22} | {catatan}{penanda}")
        print("-" * 62)

    except ValueError as err:
        print(f"\n[!] Input tidak valid: Masukkan angka riil yang benar. Detail: {err}")
    except KeyboardInterrupt:
        print("\n\nProgram dibatalkan oleh pengguna. Terima kasih!")


if __name__ == "__main__":
    main()
