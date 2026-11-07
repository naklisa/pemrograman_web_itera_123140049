"""
================================================================================
Modul        : password_gen.py
Deskripsi    : Modul kustom untuk pembangkit kata sandi acak berbasis karakter alfabet,
               angka, dan karakter khusus.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - ITERA
================================================================================
"""

import random
import string


def buat_password_acak(panjang: int = 8, gunakan_simbol: bool = True) -> str:
    """
    Menghasilkan kombinasi kata sandi acak yang kuat.
    
    Parameter:
        panjang (int)       : Panjang karakter password yang diinginkan (default: 8, minimal 4).
        gunakan_simbol (bool): Apakah menyertakan karakter simbol/tanda baca (default: True).
        
    Return:
        str: String kata sandi acak yang dihasilkan.
    """
    if panjang < 4:
        raise ValueError("Panjang password minimal harus 4 karakter.")
        
    # Kumpulan karakter dasar
    huruf = string.ascii_letters   # a-z, A-Z
    angka = string.digits          # 0-9
    simbol = "!@#$%^&*()_+-=" if gunakan_simbol else ""
    
    kumpulan_semua = huruf + angka + simbol
    
    # Menjamin setidaknya terdapat 1 huruf kecil, 1 huruf besar, dan 1 digit angka
    password_wajib = [
        random.choice(string.ascii_lowercase),
        random.choice(string.ascii_uppercase),
        random.choice(string.digits)
    ]
    if gunakan_simbol:
        password_wajib.append(random.choice(simbol))
        
    # Mengisi sisa panjang yang dibutuhkan
    sisa_panjang = panjang - len(password_wajib)
    password_sisa = [random.choice(kumpulan_semua) for _ in range(sisa_panjang)]
    
    # Gabung dan acak urutan seluruh karakter
    gabungan = password_wajib + password_sisa
    random.shuffle(gabungan)
    
    return "".join(gabungan)


# Self-testing mandiri modul
if __name__ == "__main__":
    print("[TEST MODUL] Menjalankan uji coba internal modul password_gen:")
    for p in [8, 12, 16]:
        print(f"Sample {p:2d} karakter : {buat_password_acak(panjang=p)}")

