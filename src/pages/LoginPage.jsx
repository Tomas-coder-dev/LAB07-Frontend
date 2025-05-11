import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();

  React.useEffect(() => {
    if (loc.state?.registrationSuccess) {
      setError('Registro exitoso, inicia sesión.');
    }
  }, [loc.state]);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('role', res.data.role);
      const r = res.data.role;
      navigate(r==='admin' ? '/admin/dashboard' : r==='moderator' ? '/moderator/dashboard' : '/user/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header text-center mb-4">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales</p>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
          <p className="text-center mt-3">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
