/**
 * TUGAS PRAKTIKUM PAW - PERTEMUAN 1
 * Aplikasi Kasir & Keranjang Belanja Sederhana (Mini POS)
 * 
 * Pengembang:
 * Nama  : Nahli Saud Ramdani
 * NIM   : 123140049
 * Kelas : RA
 * 
 * Fitur:
 * 1. Validasi Form Input Barang (Nama min 3 char, Harga min Rp 500, Qty min 1).
 * 2. Modul Kalkulator & Perhitungan Otomatis (Subtotal per item, Total Belanja, Diskon 10% / Kupon HEMAT10, Kembalian).
 * 3. Manajemen Keranjang Belanja & LocalStorage (JSON.stringify / JSON.parse).
 * 4. Pilihan Cepat Menu Kantin Kampus (Quick Add Preset).
 * 5. Cetak Struk Transaksi Kasir & Notifikasi Toast Interaktif.
 */

// =============================================================================
// KONFIGURASI & STATE APLIKASI
// =============================================================================
const STORAGE_KEY = 'mini_pos_cart_NahliSaudRamdani_123140049';
const PROMO_CODE_VALID = 'HEMAT10';
const AUTO_DISCOUNT_MIN_PURCHASE = 50000;
const DISCOUNT_RATE = 0.10; // 10%

// Menu Preset Cepat Kantin Kampus
const QUICK_PRESETS = [
  { name: 'Nasi Goreng Kantin', price: 15000, icon: 'fa-bowl-rice' },
  { name: 'Mie Ayam Bakso', price: 13000, icon: 'fa-bowl-food' },
  { name: 'Es Teh Manis Jumbo', price: 4000, icon: 'fa-mug-hot' },
  { name: 'Air Mineral 600ml', price: 3000, icon: 'fa-bottle-water' },
  { name: 'Kopi Susu Kampus', price: 8000, icon: 'fa-mug-saucer' },
  { name: 'Buku Tulis Kampus', price: 6000, icon: 'fa-book' },
  { name: 'Pulpen Gel Hitam', price: 3500, icon: 'fa-pen' },
  { name: 'Roti Bakar Coklat', price: 7000, icon: 'fa-bread-slice' }
];

// State Global Keranjang & Promo
let cartItems = [];
let appliedCoupon = null;

// =============================================================================
// SELEKTOR ELEMEN DOM
// =============================================================================
const liveClockEl = document.getElementById('liveClock');

// Form Input Barang
const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const itemQtyInput = document.getElementById('itemQty');
const btnResetForm = document.getElementById('btnResetForm');
const formSubtotalPreview = document.getElementById('formSubtotalPreview');

// Feedback Error Elemen
const groupItemName = document.getElementById('groupItemName');
const groupItemPrice = document.getElementById('groupItemPrice');
const groupItemQty = document.getElementById('groupItemQty');
const itemNameError = document.getElementById('itemNameError');
const itemPriceError = document.getElementById('itemPriceError');
const itemQtyError = document.getElementById('itemQtyError');

// Keranjang Belanja
const cartTableBody = document.getElementById('cartTableBody');
const emptyCartState = document.getElementById('emptyCartState');
const cartCountBadge = document.getElementById('cartCountBadge');
const btnClearCart = document.getElementById('btnClearCart');
const quickItemsContainer = document.getElementById('quickItemsContainer');

// Checkout & Kalkulator
const couponCodeInput = document.getElementById('couponCodeInput');
const btnApplyCoupon = document.getElementById('btnApplyCoupon');
const couponFeedback = document.getElementById('couponFeedback');
const calcSubtotal = document.getElementById('calcSubtotal');
const calcDiscount = document.getElementById('calcDiscount');
const discountPercentage = document.getElementById('discountPercentage');
const discountSourceBadge = document.getElementById('discountSourceBadge');
const calcGrandTotal = document.getElementById('calcGrandTotal');

// Pembayaran & Kembalian
const cashGivenInput = document.getElementById('cashGivenInput');
const quickCashBtns = document.querySelectorAll('.btn-cash');
const changeStatusBox = document.getElementById('changeStatusBox');
const changeLabel = document.getElementById('changeLabel');
const changeAmount = document.getElementById('changeAmount');
const changeNote = document.getElementById('changeNote');
const btnCompleteTransaction = document.getElementById('btnCompleteTransaction');
const btnNewTransaction = document.getElementById('btnNewTransaction');

