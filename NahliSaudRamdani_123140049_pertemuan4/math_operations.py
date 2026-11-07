"""
================================================================================
Modul        : math_operations.py
Deskripsi    : Modul kustom untuk operasi geometri (luas & keliling), konversi suhu,
               dan konstanta matematika.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - Pertemuan 4
Institusi    : Institut Teknologi Sumatera (ITERA)
================================================================================
"""

import math

# ==============================================================================
# KONSTANTA MATEMATIKA
# ==============================================================================
PI: float = 3.141592653589793
EULER: float = 2.718281828459045


# ==============================================================================
# 1. FUNGSI GEOMETRI: PERSEGI (SQUARE)
# ==============================================================================
def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas persegi dengan rumus: L = sisi * sisi.
    
    Parameter:
        sisi (float): Panjang sisi persegi (harus > 0).
        
    Return:
        float: Luas persegi.
        
    Raises:
        ValueError: Jika nilai sisi bernilai negatif atau nol.
    """
    if sisi <= 0:
        raise ValueError("Panjang sisi persegi harus bernilai lebih besar dari 0.")
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling persegi dengan rumus: K = 4 * sisi.
    
    Parameter:
        sisi (float): Panjang sisi persegi (harus > 0).
        
    Return:
        float: Keliling persegi.
        
    Raises:
        ValueError: Jika nilai sisi bernilai negatif atau nol.
    """
    if sisi <= 0:
        raise ValueError("Panjang sisi persegi harus bernilai lebih besar dari 0.")
    return 4.0 * sisi


# ==============================================================================
# 2. FUNGSI GEOMETRI: PERSEGI PANJANG (RECTANGLE)
# ==============================================================================
def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas persegi panjang dengan rumus: L = panjang * lebar.
    
    Parameter:
        panjang (float): Panjang bidang persegi panjang (> 0).
        lebar (float)  : Lebar bidang persegi panjang (> 0).
        
    Return:
        float: Luas persegi panjang.
        
    Raises:
        ValueError: Jika panjang atau lebar tidak bernilai positif.
    """
    if panjang <= 0 or lebar <= 0:
        raise ValueError("Panjang dan lebar persegi panjang harus bernilai lebih besar dari 0.")
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling persegi panjang dengan rumus: K = 2 * (panjang + lebar).
    
    Parameter:
        panjang (float): Panjang bidang persegi panjang (> 0).
        lebar (float)  : Lebar bidang persegi panjang (> 0).
        
    Return:
        float: Keliling persegi panjang.
        
    Raises:
        ValueError: Jika panjang atau lebar tidak bernilai positif.
    """
    if panjang <= 0 or lebar <= 0:
        raise ValueError("Panjang dan lebar persegi panjang harus bernilai lebih besar dari 0.")
    return 2.0 * (panjang + lebar)


# ==============================================================================
# 3. FUNGSI GEOMETRI: LINGKARAN (CIRCLE)
# ==============================================================================
def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas lingkaran dengan rumus: L = PI * r^2.
    
    Parameter:
        jari_jari (float): Jari-jari lingkaran (r > 0).
        
    Return:
        float: Luas lingkaran.
        
    Raises:
        ValueError: Jika jari-jari bernilai negatif atau nol.
    """
    if jari_jari <= 0:
        raise ValueError("Jari-jari lingkaran harus bernilai lebih besar dari 0.")
    return PI * (jari_jari ** 2)


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling lingkaran dengan rumus: K = 2 * PI * r.
    
    Parameter:
        jari_jari (float): Jari-jari lingkaran (r > 0).
        
    Return:
        float: Keliling lingkaran.
        
    Raises:
        ValueError: Jika jari-jari bernilai negatif atau nol.
    """
    if jari_jari <= 0:
        raise ValueError("Jari-jari lingkaran harus bernilai lebih besar dari 0.")
    return 2.0 * PI * jari_jari


# ==============================================================================
# 4. FUNGSI GEOMETRI TAMBAHAN: SEGITIGA (TRIANGLE)
# ==============================================================================
def luas_segitiga(alas: float, tinggi: float) -> float:
    """
    Menghitung luas segitiga dengan rumus: L = 0.5 * alas * tinggi.
    
    Parameter:
        alas (float)   : Panjang alas segitiga (> 0).
        tinggi (float) : Tinggi segitiga (> 0).
        
    Return:
        float: Luas segitiga.
    """
    if alas <= 0 or tinggi <= 0:
        raise ValueError("Alas dan tinggi segitiga harus bernilai lebih besar dari 0.")
    return 0.5 * alas * tinggi


