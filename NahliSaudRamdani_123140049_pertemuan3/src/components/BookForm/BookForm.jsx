import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const CATEGORY_OPTIONS = [
  'Teknologi',
  'Pengembangan Diri',
  'Sains & Sejarah',
  'Fiksi & Sastra',
  'Bisnis & Finansial',
  'Filsafat',
  'Komik & Grafis',
  'Lainnya',
];

function BookForm({ initialData, onSubmit, onCancel, submitLabel = 'Simpan Buku' }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik',
    category: 'Teknologi',
    year: '',
    rating: 0,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        status: initialData.status || 'milik',
        category: initialData.category || 'Teknologi',
        year: initialData.year ? String(initialData.year) : '',
        rating: initialData.rating || 0,
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const validate = (data) => {
    const newErrors = {};

    if (!data.title || !data.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi.';
    } else if (data.title.trim().length < 2) {
      newErrors.title = 'Judul buku minimal harus 2 karakter.';
    }

    if (!data.author || !data.author.trim()) {
      newErrors.author = 'Nama penulis buku wajib diisi.';
    } else if (data.author.trim().length < 2) {
      newErrors.author = 'Nama penulis minimal 2 karakter.';
    }

    if (!data.status) {
      newErrors.status = 'Status buku wajib dipilih.';
    }

    if (data.year) {
      const yearNum = Number(data.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1500 || yearNum > currentYear + 1) {
        newErrors.year = `Tahun terbit harus berupa angka valid (1500 - ${currentYear + 1}).`;
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setTouched({
      title: true,
      author: true,
      status: true,
      year: true,
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      year: formData.year ? Number(formData.year) : undefined,
      rating: Number(formData.rating) || 0,
      notes: formData.notes.trim(),
    });

    if (!initialData) {
      setFormData({
        title: '',
        author: '',
        status: 'milik',
        category: 'Teknologi',
        year: '',
        rating: 0,
        notes: '',
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      {/* Kolom Judul Buku */}
      <div className="form-group">
        <label htmlFor="book-title" className="form-label">
          Judul Buku <span className="required-star">*</span>
        </label>
        <input
          type="text"
          id="book-title"
          name="title"
          className={`form-input ${errors.title && touched.title ? 'is-invalid' : ''}`}
          placeholder="Contoh: Clean Code"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.title && touched.title ? 'true' : 'false'}
        />
        {errors.title && touched.title && (
          <span className="error-feedback" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      {/* Kolom Penulis */}
      <div className="form-group">
        <label htmlFor="book-author" className="form-label">
          Penulis / Pengarang <span className="required-star">*</span>
        </label>
        <input
          type="text"
          id="book-author"
          name="author"
          className={`form-input ${errors.author && touched.author ? 'is-invalid' : ''}`}
          placeholder="Contoh: Robert C. Martin"
          value={formData.author}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.author && touched.author ? 'true' : 'false'}
        />
        {errors.author && touched.author && (
          <span className="error-feedback" role="alert">
            {errors.author}
          </span>
        )}
      </div>

      {/* Baris Status & Kategori */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="book-status" className="form-label">
            Status Buku <span className="required-star">*</span>
          </label>
          <select
            id="book-status"
            name="status"
            className={`form-select ${errors.status && touched.status ? 'is-invalid' : ''}`}
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="milik">Milik (Koleksi Pribadi)</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli (Wishlist)</option>
          </select>
          {errors.status && touched.status && (
            <span className="error-feedback" role="alert">
              {errors.status}
            </span>
          )}
        </div>

        <div className="form-group flex-1">
          <label htmlFor="book-category" className="form-label">
            Kategori / Genre
          </label>
          <select
            id="book-category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Baris Tahun & Rating */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="book-year" className="form-label">
            Tahun Terbit (Opsional)
          </label>
          <input
            type="number"
            id="book-year"
            name="year"
            className={`form-input ${errors.year && touched.year ? 'is-invalid' : ''}`}
            placeholder="Contoh: 2021"
            value={formData.year}
            onChange={handleChange}
            onBlur={handleBlur}
            min="1500"
            max={new Date().getFullYear() + 1}
          />
          {errors.year && touched.year && (
            <span className="error-feedback" role="alert">
              {errors.year}
            </span>
          )}
        </div>

        <div className="form-group flex-1">
          <label htmlFor="book-rating" className="form-label">
            Rating Pribadi (1 - 5)
          </label>
          <select
            id="book-rating"
            name="rating"
            className="form-select"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="0">Belum diberi rating</option>
            <option value="1">⭐ 1 - Kurang</option>
            <option value="2">⭐⭐ 2 - Cukup</option>
            <option value="3">⭐⭐⭐ 3 - Bagus</option>
            <option value="4">⭐⭐⭐⭐ 4 - Sangat Bagus</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 - Mahakarya</option>
          </select>
        </div>
      </div>

      {/* Catatan Tambahan */}
      <div className="form-group">
        <label htmlFor="book-notes" className="form-label">
          Catatan / Ulasan Singkat (Opsional)
        </label>
        <textarea
          id="book-notes"
          name="notes"
          className="form-textarea"
          placeholder="Tuliskan kesan, bab penting, atau alasan ingin membeli..."
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
        <button type="submit" className="btn-submit" id="btn-submit-book">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
    category: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    notes: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default BookForm;
