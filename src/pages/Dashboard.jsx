import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const u = localStorage.getItem('username');
    const r = localStorage.getItem('role');
    if (!token) return navigate('/login');
    setUsername(u);
    setRole(r);
    setTimeout(() => setLoading(false), 500);
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading text-center py-5" style={{background: 'var(--gamer-bg)'}}>
        <div className="spinner-border text-neon" style={{width:'3rem',height:'3rem'}} role="status"/>
      </div>
    );
  }

  return (
    <div className="dashboard-container container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <div className="welcome-card p-4 d-flex justify-content-between align-items-center">
            <div>
              <h1>Bienvenido, {username}!</h1>
              <p>
                <i className="bi bi-person-badge me-1"></i>
                {role === 'admin' ? 'Administrador' : role === 'moderador' ? 'Moderador' : 'Usuario'}
              </p>
            </div>
            <div className="avatar-lg rounded-circle d-flex align-items-center justify-content-center fs-2">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-3">
        {[
          { icon: 'calendar-check', label: 'Mis Eventos' },
          { icon: 'file-earmark-text', label: 'Documentos' },
          { icon: 'people', label: 'Contactos' },
          { icon: 'gear', label: 'Configuración' }
        ].map((b,i) => (
          <div key={i} className="col-md-6 mb-4">
            <button className="btn-action-card w-100 h-100 py-3 text-center">
              <i className={`bi bi-${b.icon} fs-2 mb-2`}></i>
              <h6>{b.label}</h6>
            </button>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="card shadow-sm p-3" style={{background: 'var(--gamer-surface)'}}>
            <h5 className="mb-3"><i className="bi bi-clock-history me-2"></i>Actividad Reciente</h5>
            <div className="activity-timeline">
              {[
                { time: 'Hace 15 minutos', text: 'Has iniciado sesión correctamente' },
                { time: 'Ayer, 14:32', text: 'Actualizaste tu perfil' },
                { time: 'Lunes, 09:15', text: 'Subiste un documento' }
              ].map((act,i) => (
                <div key={i} className="activity-item d-flex mb-3">
                  <div className="activity-badge me-3"></div>
                  <div className="activity-content">
                    <small>{act.time}</small>
                    <p className="mb-0">{act.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline-secondary mt-3">Ver toda la actividad</button>
          </div>
        </div>
        {/* Aquí podrías añadir más estadísticas */}
      </div>
    </div>
  );
}
