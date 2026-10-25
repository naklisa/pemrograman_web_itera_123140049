import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from '../components/BookForm/BookForm';

describe('Komponen BookForm (Validasi & Error Handling)', () => {
  it('menampilkan pesan error validasi ketika disubmit dalam keadaan kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /simpan buku/i });
    fireEvent.click(submitBtn);

    // Verifikasi pesan error visual muncul
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis buku wajib diisi.')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('menampilkan pesan error jika judul buku kurang dari 2 karakter', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const titleInput = screen.getByPlaceholderText(/contoh: clean code/i);
    fireEvent.change(titleInput, { target: { value: 'A' } });

    const submitBtn = screen.getByRole('button', { name: /simpan buku/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Judul buku minimal harus 2 karakter.')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('berhasil memanggil onSubmit dengan data valid saat form diisi dengan benar', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const titleInput = screen.getByPlaceholderText(/contoh: clean code/i);
    const authorInput = screen.getByPlaceholderText(/contoh: robert c. martin/i);
    const statusSelect = screen.getByLabelText(/status buku/i);
    const yearInput = screen.getByPlaceholderText(/contoh: 2021/i);

    fireEvent.change(titleInput, { target: { value: 'Refactoring' } });
    fireEvent.change(authorInput, { target: { value: 'Martin Fowler' } });
    fireEvent.change(statusSelect, { target: { value: 'milik' } });
    fireEvent.change(yearInput, { target: { value: '2019' } });

    const submitBtn = screen.getByRole('button', { name: /simpan buku/i });
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Refactoring',
        author: 'Martin Fowler',
        status: 'milik',
        year: 2019,
      })
    );
  });

  it('memanggil onCancel ketika tombol Batal diklik', () => {
    const handleCancel = vi.fn();
    render(<BookForm onSubmit={vi.fn()} onCancel={handleCancel} />);

    const cancelBtn = screen.getByRole('button', { name: /batal/i });
    fireEvent.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