// Modal Struk
const receiptModal = document.getElementById('receiptModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnPrintReceipt = document.getElementById('btnPrintReceipt');
const btnDoneTransaction = document.getElementById('btnDoneTransaction');
const toastContainer = document.getElementById('toastContainer');

// =============================================================================
// HELPER UTILITIES
// =============================================================================

/**
 * Format angka ke format mata uang Rupiah
 * Contoh: 15000 -> "Rp 15.000"
 */
function formatRupiah(number) {
  const safeNumber = Math.max(0, Math.round(Number(number) || 0));
  return 'Rp ' + safeNumber.toLocaleString('id-ID');
}

/**
 * Update jam digital WIB secara realtime
 */
function initLiveClock() {
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (liveClockEl) {
      liveClockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  };
  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Tampilkan pesan notifikasi melayang (Toast)
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'danger') icon = 'fa-triangle-exclamation';
  if (type === 'warning') icon = 'fa-bell';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// =============================================================================
// LOCALSTORAGE MANAGEMENT (JSON.stringify & JSON.parse)
// =============================================================================

/**
 * Memuat data keranjang dari localStorage saat aplikasi pertama kali dibuka
 */
function loadCartFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      const parsedData = JSON.parse(rawData);
      if (Array.isArray(parsedData)) {
        cartItems = parsedData;
      }
    }
  } catch (error) {
    console.error('Gagal membaca data dari LocalStorage:', error);
    cartItems = [];
  }
}

/**
 * Menyimpan array keranjang belanja ke localStorage
 */
function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Gagal menyimpan data ke LocalStorage:', error);
    showToast('Gagal menyimpan ke penyimpanan lokal', 'danger');
  }
}

// =============================================================================
// VALIDASI FORM INPUT BARANG
// =============================================================================

/**
 * Bersihkan pesan error dan highlight pada form input
 */
function clearValidationErrors() {
  groupItemName.classList.remove('has-error');
  groupItemPrice.classList.remove('has-error');
  groupItemQty.classList.remove('has-error');

  itemNameError.textContent = '';
  itemPriceError.textContent = '';
  itemQtyError.textContent = '';
}

/**
 * Validasi form sesuai spesifikasi:
 * - Nama Barang: Wajib diisi, minimal 3 karakter
 * - Harga Satuan: Wajib angka positif dan minimal Rp 500
 * - Qty: Wajib angka bulat minimal 1
 */
function validateItemForm() {
  clearValidationErrors();
  let isValid = true;

  const rawName = itemNameInput.value.trim();
  const rawPrice = itemPriceInput.value.trim();
  const rawQty = itemQtyInput.value.trim();

  // 1. Validasi Nama Barang
  if (!rawName) {
    groupItemName.classList.add('has-error');
    itemNameError.textContent = 'Nama barang wajib diisi!';
    isValid = false;
  } else if (rawName.length < 3) {
    groupItemName.classList.add('has-error');
    itemNameError.textContent = 'Nama barang minimal harus 3 karakter!';
    isValid = false;
  }

  // 2. Validasi Harga Satuan
  if (!rawPrice) {
    groupItemPrice.classList.add('has-error');
    itemPriceError.textContent = 'Harga satuan wajib diisi!';
    isValid = false;
  } else {
    const priceNum = Number(rawPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      groupItemPrice.classList.add('has-error');
      itemPriceError.textContent = 'Harga satuan harus berupa angka positif!';
      isValid = false;
    } else if (priceNum < 500) {
      groupItemPrice.classList.add('has-error');
      itemPriceError.textContent = 'Harga satuan minimal bernilai Rp 500!';
      isValid = false;
    }
  }

  // 3. Validasi Qty / Jumlah
  if (!rawQty) {
    groupItemQty.classList.add('has-error');
    itemQtyError.textContent = 'Jumlah qty wajib diisi!';
    isValid = false;
  } else {
    const qtyNum = Number(rawQty);
    if (isNaN(qtyNum) || !Number.isInteger(qtyNum) || qtyNum < 1) {
      groupItemQty.classList.add('has-error');
      itemQtyError.textContent = 'Jumlah qty harus berupa angka bulat minimal 1!';
      isValid = false;
    }
  }

  return isValid;
}

/**
 * Update subtotal estimasi di bawah form secara realtime
 */
function updateFormSubtotalPreview() {
  const price = Number(itemPriceInput.value) || 0;
  const qty = Number(itemQtyInput.value) || 0;
  if (price > 0 && qty > 0) {
    formSubtotalPreview.textContent = formatRupiah(price * qty);
  } else {
    formSubtotalPreview.textContent = 'Rp 0';
  }
}

