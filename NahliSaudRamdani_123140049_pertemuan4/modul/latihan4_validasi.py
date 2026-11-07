# ==============================================================================
# Berkas    : latihan4_validasi.py
# Deskripsi : Latihan Mandiri 4 - Fungsi Validator Kekuatan Kata Sandi (Password)
# Praktikan : Nahli Saud Ramdani (NIM: 123140049)
# Mata Kuliah: Praktikum Pemrograman Web (PAW) - ITERA
# ==============================================================================

def validasi_password(password: str) -> bool:
    """
    Memvalidasi kriteria keamanan kata sandi:
    1. Memiliki panjang minimal 8 karakter.
    2. Mengandung setidaknya satu karakter angka (0-9).
    
    Parameter:
        password (str): Teks kata sandi yang akan divalidasi.
        
    Return:
        bool: True jika memenuhi kedua kriteria, False jika tidak.
    """
    # Kriteria 1: Panjang minimal 8 karakter
    if len(password) < 8:
        return False
        
    # Kriteria 2: Mengandung setidaknya satu angka
    mengandung_angka = any(karakter.isdigit() for karakter in password)
    if not mengandung_angka:
        return False
        
    return True


def evaluasi_rinci_password(password: str) -> dict:
    """
    Memberikan diagnosis rinci mengapa password diterima atau ditolak.
    """
    panjang_cukup = len(password) >= 8
    ada_angka = any(c.isdigit() for c in password)
    ada_huruf_besar = any(c.isupper() for c in password)
    ada_huruf_kecil = any(c.islower() for c in password)
    
    status_valid = validasi_password(password)
    
    return {
        "password": password,
        "panjang": len(password),
        "panjang_cukup": panjang_cukup,
        "ada_angka": ada_angka,
        "ada_huruf_besar": ada_huruf_besar,
        "ada_huruf_kecil": ada_huruf_kecil,
        "is_valid": status_valid
    }


def main():
    print("=" * 68)
    print("        SISTEM VALIDASI KEKUATAN KATA SANDI (PASSWORD CHECKER)       ")
    print("                 LABORATORIUM INFORMATIKA ITERA                      ")
    print("=" * 68)
    print("Kriteria Wajib: Minimal 8 karakter dan mengandung setidaknya 1 angka.\n")
    
    daftar_sampel = [
        "Itera123",            # Valid: 8 karakter, ada angka & huruf
        "rahasia",             # Tidak valid: 7 karakter, tanpa angka
        "admin2026",           # Valid: 9 karakter, ada angka
        "pendek1",             # Tidak valid: hanya 7 karakter (kurang dari 8)
        "hanyahurufsaja",      # Tidak valid: 14 karakter tapi tanpa angka
        "12345678",            # Valid: 8 karakter angka
        "P@ssw0rdITERA",       # Valid: 13 karakter, angka & simbol
        "pwd",                 # Tidak valid: terlalu pendek
    ]
    
    print(f"| {'No':^3} | {'Kata Sandi (Input)':<20} | {'Panjang':^8} | {'Ada Angka?':^11} | {'Hasil Validasi':^14} |")
    print("|" + "-" * 5 + "|" + "-" * 22 + "|" + "-" * 10 + "|" + "-" * 13 + "|" + "-" * 16 + "|")
    
    for idx, pwd in enumerate(daftar_sampel, start=1):
        info = evaluasi_rinci_password(pwd)
        status_teks = "[V] VALID" if info["is_valid"] else "[X] TIDAK VALID"
        ada_angka_teks = "Ya" if info["ada_angka"] else "Tidak"
        
        print(f"| {idx:^3} | {pwd:<20} | {info['panjang']:^8} | {ada_angka_teks:^11} | {status_teks:^14} |")
        
    print("=" * 68)
    
    # Uji Interaktif Opsional
    print("\n--- UJI INTERAKTIF PENGGUNA ---")
    try:
        user_pwd = input("Masukkan password yang ingin Anda tes [default: PAW_Itera2026]: ").strip()
        test_pwd = user_pwd if user_pwd else "PAW_Itera2026"
        hasil_cek = validasi_password(test_pwd)
        
        print(f"Password '{test_pwd}' -> Status: {'Lolos Validasi!' if hasil_cek else 'Gagal Validasi!'}")
    except EOFError:
        pass
    print("=" * 68)

if __name__ == "__main__":
    main()