def keliling_segitiga(sisi_a: float, sisi_b: float, sisi_c: float) -> float:
    """
    Menghitung keliling segitiga dengan rumus: K = sisi_a + sisi_b + sisi_c.
    
    Parameter:
        sisi_a (float): Panjang sisi pertama (> 0).
        sisi_b (float): Panjang sisi kedua (> 0).
        sisi_c (float): Panjang sisi ketiga (> 0).
        
    Return:
        float: Keliling segitiga.
    """
    if sisi_a <= 0 or sisi_b <= 0 or sisi_c <= 0:
        raise ValueError("Seluruh sisi segitiga harus bernilai lebih besar dari 0.")
    return sisi_a + sisi_b + sisi_c


# ==============================================================================
# 5. FUNGSI KONVERSI TEMPERATUR SUHU
# ==============================================================================
def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengonversi temperatur dari skala Celsius ke Fahrenheit.
    Rumus: F = (C * 9/5) + 32
    
    Parameter:
        celsius (float): Suhu dalam derajat Celsius.
        
    Return:
        float: Suhu dalam derajat Fahrenheit.
    """
    return (celsius * 9.0 / 5.0) + 32.0


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengonversi temperatur dari skala Celsius ke Kelvin.
    Rumus: K = C + 273.15
    
    Parameter:
        celsius (float): Suhu dalam derajat Celsius (>= -273.15).
        
    Return:
        float: Suhu dalam Kelvin.
        
    Raises:
        ValueError: Jika suhu di bawah nol mutlak (-273.15 C).
    """
    if celsius < -273.15:
        raise ValueError("Suhu tidak boleh lebih rendah dari nol mutlak (-273.15 Celsius).")
    return celsius + 273.15


def celsius_ke_reamur(celsius: float) -> float:
    """
    Mengonversi temperatur dari skala Celsius ke Reamur.
    Rumus: R = C * 4/5
    
    Parameter:
        celsius (float): Suhu dalam derajat Celsius.
        
    Return:
        float: Suhu dalam derajat Reamur.
    """
    return celsius * 4.0 / 5.0


def fahrenheit_ke_celsius(fahrenheit: float) -> float:
    """
    Mengonversi temperatur dari skala Fahrenheit ke Celsius.
    Rumus: C = (F - 32) * 5/9
    
    Parameter:
        fahrenheit (float): Suhu dalam derajat Fahrenheit.
        
    Return:
        float: Suhu dalam derajat Celsius.
    """
    return (fahrenheit - 32.0) * 5.0 / 9.0


def kelvin_ke_celsius(kelvin: float) -> float:
    """
    Mengonversi temperatur dari skala Kelvin ke Celsius.
    Rumus: C = K - 273.15
    
    Parameter:
        kelvin (float): Suhu dalam Kelvin (>= 0).
        
    Return:
        float: Suhu dalam derajat Celsius.
    """
    if kelvin < 0:
        raise ValueError("Suhu dalam Kelvin tidak boleh bernilai negatif (di bawah nol mutlak).")
    return kelvin - 273.15


# ==============================================================================
# SELF-TESTING IDIOM
# ==============================================================================
if __name__ == "__main__":
    print("=" * 60)
    print(" [TESTING MANDIRI INTERNAL MODUL: math_operations.py] ")
    print("=" * 60)
    print(f"Konstanta PI             : {PI}")
    print(f"Luas Persegi (s=5)       : {luas_persegi(5.0)}")
    print(f"Keliling Persegi (s=5)   : {keliling_persegi(5.0)}")
    print(f"Luas Persegi Pjg (p=8, l=4): {luas_persegi_panjang(8.0, 4.0)}")
    print(f"Luas Lingkaran (r=7)     : {luas_lingkaran(7.0):.2f}")
    print(f"Keliling Lingkaran (r=7) : {keliling_lingkaran(7.0):.2f}")
    print(f"Konversi 100 C -> F      : {celsius_ke_fahrenheit(100.0):.2f} F")
    print(f"Konversi 100 C -> K      : {celsius_ke_kelvin(100.0):.2f} K")
    print(f"Konversi 100 C -> R      : {celsius_ke_reamur(100.0):.2f} R")
    print("Seluruh pengujian internal modul math_operations BERHASIL!")
    print("=" * 60)

