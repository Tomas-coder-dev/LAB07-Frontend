import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData(){
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = data || {
    totalUsers: 1243,
    activeToday: 842,
    newRegistrations: 28,
    adminCount: 5,
    recentActivity: []
  };

  return (
    <div className="admin-dashboard container-fluid py-4">
      <h1>
        <i className="bi bi-shield-lock me-2"></i>Panel Gamer
      </h1>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-neon" role="status" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="row mb-4">
            {[
              { label: "Usuarios Totales", value: stats.totalUsers, icon: "people-fill" },
              { label: "Activos Hoy", value: stats.activeToday, icon: "activity" },
              { label: "Registros Nuevos", value: stats.newRegistrations, icon: "person-plus" },
              { label: "Admins", value: stats.adminCount, icon: "shield-check" },
            ].map((s,i) => (
              <div key={i} className="col-md-3 mb-3">
                <div className="card stat-card p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small>{s.label}</small>
                      <h2>{s.value}</h2>
                    </div>
                    <i className={`bi bi-${s.icon} fs-1`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Puedes adaptar aquí la tabla de actividad reciente con las mismas clases */}
        </>
      )}
    </div>
  );
}
