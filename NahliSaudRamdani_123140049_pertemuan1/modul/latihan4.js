/**
 * LATIHAN 4: Form Validation, LocalStorage, API & DOM Manipulation
 * Praktikum PAW - Nahli Saud Ramdani (123140049)
 */

// Global State
let mhsLocalStorageData = [];
let apiPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 4;
let todoList = [];

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initFormValidation();
  loadMhsFromStorage();
  initApiPosts();
  initTodoList();
});

// ==========================================
// 4. DARK MODE TOGGLE (Class Manipulation & LocalStorage)
// ==========================================
function initDarkMode() {
  const darkBtn = document.getElementById("darkToggleBtn");
  const darkLabel = document.getElementById("darkToggleLabel");

  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkLabel.innerText = "Light Mode";
    darkBtn.querySelector("i").className = "fa-solid fa-sun";
  }

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const currentlyDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", currentlyDark ? "dark" : "light");
    
    darkLabel.innerText = currentlyDark ? "Light Mode" : "Dark Mode";
    darkBtn.querySelector("i").className = currentlyDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });
}

// ==========================================
// 1 & 2. FORM VALIDATION & PERSISTENT LOCALSTORAGE MAHASISWA
// ==========================================
function initFormValidation() {
  const form = document.getElementById("mhsFormValidation");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const namaInput = document.getElementById("valNama");
    const nimInput = document.getElementById("valNim");
    const jurusanInput = document.getElementById("valJurusan");
    const nilaiInput = document.getElementById("valNilai");

    const errNama = document.getElementById("errNama");
    const errNim = document.getElementById("errNim");
    const errJurusan = document.getElementById("errJurusan");
    const errNilai = document.getElementById("errNilai");

    // Reset error messages
    errNama.innerText = "";
    errNim.innerText = "";
    errJurusan.innerText = "";
    errNilai.innerText = "";
    [namaInput, nimInput, jurusanInput, nilaiInput].forEach(inp => inp.classList.remove("error"));

    let isValid = true;

    if (namaInput.value.trim().length < 3) {
      errNama.innerText = "Nama mahasiswa minimal 3 karakter!";
      namaInput.classList.add("error");
      isValid = false;
    }

    if (!/^\d{8,}$/.test(nimInput.value.trim())) {
      errNim.innerText = "NIM harus berupa angka minimal 8 digit!";
      nimInput.classList.add("error");
      isValid = false;
    }

    if (jurusanInput.value.trim() === "") {
      errJurusan.innerText = "Jurusan wajib diisi!";
      jurusanInput.classList.add("error");
      isValid = false;
    }

    const n = parseFloat(nilaiInput.value);
    if (isNaN(n) || n < 0 || n > 100) {
      errNilai.innerText = "Nilai harus berupa angka antara 0 - 100!";
      nilaiInput.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      const newMhs = {
        nama: namaInput.value.trim(),
        nim: nimInput.value.trim(),
        jurusan: jurusanInput.value.trim(),
        nilai: n
      };

      mhsLocalStorageData.push(newMhs);
      localStorage.setItem("mhs_latihan4", JSON.stringify(mhsLocalStorageData));
      
      form.reset();
      loadMhsFromStorage();
      alert("Data mahasiswa berhasil disimpan ke LocalStorage! ✅");
    }
  });
}

function loadMhsFromStorage() {
  const saved = localStorage.getItem("mhs_latihan4");
  if (saved) {
    try {
      mhsLocalStorageData = JSON.parse(saved);
    } catch(e) {
      mhsLocalStorageData = [];
    }
  } else {
    // Default mock data if empty
    mhsLocalStorageData = [
      { nama: "Nahli Saud Ramdani", nim: "123140049", jurusan: "Teknik Informatika", nilai: 98 },
      { nama: "Siti Rahma", nim: "123140099", jurusan: "Teknik Informatika", nilai: 88 }
    ];
    localStorage.setItem("mhs_latihan4", JSON.stringify(mhsLocalStorageData));
  }
  renderStorageMhsTable();
}

