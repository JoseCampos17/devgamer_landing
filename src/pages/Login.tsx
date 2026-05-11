import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

const API_URL = 'https://back.devgamerpro.com';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.success) {
        login(response.data.token, response.data.user);
        setLocation('/admin-dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => setLocation('/')}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </button>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-tighter text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ADMIN <span className="text-cyan-400">LOGIN</span>
            </h1>
            <p className="text-slate-400 mt-2">Panel de gestión DevGamer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                  placeholder="admin@devgamer.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar al Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
