import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LayoutDashboard, Mic2, Users, Layers, LogOut, Loader2, Plus, AlertCircle, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


import axios from 'axios';
import { toast } from 'sonner';

const API_URL = 'https://back.devgamerpro.com';

interface Stats {
  total_episodes: number;
  total_seasons: number;
  total_admins: number;
}

export default function AdminDashboard() {
  const { user, token, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'podcasts'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [episodeToDelete, setEpisodeToDelete] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [statsRes, episodesRes] = await Promise.all([
        axios.get(`${API_URL}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/episodes?limit=100`)
      ]);
      setStats(statsRes.data.data);
      setEpisodes(episodesRes.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return; // Esperar a que AuthContext cargue desde localStorage
    if (!isAuthenticated) {
      setLocation('/admin-login');
      return;
    }
    fetchData();
  }, [isAuthenticated, authLoading, token, setLocation]);

  const handleLogout = () => {
    logout();
    setLocation('/admin-login');
    toast.success('Sesión cerrada correctamente');
  };

  const handleSaveEpisode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (editingEpisode) {
        await axios.put(`${API_URL}/episodes/${editingEpisode.id}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Episodio actualizado con éxito');
      } else {
        await axios.post(`${API_URL}/episodes`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Nuevo episodio publicado');
      }
      setIsModalOpen(false);
      setEditingEpisode(null);
      fetchData();
    } catch (err) {
      toast.error('Error al guardar: verifica tu conexión o archivos');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (episode: any) => {
    setEditingEpisode(episode);
    setIsModalOpen(true);
  };

  const confirmDelete = (episode: any) => {
    setEpisodeToDelete(episode);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!episodeToDelete) return;
    try {
      await axios.delete(`${API_URL}/episodes/${episodeToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Episodio eliminado correctamente');
      setIsDeleteModalOpen(false);
      setEpisodeToDelete(null);
      fetchData();
    } catch (err) {
      toast.error('No se pudo eliminar el episodio');
    }
  };

  if (authLoading || (isAuthenticated && loading)) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col relative">

      {/* ── TOPBAR MÓVIL con hamburguesa ── */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d1526] border-b-2 border-cyan-500/60">
        <span className="text-cyan-400 font-black tracking-widest text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>DEVGAMER</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col justify-center gap-[5px] w-10 h-10 items-center rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition"
          aria-label="Abrir menú"
        >
          <span className="block w-5 h-0.5 bg-cyan-400 rounded"/>
          <span className="block w-5 h-0.5 bg-cyan-400 rounded"/>
          <span className="block w-5 h-0.5 bg-cyan-400 rounded"/>
        </button>
      </header>

      {/* ── OVERLAY ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── DRAWER LATERAL MÓVIL ── */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0d1526] border-r border-white/10 z-[70] flex flex-col p-6 md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-black tracking-tighter text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            DEV<span className="text-cyan-400">GAMER</span>
          </h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        <nav className="space-y-2 flex-1">
          <button
            onClick={() => { setActiveTab('overview'); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm transition ${
              activeTab === 'overview'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('podcasts'); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm transition ${
              activeTab === 'podcasts'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic2 className="h-4 w-4" />
            Podcasts
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition text-sm font-bold"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>

      {/* ── WRAPPER: sidebar + main en desktop ── */}
      <div className="flex flex-1">
      {/* Modal para Nuevo/Editar Episodio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {editingEpisode ? 'EDITAR' : 'NUEVO'} <span className="text-cyan-400">EPISODIO</span>
                </h3>
                <button onClick={() => { setIsModalOpen(false); setEditingEpisode(null); }} className="text-slate-400 hover:text-white transition">✕</button>
              </div>

              <form onSubmit={handleSaveEpisode} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Título del Episodio</label>
                    <input name="title" required defaultValue={editingEpisode?.title} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Ej: Introducción al Gaming" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Temporada</label>
                    <input name="season" type="number" defaultValue={editingEpisode?.season || "1"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Nº Episodio</label>
                    <input name="episode_number" type="number" defaultValue={editingEpisode?.episode_number} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Duración</label>
                    <input name="duration" defaultValue={editingEpisode?.duration} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Ej: 45 min" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Tono/Categoría</label>
                    <input name="tone" defaultValue={editingEpisode?.tone} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Ej: Entrevista" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Descripción</label>
                    <textarea name="description" rows={3} defaultValue={editingEpisode?.description} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="De qué trata este episodio..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Archivo de Audio</label>
                    <input name="audio" type="file" accept="audio/*" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20" />
                    {editingEpisode?.audio_url && <p className="text-[10px] text-slate-500 mt-1 truncate">Actual: {editingEpisode.audio_url}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Imagen de Portada (Miniatura)</label>
                    <input name="image" type="file" accept="image/*" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20" />
                    {editingEpisode?.image_url && <p className="text-[10px] text-slate-500 mt-1 truncate">Actual: {editingEpisode.image_url}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button type="button" onClick={() => { setIsModalOpen(false); setEditingEpisode(null); }} className="px-6 py-2.5 text-slate-400 hover:text-white transition">Cancelar</button>
                  <button type="submit" disabled={formLoading} className="bg-cyan-500 hover:bg-cyan-400 text-[#070b14] font-black px-8 py-2.5 rounded-xl transition flex items-center gap-2">
                    {formLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : editingEpisode ? 'GUARDAR CAMBIOS' : 'PUBLICAR AHORA'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-red-500/20 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">¿Estás seguro?</h3>
              <p className="text-slate-400 text-sm mb-6">
                Vas a eliminar el episodio <span className="text-white font-bold">"{episodeToDelete?.title}"</span>. Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition font-bold text-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-xl transition font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-black tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            DEV<span className="text-cyan-400">GAMER</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Panel</p>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition font-bold text-sm ${
              activeTab === 'overview' 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('podcasts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition font-bold text-sm ${
              activeTab === 'podcasts' 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic2 className="h-4 w-4" />
            Podcasts
          </button>
        </nav>

        <div className="mt-auto pt-10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition text-sm font-bold"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold">Bienvenido, {user?.name}</h2>
            <p className="text-slate-400">
              {activeTab === 'overview' ? 'Aquí tienes un resumen de tu contenido.' : 'Gestiona tus episodios de podcast.'}
            </p>
          </div>
        </header>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <StatCard 
                icon={<Mic2 className="h-6 w-6 text-cyan-400" />} 
                label="Total Episodios" 
                value={stats?.total_episodes || 0} 
                color="border-cyan-400/20"
              />
              <StatCard 
                icon={<Layers className="h-6 w-6 text-violet-400" />} 
                label="Temporadas" 
                value={stats?.total_seasons || 0} 
                color="border-violet-400/20"
              />
              <StatCard 
                icon={<Users className="h-6 w-6 text-amber-400" />} 
                label="Administradores" 
                value={stats?.total_admins || 0} 
                color="border-amber-400/20"
              />
            </div>

            {/* Status Card */}
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Estado del Sistema</h3>
              <div className="flex items-center gap-3 text-emerald-400 text-sm font-medium bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Backend conectado y operativo en Supabase (AWS us-east-1)
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Lista de Episodios</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#070b14] font-black px-6 py-2.5 rounded-xl transition flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Plus className="h-4 w-4" />
                NUEVO EPISODIO
              </button>
            </div>
            
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-widest text-slate-500 font-bold">
                    <th className="px-6 py-4">Imagen</th>
                    <th className="px-6 py-4">Episodio</th>
                    <th className="px-6 py-4 text-center">Temp.</th>
                    <th className="px-6 py-4">Duración</th>
                    <th className="px-6 py-4">Estatus</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {episodes.map((ep) => (
                    <tr key={ep.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-6 py-4">
                        {ep.image_url ? (
                          <img 
                            src={ep.image_url} 
                            alt={ep.title} 
                            onClick={() => setPreviewImage(ep.image_url)}
                            className="h-10 w-16 object-cover rounded-lg border border-white/10 cursor-zoom-in hover:scale-105 transition" 
                          />
                        ) : (
                          <div className="h-10 w-16 bg-white/5 rounded-lg border border-dashed border-white/20 flex items-center justify-center">
                            <Mic2 className="h-4 w-4 text-slate-600" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{ep.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">{ep.description}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-cyan-400 font-mono">S{ep.season} E{ep.episode_number}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{ep.duration || '--'}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/20">
                          {ep.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(ep)}
                          className="text-cyan-400 hover:text-cyan-300 transition p-2 hover:bg-cyan-500/10 rounded-lg text-sm font-bold"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => confirmDelete(ep)}
                          className="text-red-400 hover:text-red-300 transition p-2 hover:bg-red-500/10 rounded-lg text-sm font-bold"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {episodes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        No hay episodios registrados. ¡Crea el primero!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      </div> {/* cierra el flex wrapper desktop */}

      {/* Visor de Imagen Full-Screen */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition flex items-center gap-2 font-bold"
              onClick={() => setPreviewImage(null)}
            >
              CERRAR ✕
            </button>
            <img 
              src={previewImage} 
              className="rounded-2xl shadow-2xl border border-white/10 max-h-[80vh] object-contain"
              alt="Preview" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  return (
    <div className={`bg-[#0f172a] border ${color} rounded-2xl p-6 flex items-center gap-5`}>
      <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black mt-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</p>
      </div>
    </div>
  );
}