/**
 * Reset form input barang dan feedback
 */
function resetItemForm() {
  addItemForm.reset();
  itemQtyInput.value = 1;
  clearValidationErrors();
  updateFormSubtotalPreview();
  itemNameInput.focus();
}

// =============================================================================
// MANAJEMEN KERANJANG BELANJA
// =============================================================================

/**
 * Tambah barang ke dalam keranjang
 */
function addItemToCart(name, price, qty) {
  // Cek apakah item dengan nama dan harga yang sama sudah ada
  const normalizedName = name.trim();
  const existingIndex = cartItems.findIndex(
    item => item.name.toLowerCase() === normalizedName.toLowerCase() && item.price === price
  );

  if (existingIndex !== -1) {
    // Jika sudah ada, tambahkan qty-nya
    cartItems[existingIndex].qty += qty;
    cartItems[existingIndex].subtotal = cartItems[existingIndex].price * cartItems[existingIndex].qty;
    showToast(`Qty "${normalizedName}" bertambah menjadi ${cartItems[existingIndex].qty}`, 'info');
  } else {
    // Tambah item baru
    const newItem = {
      id: 'ITEM-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: normalizedName,
      price: price,
      qty: qty,
      subtotal: price * qty
    };
    cartItems.push(newItem);
    showToast(`"${normalizedName}" berhasil ditambahkan ke keranjang`, 'success');
  }

  // Simpan ke storage dan perbarui tampilan
  saveCartToStorage();
  renderCart();
  calculateTotals();
}

/**
 * Hapus satu item dari keranjang berdasarkan ID
 */
function removeItemFromCart(itemId) {
  const item = cartItems.find(i => i.id === itemId);
  const itemName = item ? item.name : 'Barang';
  
  cartItems = cartItems.filter(i => i.id !== itemId);
  saveCartToStorage();
  renderCart();
  calculateTotals();
  showToast(`"${itemName}" telah dihapus dari keranjang`, 'warning');
}

/**
 * Ubah jumlah Qty item langsung di tabel keranjang (+ / -)
 */
function updateItemQty(itemId, delta) {
  const item = cartItems.find(i => i.id === itemId);
  if (!item) return;

  const newQty = item.qty + delta;
  if (newQty <= 0) {
    // Jika qty berkurang jadi 0, konfirmasi hapus
    if (confirm(`Hapus "${item.name}" dari keranjang belanja?`)) {
      removeItemFromCart(itemId);
    }
  } else {
    item.qty = newQty;
    item.subtotal = item.price * item.qty;
    saveCartToStorage();
    renderCart();
    calculateTotals();
  }
}

/**
 * Render tabel keranjang belanja ke DOM
 */
