# ===================================================
# Berkas    : kalkulator_lib.py
# Deskripsi : Modul kustom penyedia fungsi-fungsi aritmatika
# Praktikan : Nahli Saud Ramdani (NIM: 123140049)
# ===================================================

def tambah(a: float, b: float) -> float:
    """Mengembalikan hasil penjumlahan a + b"""
    return a + b


def kurang(a: float, b: float) -> float:
    """Mengembalikan hasil pengurangan a - b"""
    return a - b


def kali(a: float, b: float) -> float:
    """Mengembalikan hasil perkalian a * b"""
    return a * b


def bagi(a: float, b: float):
    """Mengembalikan hasil pembagian a / b dengan pencegahan ZeroDivisionError"""
    if b == 0:
        return "Error: Tidak dapat membagi dengan angka nol!"
    return a / b


# Blok idiom sakti untuk testing mandiri modul
if __name__ == "__main__":
    print("[TEST MODUL] Menjalankan uji coba internal kalkulator_lib:")
    print("Test 10 + 5 =", tambah(10, 5))
    print("Test 10 - 4 =", kurang(10, 4))
    print("Test 10 * 3 =", kali(10, 3))
    print("Test 10 / 2 =", bagi(10, 2))
    print("Test 10 / 0 =", bagi(10, 0))

