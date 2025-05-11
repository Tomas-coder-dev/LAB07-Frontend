import React from 'react';
import './UserDashboard.css';

export default function UserDashboard() {
  const username = localStorage.getItem('username') || 'Usuario';
  return (
    <div className="user-dashboard container-fluid py-4">
      <h1><i className="bi bi-person-circle me-2"></i>Mi Panel Gamer</h1>

      <div className="row g-4 my-4">
        {/* Mi Cuenta */}
        <div className="col-md-4">
          <div className="card p-3 border-primary">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-person-badge me-2"></i>Mi Cuenta</h5>
            </div>
            <div className="card-body text-center">
              <div className="avatar-lg rounded-circle mb-2">{username.charAt(0).toUpperCase()}</div>
              <h5>{username}</h5>
              <p className="small">Miembro desde: Ene 2023</p>
              <button className="btn btn-outline-primary w-100">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Mi Actividad */}
        <div className="col-md-4">
          <div className="card p-3 border-info">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-graph-up me-2"></i>Mi Actividad</h5>
            </div>
            <div className="card-body text-center">
              <div className="row mb-3">
                <div className="col-6 border-end">
                  <h3>24</h3><small>Contribuciones</small>
                </div>
                <div className="col-6">
                  <h3>5</h3><small>Amigos</small>
                </div>
              </div>
              <button className="btn btn-outline-primary">Ver Detalles</button>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="col-md-4">
          <div className="card p-3 border-success">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-lightning-charge me-2"></i>Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">Crear Contenido</button>
                <button className="btn btn-outline-primary">Invitar Amigos</button>
                <button className="btn btn-outline-primary">Configuración</button>
                <button className="btn btn-outline-primary">Soporte</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="row">
        <div className="col">
          <div className="card p-3">
            <h5><i className="bi bi-clock-history me-2"></i>Tu Actividad Reciente</h5>
            <div className="activity-feed mt-3">
              {[
                { time: 'Hoy, 10:30 AM', icon:'file-earmark-text', text:'Publicaste un artículo' },
                { time: 'Ayer, 4:15 PM', icon:'chat-left-text', text:'Comentaste en una publicación' },
                { time: 'Ayer, 11:20 AM', icon:'person-plus', text:'Agregaste un amigo' }
              ].map((a,i) => (
                <div key={i} className="d-flex mb-3">
                  <div className="activity-icon me-3 rounded-circle d-flex align-items-center justify-content-center p-2">
                    <i className={`bi bi-${a.icon}`}></i>
                  </div>
                  <div>
                    <small className="d-block">{a.time}</small>
                    <p className="mb-0">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="btn btn-outline-primary mt-2">Ver Toda la Actividad</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