function renderCart() {
  cartTableBody.innerHTML = '';
  const totalItemCount = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
  cartCountBadge.textContent = `${totalItemCount} Item (${cartItems.length} Jenis)`;

  if (cartItems.length === 0) {
    emptyCartState.style.display = 'block';
    btnClearCart.style.display = 'none';
    return;
  }

  emptyCartState.style.display = 'none';
  btnClearCart.style.display = 'inline-flex';

  cartItems.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600; color: #64748b;">${index + 1}</td>
      <td class="item-name-cell">${escapeHtml(item.name)}</td>
      <td>${formatRupiah(item.price)}</td>
      <td>
        <div class="qty-control">
          <button type="button" class="btn-qty" data-action="decrease" data-id="${item.id}" title="Kurangi qty">-</button>
          <span class="qty-number">${item.qty}</span>
          <button type="button" class="btn-qty" data-action="increase" data-id="${item.id}" title="Tambah qty">+</button>
        </div>
      </td>
      <td class="subtotal-cell">${formatRupiah(item.subtotal)}</td>
      <td style="text-align: center;">
        <button type="button" class="btn-danger-sm" data-action="delete" data-id="${item.id}" title="Hapus item ini">
          <i class="fa-solid fa-trash-can"></i> Hapus
        </button>
      </td>
    `;
    cartTableBody.appendChild(tr);
  });
}

/**
 * Escape HTML untuk keamanan input
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// =============================================================================
// KALKULATOR PERHITUNGAN OTOMATIS, DISKON & KEMBALIAN
// =============================================================================

/**
 * Hitung seluruh subtotal, diskon, grand total, dan status kembalian
 */
function calculateTotals() {
  // 1. Kalkulasi Total Subtotal Belanja
  const totalSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  calcSubtotal.textContent = formatRupiah(totalSubtotal);

  // 2. Kalkulator Diskon Sederhana:
  // - Otomatis 10% jika belanja >= Rp 50.000
  // - ATAU jika kode promo valid HEMAT10 diterapkan
  let discountNominal = 0;
  let isDiscountApplied = false;
  let discountReason = '';

  if (totalSubtotal >= AUTO_DISCOUNT_MIN_PURCHASE) {
    discountNominal = totalSubtotal * DISCOUNT_RATE;
    isDiscountApplied = true;
    discountReason = 'Otomatis Belanja ≥ Rp 50rb';
  } else if (appliedCoupon === PROMO_CODE_VALID && totalSubtotal > 0) {
    discountNominal = totalSubtotal * DISCOUNT_RATE;
    isDiscountApplied = true;
    discountReason = `Kupon ${PROMO_CODE_VALID}`;
  }

  // Tampilkan Diskon
  if (isDiscountApplied) {
    discountPercentage.textContent = '10%';
    calcDiscount.textContent = `- ${formatRupiah(discountNominal)}`;
    discountSourceBadge.textContent = discountReason;
    discountSourceBadge.style.display = 'inline-block';
  } else {
    discountPercentage.textContent = '0%';
    calcDiscount.textContent = '- Rp 0';
    discountSourceBadge.style.display = 'none';
  }

  // 3. Kalkulasi Grand Total (Total Akhir Bayar)
  const grandTotal = Math.max(0, totalSubtotal - discountNominal);
  calcGrandTotal.textContent = formatRupiah(grandTotal);

  // 4. Perhitungan Uang Bayar & Kembalian
  updatePaymentChange(grandTotal);
}

/**
 * Hitung kembalian dan status pembayaran berdasarkan uang yang diberikan
 */
function updatePaymentChange(grandTotal) {
  const cashGivenRaw = cashGivenInput.value.trim();
  const cashGiven = Number(cashGivenRaw) || 0;

  // Reset kelas tampilan
  changeStatusBox.className = 'change-status-box';

  if (cartItems.length === 0 || grandTotal === 0) {
    changeLabel.textContent = 'Status Pembayaran';
    changeAmount.textContent = 'Rp 0';
    changeNote.textContent = 'Keranjang belanja masih kosong.';
    btnCompleteTransaction.disabled = true;
    return;
  }

  if (!cashGivenRaw || cashGiven === 0) {
    changeLabel.textContent = 'Menunggu Pembayaran';
    changeAmount.textContent = 'Rp 0';
    changeNote.textContent = `Total belanja: ${formatRupiah(grandTotal)}. Masukkan nominal uang.`;
    btnCompleteTransaction.disabled = true;
    return;
  }

  const diff = cashGiven - grandTotal;

  if (diff < 0) {
    // Uang kurang
    const shortage = Math.abs(diff);
    changeStatusBox.classList.add('underpaid');
    changeLabel.textContent = 'Uang Belum Cukup';
    changeAmount.textContent = `- ${formatRupiah(shortage)}`;
    changeNote.textContent = `Kurang ${formatRupiah(shortage)} untuk menyelesaikan transaksi!`;
    btnCompleteTransaction.disabled = true;
  } else if (diff === 0) {
    // Uang pas
    changeStatusBox.classList.add('exact');
    changeLabel.textContent = 'Pembayaran Lunas';
    changeAmount.textContent = 'Rp 0 (Uang Pas)';
    changeNote.textContent = 'Jumlah uang yang dibayarkan pas.';
    btnCompleteTransaction.disabled = false;
  } else {
    // Ada kembalian
    changeStatusBox.classList.add('change');
    changeLabel.textContent = 'Kembalian Pelanggan';
    changeAmount.textContent = formatRupiah(diff);
    changeNote.textContent = `Serahkan uang kembalian sebesar ${formatRupiah(diff)} ke pembeli.`;
    btnCompleteTransaction.disabled = false;
  }
}

// =============================================================================
// MODAL & STRUK PEMBAYARAN KASIR
// =============================================================================

/**
 * Tampilkan modal struk transaksi kasir
 */
function openReceiptModal() {
  const totalSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  
  let discountNominal = 0;
  if (totalSubtotal >= AUTO_DISCOUNT_MIN_PURCHASE || (appliedCoupon === PROMO_CODE_VALID && totalSubtotal > 0)) {
    discountNominal = totalSubtotal * DISCOUNT_RATE;
  }
  const grandTotal = Math.max(0, totalSubtotal - discountNominal);
  const cashGiven = Number(cashGivenInput.value) || 0;
  const change = Math.max(0, cashGiven - grandTotal);

  // Set nomor transaksi acak & waktu
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const trxId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);

  document.getElementById('receiptDate').textContent = dateFormatted;
  document.getElementById('receiptTrxId').textContent = trxId;

  // Daftar item struk
  const receiptItemsContainer = document.getElementById('receiptItemsContainer');
  let itemsHtml = '';
  cartItems.forEach(item => {
    itemsHtml += `
      <div class="receipt-item-line">
        <span>${escapeHtml(item.name)}</span>
        <span>${formatRupiah(item.subtotal)}</span>
      </div>
      <div class="receipt-item-sub">
        ${item.qty} x ${formatRupiah(item.price)}
      </div>
    `;
  });
  receiptItemsContainer.innerHTML = itemsHtml;

  // Ringkasan harga struk
  document.getElementById('receiptSubtotal').textContent = formatRupiah(totalSubtotal);
  const receiptDiscountLine = document.getElementById('receiptDiscountLine');
  if (discountNominal > 0) {
    receiptDiscountLine.style.display = 'flex';
    document.getElementById('receiptDiscount').textContent = `- ${formatRupiah(discountNominal)}`;
  } else {
    receiptDiscountLine.style.display = 'none';
  }
  document.getElementById('receiptGrandTotal').textContent = formatRupiah(grandTotal);
  document.getElementById('receiptCash').textContent = formatRupiah(cashGiven);
  document.getElementById('receiptChange').textContent = formatRupiah(change);

  receiptModal.classList.add('active');
}

/**
 * Tutup modal struk
 */
function closeReceiptModal() {
  receiptModal.classList.remove('active');
}

// =============================================================================
// TRANSAKSI BARU & RESET APLIKASI
// =============================================================================

/**
 * Kosongkan seluruh keranjang belanja dan bersihkan localStorage
 */
function clearAllCart(isConfirm = true) {
  if (cartItems.length === 0) {
    showToast('Keranjang belanja sudah kosong', 'info');
    return;
  }

  if (isConfirm && !confirm('Apakah Anda yakin ingin mengosongkan seluruh keranjang belanja?')) {
    return;
  }

  cartItems = [];
  appliedCoupon = null;
  couponCodeInput.value = '';
  couponFeedback.textContent = '';
  couponFeedback.className = 'coupon-feedback';
  cashGivenInput.value = '';

  saveCartToStorage();
  renderCart();
  calculateTotals();
  showToast('Keranjang belanja berhasil dikosongkan!', 'info');
}

/**
 * Mulai transaksi baru setelah belanja selesai
 */
function startNewTransaction() {
  if (cartItems.length > 0) {
    if (!confirm('Mulai transaksi baru? Ini akan mereset keranjang belanja saat ini.')) {
      return;
    }
  }
  cartItems = [];
  appliedCoupon = null;
  couponCodeInput.value = '';
  couponFeedback.textContent = '';
  couponFeedback.className = 'coupon-feedback';
  cashGivenInput.value = '';
  resetItemForm();

  saveCartToStorage();
  renderCart();
  calculateTotals();
  showToast('Siap untuk transaksi baru kasir!', 'success');
}

// =============================================================================
// RENDER QUICK PRESETS KANTIN
// =============================================================================
function renderQuickPresets() {
  quickItemsContainer.innerHTML = '';
  QUICK_PRESETS.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quick-item-btn';
    btn.innerHTML = `
      <div class="quick-item-icon">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div class="quick-item-info">
        <span class="quick-item-title">${item.name}</span>
        <span class="quick-item-price">${formatRupiah(item.price)}</span>
      </div>
    `;
    btn.addEventListener('click', () => {
      addItemToCart(item.name, item.price, 1);
    });
    quickItemsContainer.appendChild(btn);
  });
}

// =============================================================================
// EVENT LISTENERS INITIALIZATION
// =============================================================================
function initEventListeners() {
  // 1. Submit Form Tambah Barang
  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateItemForm()) {
      const name = itemNameInput.value.trim();
      const price = Number(itemPriceInput.value);
      const qty = Number(itemQtyInput.value);
      
      addItemToCart(name, price, qty);
      resetItemForm();
    }
  });

  // 2. Reset Tombol Form Manual
  btnResetForm.addEventListener('click', () => {
    resetItemForm();
  });

  // 3. Realtime Input Listener untuk Subtotal Preview & Clear Error
  itemNameInput.addEventListener('input', () => {
    if (itemNameInput.value.trim().length >= 3) {
      groupItemName.classList.remove('has-error');
      itemNameError.textContent = '';
    }
  });

  itemPriceInput.addEventListener('input', () => {
    const p = Number(itemPriceInput.value);
    if (!isNaN(p) && p >= 500) {
      groupItemPrice.classList.remove('has-error');
      itemPriceError.textContent = '';
    }
    updateFormSubtotalPreview();
  });

  itemQtyInput.addEventListener('input', () => {
    const q = Number(itemQtyInput.value);
    if (!isNaN(q) && Number.isInteger(q) && q >= 1) {
      groupItemQty.classList.remove('has-error');
      itemQtyError.textContent = '';
    }
    updateFormSubtotalPreview();
  });

  // 4. Event Delegation untuk Tombol Aksi di Tabel Keranjang (+, -, Hapus)
  cartTableBody.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const itemId = target.getAttribute('data-id');

    if (action === 'delete') {
      removeItemFromCart(itemId);
    } else if (action === 'increase') {
      updateItemQty(itemId, 1);
    } else if (action === 'decrease') {
      updateItemQty(itemId, -1);
    }
  });

  // 5. Tombol Kosongkan Keranjang
  btnClearCart.addEventListener('click', () => {
    clearAllCart(true);
  });

  // 6. Terapkan Kupon Promo
  btnApplyCoupon.addEventListener('click', () => {
    const code = couponCodeInput.value.trim().toUpperCase();
    if (!code) {
      couponFeedback.className = 'coupon-feedback error';
      couponFeedback.textContent = 'Silakan masukkan kode kupon!';
      return;
    }

    if (code === PROMO_CODE_VALID) {
      appliedCoupon = PROMO_CODE_VALID;
      couponFeedback.className = 'coupon-feedback success';
      couponFeedback.textContent = 'Kupon HEMAT10 berhasil diterapkan! Diskon 10% aktif.';
      showToast('Kupon HEMAT10 berhasil diterapkan!', 'success');
      calculateTotals();
    } else {
      appliedCoupon = null;
      couponFeedback.className = 'coupon-feedback error';
      couponFeedback.textContent = 'Kode promo tidak valid!';
      calculateTotals();
    }
  });

  // 7. Input Uang Bayar Kasir
  cashGivenInput.addEventListener('input', () => {
    const totalSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    let discountNominal = 0;
    if (totalSubtotal >= AUTO_DISCOUNT_MIN_PURCHASE || (appliedCoupon === PROMO_CODE_VALID && totalSubtotal > 0)) {
      discountNominal = totalSubtotal * DISCOUNT_RATE;
    }
    const grandTotal = Math.max(0, totalSubtotal - discountNominal);
    updatePaymentChange(grandTotal);
  });

  // 8. Tombol Cepat Nominal Uang (Quick Cash)
  quickCashBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-cash');
      const totalSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
      let discountNominal = 0;
      if (totalSubtotal >= AUTO_DISCOUNT_MIN_PURCHASE || (appliedCoupon === PROMO_CODE_VALID && totalSubtotal > 0)) {
        discountNominal = totalSubtotal * DISCOUNT_RATE;
      }
      const grandTotal = Math.max(0, totalSubtotal - discountNominal);

      if (type === 'exact') {
        cashGivenInput.value = grandTotal;
      } else {
        cashGivenInput.value = Number(type);
      }
      updatePaymentChange(grandTotal);
    });
  });

  // 9. Tombol Selesaikan & Cetak Struk
  btnCompleteTransaction.addEventListener('click', () => {
    openReceiptModal();
  });

  // 10. Tombol Transaksi Baru / Reset Kasir
  btnNewTransaction.addEventListener('click', () => {
    startNewTransaction();
  });

  // 11. Modal Actions
  btnCloseModal.addEventListener('click', closeReceiptModal);
  btnDoneTransaction.addEventListener('click', () => {
    closeReceiptModal();
    startNewTransaction();
  });

  btnPrintReceipt.addEventListener('click', () => {
    window.print();
  });

  // Tutup modal jika klik di luar area kartu
  receiptModal.addEventListener('click', (e) => {
    if (e.target === receiptModal) {
      closeReceiptModal();
    }
  });
}

// =============================================================================
// INITIAL RUN
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  renderQuickPresets();
  loadCartFromStorage();
  renderCart();
  calculateTotals();
  initEventListeners();
});