function renderStorageMhsTable() {
  const tbody = document.getElementById("storageMhsTableBody");
  tbody.innerHTML = "";

  if (mhsLocalStorageData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada data di LocalStorage.</td></tr>`;
    return;
  }

  mhsLocalStorageData.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${item.nim}</strong></td>
      <td>${item.nama}</td>
      <td>${item.jurusan}</td>
      <td>${item.nilai}</td>
      <td>
        <button onclick="deleteStorageMhs(${idx})" class="btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteStorageMhs(index) {
  mhsLocalStorageData.splice(index, 1);
  localStorage.setItem("mhs_latihan4", JSON.stringify(mhsLocalStorageData));
  renderStorageMhsTable();
}

// ==========================================
// 3 & 5. API POSTS FETCH, SEARCH & PAGINATION
// ==========================================
async function initApiPosts() {
  const searchInput = document.getElementById("apiSearchInput");
  const btnPrev = document.getElementById("btnPrevPage");
  const btnNext = document.getElementById("btnNextPage");

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    apiPosts = await res.json();
    filteredPosts = [...apiPosts];
    renderApiPage();
  } catch (err) {
    document.getElementById("postsContainer").innerHTML = `<p style="color:red;">Gagal memuat API posts: ${err.message}</p>`;
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    filteredPosts = apiPosts.filter(p => p.title.toLowerCase().includes(query));
    currentPage = 1;
    renderApiPage();
  });

  btnPrev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderApiPage();
    }
  });

  btnNext.addEventListener("click", () => {
    const maxPage = Math.ceil(filteredPosts.length / postsPerPage) || 1;
    if (currentPage < maxPage) {
      currentPage++;
      renderApiPage();
    }
  });
}

function renderApiPage() {
  const container = document.getElementById("postsContainer");
  const pageIndicator = document.getElementById("pageIndicator");
  const btnPrev = document.getElementById("btnPrevPage");
  const btnNext = document.getElementById("btnNextPage");

  container.innerHTML = "";

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * postsPerPage;
  const pageItems = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (pageItems.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted);">Tidak ada post yang cocok dengan pencarian.</p>`;
  } else {
    pageItems.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h3>#${post.id} ${post.title}</h3>
        <p>${post.body}</p>
      `;
      container.appendChild(card);
    });
  }

  pageIndicator.innerText = `Halaman ${currentPage} dari ${totalPages}`;
  btnPrev.disabled = (currentPage === 1);
  btnNext.disabled = (currentPage === totalPages);
}

// ==========================================
// 6. TODO LIST APP (DOM & LOCALSTORAGE)
// ==========================================
function initTodoList() {
  const savedTodos = localStorage.getItem("todos_latihan4");
  if (savedTodos) {
    try {
      todoList = JSON.parse(savedTodos);
    } catch(e) {
      todoList = [];
    }
  } else {
    todoList = [
      { text: "Menyelesaikan Tugas Praktikum PAW Pertemuan 1", completed: true },
      { text: "Mempelajari DOM Manipulation & LocalStorage", completed: false }
    ];
    saveTodos();
  }

  document.getElementById("btnAddTodo").addEventListener("click", addTodo);
  document.getElementById("todoInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  renderTodoList();
}

function saveTodos() {
  localStorage.setItem("todos_latihan4", JSON.stringify(todoList));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text === "") return;

  todoList.push({ text, completed: false });
  saveTodos();
  input.value = "";
  renderTodoList();
}

function toggleTodo(index) {
  todoList[index].completed = !todoList[index].completed;
  saveTodos();
  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  renderTodoList();
}

function renderTodoList() {
  const container = document.getElementById("todoListContainer");
  container.innerHTML = "";

  if (todoList.length === 0) {
    container.innerHTML = `<li style="text-align:center; color: var(--text-muted); padding: 1rem;">Belum ada item todo list.</li>`;
    return;
  }

  todoList.forEach((todo, idx) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${todo.completed ? '✅ ' : '📌 '} ${todo.text}</span>
      <div class="todo-actions">
        <button onclick="toggleTodo(${idx})" class="btn-sm btn-success">${todo.completed ? 'Batal' : 'Selesai'}</button>
        <button onclick="deleteTodo(${idx})" class="btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    container.appendChild(li);
  });
}
