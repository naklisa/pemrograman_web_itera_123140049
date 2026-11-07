# ==============================================================================
# Berkas    : latihan1.py
# Deskripsi : Latihan Mandiri 1 - Identitas Diri & Eksperimen Fungsi print()
# Praktikan : Nahli Saud Ramdani (NIM: 123140049)
# Mata Kuliah: Praktikum Pemrograman Web (PAW) - ITERA
# ==============================================================================

# 1. Cetak data profil diri menggunakan parameter sep=' | '
print("--- PROFIL MAHASISWA (SEPARATOR EXPERIMENT) ---")
print("Nahli Saud Ramdani", "123140049", "Angkatan 2023", "Web Development & Intelligent Systems", sep=" | ")

# 2. Cetakan kartu identitas berbingkai karakter pagar (#) menggunakan escape character
bingkai_atas = "#" * 66
bingkai_bawah = "#" * 66

kartu_identitas = f"""
{bingkai_atas}
#                                                                #
#              KARTU IDENTITAS PRAKTIKAN INFORMATIKA             #
#                 INSTITUT TEKNOLOGI SUMATERA                    #
#                                                                #
{bingkai_atas}
#  Nama Lengkap     : Nahli Saud Ramdani                         #
#  NIM              : 123140049                                  #
#  Program Studi    : Teknik Informatika                         #
#  Angkatan         : 2023                                       #
#  Kelas Praktikum  : RA                                         #
#  Minat Penelitian : Backend Engineering, Web Architecture & AI #
#  Status           : Mahasiswa Aktif ITERA                      #
{bingkai_bawah}
"""

# Mencetak kartu identitas dengan pemanfaatan escape character \n dan \t
print(kartu_identitas)

# Eksperimen lanjutan escape sequence
print("Catatan Akademik:\n\t\"Belajar Python dengan tekun adalah kunci memahami backend modern.\"\n\tLokasi:\tLabtek 3 ITERA, Ruang 3.10")

