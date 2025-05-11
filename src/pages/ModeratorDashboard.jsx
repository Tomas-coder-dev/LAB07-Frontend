import React from 'react';
import './ModeratorDashboard.css';

export default function ModeratorDashboard() {
  return (
    <div className="moderator-dashboard container-fluid py-4">
      <h1><i className="bi bi-shield-check me-2"></i>Panel Moderador</h1>

      <div className="row g-4 my-4">
        {/* Tu Rol */}
        <div className="col-md-4">
          <div className="card p-3 border-primary">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-info-circle me-2"></i>Tu Rol</h5>
            </div>
            <div className="card-body">
              <p>Como <strong>Moderador</strong> mantienes la calidad de la plataforma.</p>
              <ul className="list-group">
                <li className="list-group-item">Supervisión de contenido</li>
                <li className="list-group-item">Resolución de reportes</li>
                <li className="list-group-item">Asistencia a usuarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gestión de Usuarios */}
        <div className="col-md-4">
          <div className="card p-3 border-warning">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-people-fill me-2"></i>Gestión de Usuarios</h5>
            </div>
            <div className="card-body">
              <p>Acciones disponibles:</p>
              <ul className="list-group">
                <li className="list-group-item">Verificar cuentas</li>
                <li className="list-group-item">Enviar advertencias</li>
                <li className="list-group-item">Supervisar actividad</li>
                <li className="list-group-item">Reportar usuarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Herramientas */}
        <div className="col-md-4">
          <div className="card p-3 border-success">
            <div className="card-header bg-transparent border-0">
              <h5><i className="bi bi-tools me-2"></i>Herramientas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">Panel de Reportes</button>
                <button className="btn btn-outline-primary">Moderación de Comentarios</button>
                <button className="btn btn-outline-primary">Revisión de Contenido</button>
                <button className="btn btn-outline-primary">Estadísticas</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="row">
        <div className="col">
          <div className="card p-3">
            <h5><i className="bi bi-clock-history me-2"></i>Actividad Requiere Atención</h5>
            <div className="table-responsive">
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th><th>Tipo</th><th>Usuario</th><th>Detalle</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#1254', type: 'Comentario', user: 'usuario23', detail: 'Lenguaje inapropiado' },
                    { id: '#1253', type: 'Reporte', user: 'usuario45', detail: 'Contenido duplicado' },
                    { id: '#1252', type: 'Solicitud', user: 'usuario12', detail: 'Verificación cuenta' }
                  ].map((row,i) => (
                    <tr key={i}>
                      <td>{row.id}</td>
                      <td><span className="badge">{row.type}</span></td>
                      <td>{row.user}</td>
                      <td>{row.detail}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Revisar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
