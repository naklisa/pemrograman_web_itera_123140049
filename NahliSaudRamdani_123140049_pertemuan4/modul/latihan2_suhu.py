# ==============================================================================
# Berkas    : latihan2_suhu.py
# Deskripsi : Latihan Mandiri 2 - Kalkulator Konversi Suhu Interaktif
# Praktikan : Nahli Saud Ramdani (NIM: 123140049)
# Mata Kuliah: Praktikum Pemrograman Web (PAW) - ITERA
# ==============================================================================

def main():
    print("=" * 60)
    print("       PROGRAM KALKULATOR KONVERSI TEMPERATUR SUHU         ")
    print("               LABORATORIUM INFORMATIKA ITERA              ")
    print("=" * 60)
    
    try:
        user_input = input("Masukkan nilai temperatur dalam derajat Celsius [default: 27.5]: ").strip()
        celsius = float(user_input) if user_input else 27.5
    except EOFError:
        celsius = 27.5
        print("27.5 (Otomatis)")
    except ValueError:
        print("\n[!] Kesalahan: Harap masukkan angka desimal atau bulat yang valid.")
        return

    # Perhitungan konversi suhu
    fahrenheit = (celsius * 9.0 / 5.0) + 32.0
    kelvin = celsius + 273.15
    reamur = celsius * 4.0 / 5.0
    
    print("\n" + "-" * 60)
    print("                  HASIL KONVERSI SUHU                      ")
    print("-" * 60)
    print(f" Input Suhu (Celsius)    : {celsius:,.2f} °C")
    print(f" Konversi ke Fahrenheit  : {fahrenheit:,.2f} °F")
    print(f" Konversi ke Kelvin      : {kelvin:,.2f} K")
    print(f" Konversi ke Reamur      : {reamur:,.2f} °R")
    print("-" * 60)
    
    # Informasi Tambahan
    if celsius <= 0:
        status = "Suhu Sangat Dingin (Membeku)"
    elif celsius < 25:
        status = "Suhu Sejuk"
    elif celsius <= 35:
        status = "Suhu Normal Ruang / Tropis"
    else:
        status = "Suhu Panas Ekstrem"
        
    print(f" Status Kondisi Termal   : {status}")
    print("=" * 60)


if __name__ == "__main__":
    main()
