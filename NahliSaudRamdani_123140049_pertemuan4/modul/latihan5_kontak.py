# ==============================================================================
# Berkas    : latihan5_kontak.py
# Deskripsi : Latihan Mandiri 5 - Katalog Kontak Sederhana Menggunakan Dictionary
# Praktikan : Nahli Saud Ramdani (NIM: 123140049)
# Mata Kuliah: Praktikum Pemrograman Web (PAW) - ITERA
# ==============================================================================

def tampilkan_semua_kontak(katalog: dict) -> None:
    """Menampilkan seluruh kontak yang tersimpan dalam format tabel rapi."""
    print("\n" + "=" * 50)
    print("           DAFTAR SELURUH BUKU KONTAK             ")
    print("=" * 50)
    if not katalog:
        print("  [Katalog kosong: Belum ada kontak tersimpan]")
        print("=" * 50)
        return
        
    print(f"| {'No':^3} | {'Nama Kontak':<22} | {'Nomor Telepon':<15} |")
    print("|" + "-" * 5 + "|" + "-" * 24 + "|" + "-" * 17 + "|")
    for idx, (nama, nomor) in enumerate(katalog.items(), start=1):
        print(f"| {idx:^3} | {nama:<22} | {nomor:<15} |")
    print("=" * 50)


def cari_kontak(katalog: dict, nama: str) -> None:
    """Mencari nomor telepon berdasarkan nama menggunakan method .get()."""
    hasil = katalog.get(nama)
    print("\n--- HASIL PENCARIAN KONTAK ---")
    if hasil:
        print(f"  [V] Kontak Ditemukan: {nama} -> {hasil}")
    else:
        print(f"  [X] Kontak dengan nama '{nama}' TIDAK DITEMUKAN dalam katalog.")


def tambah_kontak(katalog: dict, nama: str, nomor: str) -> None:
    """Menambahkan atau memperbarui kontak baru di dictionary."""
    katalog[nama] = nomor
    print(f"  [+] Berhasil menyimpan kontak: {nama} ({nomor})")


def main():
    print("*" * 56)
    print("       SISTEM KATALOG BUKU KONTAK MAHASISWA ITERA       ")
    print("*" * 56)
    
    # Inisialisasi dictionary kontak awal
    buku_kontak = {
        "Nahli Saud": "0812-3456-7890",
        "Ahmad Fadhilah": "0821-9876-5432",
        "Budi Santoso": "0857-1122-3344",
        "Siti Nurhaliza": "0878-5566-7788",
    }
    
    # 1. Menampilkan seluruh kontak awal
    print("\n[FITUR 1] Menampilkan Kontak Awal:")
    tampilkan_semua_kontak(buku_kontak)
    
    # 2. Menambahkan kontak baru
    print("\n[FITUR 2] Menambahkan Kontak Baru:")
    tambah_kontak(buku_kontak, "Dewi Lestari", "0813-9988-7766")
    tambah_kontak(buku_kontak, "Laboratorium Informatika", "0721-8030188")
    
    # 3. Mencari kontak menggunakan .get()
    print("\n[FITUR 3] Menguji Pencarian Kontak via .get():")
    cari_kontak(buku_kontak, "Nahli Saud")
    cari_kontak(buku_kontak, "Dewi Lestari")
    cari_kontak(buku_kontak, "Zulkifli (Kontak Tidak Ada)")
    
    # 4. Menampilkan kembali kontak akhir yang telah diperbarui
    print("\n[FITUR 4] Menampilkan Kontak Terakhir Setelah Penambahan:")
    tampilkan_semua_kontak(buku_kontak)


if __name__ == "__main__":
    main()

