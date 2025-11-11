// client/src/components/admin/AddMember.jsx
import React, { useState } from 'react';
import { addMember, addBulkMembers } from '../../services/api';
import { HiPaperClip, HiX } from 'react-icons/hi';

function AddMember() {
  // --- form manual (tanpa perubahan) ---
  const [nim, setNim] = useState('');
  const [namaAsli, setNamaAsli] = useState('');

  // --- CSV upload (baru: drag & drop seperti UploadMateri) ---
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // ====== HANDLERS: MANUAL ======
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage(null); setError(null);
    try {
      await addMember({ nim, namaAsli });
      setMessage(`Anggota ${namaAsli} berhasil ditambahkan!`);
      setNim(''); setNamaAsli('');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // ====== HANDLERS: CSV DROPZONE ======
  const acceptCsv = (f) => f && f.type && (f.type.includes('csv') || f.name.toLowerCase().endsWith('.csv'));

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f && acceptCsv(f)) setFile(f);
    else if (f) setError('File harus berformat .csv');
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && acceptCsv(f)) setFile(f);
    else if (f) setError('File harus berformat .csv');
  };

  const removeFile = () => setFile(null);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Pilih / drop file CSV terlebih dahulu'); return; }

    setLoading(true); setMessage(null); setError(null);

    const formData = new FormData();
    formData.append('fileCSV', file);

    try {
      const data = await addBulkMembers(formData);
      setMessage(data.message || 'Upload CSV berhasil');
      setFile(null);
      // reset input file element supaya bisa memilih file yang sama lagi
      e.target.reset?.();
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Kartu: Tambah satu-satu (tetap) */}
      <div className="p-6 bg-neum-bg rounded-lg shadow-neum-in">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Tambah Satu-satu</h3>
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-2">NIM</label>
            <input
              placeholder="Masukan NIM"
              type="text" id="nim" value={nim} onChange={(e) => setNim(e.target.value)} required
              className="w-full px-4 py-3 bg-neum-bg rounded-lg shadow-neum-in focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="namaAsli" className="block text-sm font-medium text-gray-700 mb-2">Nama Asli</label>
            <input
              placeholder="Masukan Nama ASLI"
              type="text" id="namaAsli" value={namaAsli} onChange={(e) => setNamaAsli(e.target.value)} required
              className="w-full px-4 py-3 bg-neum-bg rounded-lg shadow-neum-in focus:outline-none"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 px-4 bg-neum-bg text-blue-600 font-semibold rounded-lg shadow-neum-out hover:shadow-neum-out-hover disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Tambah Anggota'}
          </button>
        </form>
      </div>

      {/* Kartu: Upload via CSV (baru: drag & drop) */}
      <div className="p-6 bg-neum-bg rounded-lg shadow-neum-in">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Upload via CSV</h3>

        <form onSubmit={handleFileSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fileCSV"
              className={`flex flex-col items-center justify-center w-full h-32 px-4 py-3 bg-neum-bg rounded-lg shadow-neum-in cursor-pointer transition
                         ${isDragging ? 'shadow-neum-out' : ''}`}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            >
              <p className="text-gray-500 text-sm">Drag &amp; drop file CSV di sini</p>
              <p className="text-gray-400 text-xs">atau klik untuk pilih file (.csv)</p>
              <input
                type="file" id="fileCSV" accept=".csv" onChange={handleFileChange}
                className="opacity-0 w-0 h-0"
              />
            </label>
          </div>

          {file && (
            <div className="p-4 bg-neum-bg rounded-lg shadow-neum-in">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="flex items-center truncate">
                  <HiPaperClip className="mr-2" /> {file.name}
                </span>
                <button type="button" onClick={removeFile} className="text-accent-red hover:text-red-700">
                  <HiX />
                </button>
              </div>
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 px-4 bg-neum-bg text-blue-600 font-semibold rounded-lg shadow-neum-out hover:shadow-neum-out-hover active:shadow-neum-in-active disabled:opacity-50"
          >
            {loading ? 'Mengupload...' : 'Upload File'}
          </button>
        </form>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default AddMember;
