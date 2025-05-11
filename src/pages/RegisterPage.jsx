import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "", password: "", confirmPassword: "", role: "user"
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const validateForm = () => {
    const errs = {};
    if (formData.username.length < 4) errs.username = "Mínimo 4 caracteres";
    if (formData.password.length < 6) errs.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "No coincide";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setServerError("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/auth/register`, {
        username: formData.username,
        password: formData.password,
        role: formData.role
      });
      if (res.data.success) {
        navigate("/login", { state: { registrationSuccess: true } });
      }
    } catch (err) {
      setServerError(err.response?.data?.message || "Error en el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header text-center mb-4">
          <h2>Crear Cuenta</h2>
          <p>Completa el formulario</p>
        </div>

        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {[
            { name:'username', label:'Usuario', type:'text' },
            { name:'password', label:'Contraseña', type:'password' },
            { name:'confirmPassword', label:'Confirmar Contraseña', type:'password' }
          ].map((f,i) => (
            <div className="mb-3" key={i}>
              <label>{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                className={`form-control${errors[f.name] ? ' is-invalid' : ''}`}
                value={formData[f.name]}
                onChange={handleChange}
                required
              />
              {errors[f.name] && <div className="invalid-feedback">{errors[f.name]}</div>}
            </div>
          ))}

          <div className="mb-4">
            <label>Tipo de Cuenta</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="moderator">Moderador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button className="btn btn-primary w-100 py-2 mb-3" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
          <p className="text-center">
            ¿Ya tienes cuenta? <Link to="/">Iniciar Sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
