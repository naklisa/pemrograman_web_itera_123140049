"""
================================================================================
Program      : Pengujian Modul Password Generator (latihan6_main.py)
Berkas       : latihan6_main.py
Deskripsi    : Memanggil modul password_gen untuk menguji pembuatan password acak
               dengan variasi panjang dan opsi simbol.
Praktikan    : Nahli Saud Ramdani (NIM: 123140049)
Mata Kuliah  : Praktikum Pengembangan Aplikasi Web (PAW) - ITERA
================================================================================
"""

from password_gen import buat_password_acak


def main():
    print("=" * 64)
    print("      PROGRAM UJI COBA MODUL GENERATOR KATA SANDI ACAK          ")
    print("                 LABORATORIUM INFORMATIKA ITERA                 ")
    print("=" * 64)
    
    skenario = [
        (8, False, "PIN Alfanumerik Standar (8 karakter)"),
        (10, True, "Password Akun Media Sosial (10 karakter)"),
        (14, True, "Password Kuat Sistem Database / Cloud (14 karakter)"),
        (20, True, "Token Kriptografi / Kunci Rahasia API (20 karakter)"),
    ]
    
    print(f"| {'No':^3} | {'Panjang':^8} | {'Simbol?':^8} | {'Password Dihasilkan':<22} |")
    print("|" + "-" * 5 + "|" + "-" * 10 + "|" + "-" * 10 + "|" + "-" * 24 + "|")
    
    for idx, (pjg, sim, desc) in enumerate(skenario, start=1):
        pwd = buat_password_acak(panjang=pjg, gunakan_simbol=sim)
        status_sim = "Ya" if sim else "Tidak"
        print(f"| {idx:^3} | {pjg:^8} | {status_sim:^8} | {pwd:<22} |")
        
    print("=" * 64)
    print("\nSeluruh pengujian modul password_gen selesai dengan sukses!")


if __name__ == "__main__":
    main()

