import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      
      {/* TOP BAR */}
      <header className="dashboard-header">
        <h1 className="logo">Oficina</h1>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* CONTENT */}
      <main className="dashboard-content">
        <h2>Bem-vindo </h2>
        <p>Escolhe uma área para gerir</p>

        <div className="cards">
          <div className="card" onClick={() => navigate("/oficinas")}>
            🏭 <h3>Oficinas</h3>
            <p>Gerir oficinas registadas</p>
          </div>

          <div className="card" onClick={() => navigate("/veiculos")}>
            🚗 <h3>Veículos</h3>
            <p>Consultar e adicionar veículos</p>
          </div>

          <div className="card" onClick={() => navigate("/marcacoes")}>
            📅 <h3>Marcações</h3>
            <p>Agendar e ver marcações</p>
          </div>
        </div>
      </main>
    </div>
  );
}
