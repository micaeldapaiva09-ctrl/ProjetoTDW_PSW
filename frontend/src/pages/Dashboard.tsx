import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  const userNome = localStorage.getItem("user_nome");
  const userRole = localStorage.getItem("user_role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!userId) {
    return (
      <div className="dashboard-unauth">
        <h2>Não autenticado</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }

  return (
    <>
      <nav className="dashboard-navbar">
        <h2>Oficina</h2>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/oficinas">Oficinas</Link>
          <Link to="/veiculos">Veículos</Link>
          <Link to="/marcacoes">Marcações</Link>
        </div>

        <button onClick={logout}>Logout</button>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>Bem-vindo, {userNome}</h1>
          <p>Perfil: {userRole}</p>
        </div>
      </div>
    </>
  );
}
