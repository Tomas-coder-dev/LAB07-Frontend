import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-controller me-2"></i>
          Sistema de Gestión Gamer
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i> Admin
                </Link>
              </li>
            )}
            {role === 'moderador' && (
              <li className="nav-item">
                <Link className="nav-link" to="/moderator/dashboard">
                  <i className="bi bi-clipboard-data me-1"></i> Moderador
                </Link>
              </li>
            )}
            {role === 'usuario' && (
              <li className="nav-item">
                <Link className="nav-link" to="/user/dashboard">
                  <i className="bi bi-person-circle me-1"></i> Mi Panel
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            {username ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <div className="avatar-sm me-2">
                    <span className="avatar-text">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="nav-link">{username} <small>({role})</small></span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light me-2" to="/">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light text-primary" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
