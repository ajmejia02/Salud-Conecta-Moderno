const fs = require('fs');

const loginCode = `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Chrome } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { signInWithGoogle, signInWithGoogleRedirect } from '../../lib/firebase';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const { t = 'es' } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await signInWithGoogle(email, password);
      if (onLogin) {
        onLogin();
      }
      setLoading(false);
    } catch (err) {
      setError('No se pudo iniciar sesión. Intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleGoogleRedirect = async () => {
    try {
      const result = await signInWithGoogleRedirect();
      if (result && onLogin) {
        onLogin();
      }
    } catch (err) {
      setError('Error iniciando sesión con Google');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t === 'es' ? 'Bienvenido de nuevo' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {t === 'es' ? 'Ingresa tus credenciales' : 'Enter your credentials'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t === 'es' ? 'Correo electrónico' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t === 'es' ? 'Contraseña' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading
              ? t === 'es' ? 'Cargando...' : 'Loading...'
              : t === 'es' ? 'Iniciar Sesión' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t === 'es' ? '¿No tienes cuenta? ' : "Don't have an account? "}
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              {t === 'es' ? 'Regístrate' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleGoogleRedirect}
            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5" />
            {t === 'es' ? 'Continuar con Google' : 'Continue with Google'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}`;