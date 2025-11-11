// client/src/pages/admin/AdminLogin.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleMessage = useCallback((event) => {
    if (event.origin === 'http://localhost:5000') {
      const data = event.data;
      if (data && data.token) {
        login(data);
        navigate('/admin');
      } else if (data && data.error) {
        setError(data.error);
      } else {
        setError('Terjadi kesalahan tidak diketahui saat login.');
      }
    }
  }, [login, navigate]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const openGoogleLogin = () => {
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = 'http://localhost:5000/api/auth/google';
    window.open(
      url,
      'googleLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neum-bg overflow-hidden">
      {/* Background accent blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(35% 35% at 50% 50%, rgba(24,119,242,0.25), transparent)' }}
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(35% 35% at 50% 50%, rgba(234,67,53,0.18), transparent)' }}
        animate={{ x: [0, -20, 10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-[92%] max-w-md p-8 md:p-10 bg-neum-bg rounded-2xl shadow-neum-out border-t-4 border-accent-blue"
        role="dialog"
        aria-labelledby="admin-login-title"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-neum-in"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4Z" />
            </svg>
          </motion.div>
          <h1 id="admin-login-title" className="text-2xl md:text-3xl font-bold text-gray-800">
            Login Admin
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Masuk untuk mengelola konten dan konfigurasi website.
          </p>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          onClick={openGoogleLogin}
          className="group w-full py-3 px-4 bg-neum-bg text-gray-800 font-semibold rounded-xl shadow-neum-out hover:shadow-neum-out-hover active:shadow-neum-in-active transition-all duration-150 flex items-center justify-center gap-3"
          aria-label="Login dengan Google"
        >
          <span className="inline-flex h-5 w-5">
            {/* Google SVG */}
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 31.9 29.4 35 24 35c-7 0-12.8-5.8-12.8-12.8S17 9.5 24 9.5c3.1 0 5.9 1.1 8.1 3.1l5.7-5.7C34.5 3.5 29.6 1.5 24 1.5 11.9 1.5 2 11.4 2 23.5S11.9 45.5 24 45.5 46 35.6 46 23.5c0-1-.1-2-.4-3z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.8 18.9 13 24 13c3.1 0 5.9 1.1 8.1 3.1l5.7-5.7C34.5 6.9 29.6 4.9 24 4.9 15.3 4.9 7.8 9.8 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 42.1c5.3 0 10.1-2 13.6-5.3l-6.3-5.2c-2 1.4-4.6 2.3-7.3 2.3-5.3 0-9.8-3.6-11.4-8.5l-6.5 5C8.8 37.7 15.9 42.1 24 42.1z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.6 5.8-7 7.1l6.3 5.2C37.7 38.5 42 32.7 42 25.5c0-1-.1-2-.4-3z"/>
            </svg>
          </span>
          <span>Login dengan Google</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            →
          </span>
        </motion.button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4 text-xs text-gray-400">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
          <span>secure login</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
        </div>

        {/* Tips / Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[13px] text-gray-500 text-center"
        >
          Pastikan pop-up tidak diblokir oleh browser saat proses otentikasi.
        </motion.div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-accent-red text-center"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default AdminLogin;
