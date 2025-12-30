# AAC Frontend – React

Repository ini berisi **frontend aplikasi AAC (Augmentative and Alternative Communication)** yang dibangun menggunakan **React.js**. Frontend ini berfungsi sebagai antarmuka pengguna untuk berinteraksi dengan backend berbasis Django dan model LLM.

Untuk mendapatkan **full experience aplikasi AAC**, silakan gunakan repository berikut:

* **Backend (Django + LLM API)**: [https://github.com/Nicholas-Martin007/Backend-LLM-Django](https://github.com/Nicholas-Martin007/Backend-LLM-Django)
* **Fine-Tuned LLM (Python)**: [https://github.com/Nicholas-Martin007/AAC-Story-Generation](https://github.com/Nicholas-Martin007/AAC-Story-Generation)

---

## 🖥️ System Requirements

Untuk menjalankan frontend React secara optimal, disarankan menggunakan spesifikasi berikut:

* **Processor**: Intel Core i5 (atau setara)
* **RAM**: 8 GB (16 GB direkomendasikan)
* **Browser**: Chrome / Edge versi terbaru
* **Node.js**: v18 atau lebih baru

> ⚠️ Spesifikasi lebih tinggi direkomendasikan jika frontend dijalankan bersamaan dengan backend LLM.

---

## ⚙️ Setup & Installation

Pastikan **Node.js** dan **npm** telah terpasang. Setelah itu, jalankan perintah berikut:

```bash
git clone https://github.com/Nicholas-Martin007/AAC-React.git
cd AAC-React
npm install
```

---

## 🚀 Running Frontend Server

Setelah instalasi selesai, jalankan frontend dengan perintah:

```bash
npm start
```

Secara default, aplikasi akan berjalan pada:

```text
http://localhost:3000/
```

Frontend ini akan berkomunikasi langsung dengan backend Django untuk proses inferensi LLM dan manajemen data.

---

## 🔗 Backend Integration

Pastikan backend Django telah berjalan terlebih dahulu:

```text
http://127.0.0.1:8000/
```

Konfigurasi endpoint API dapat disesuaikan pada file environment atau konfigurasi service API di dalam project React.

---

## 📦 Dependencies

Seluruh dependency frontend dikelola menggunakan **npm** dan dapat dilihat pada file:

```text
package.json
```

---

## 📘 Documentation

Panduan penggunaan aplikasi AAC secara lengkap dapat dilihat pada:

* **Manual Book**: `535220027_Manual Book.pdf`
