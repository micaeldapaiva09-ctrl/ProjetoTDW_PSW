import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./Oficina.css";

interface Oficina {
  _id: string;
  nome: string;
  localizacao: string;
}

export default function Oficinas() {
  const [oficinas, setOficinas] = useState<Oficina[]>([]);
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await api.get("/oficinas");
        setOficinas(res.data);
      } catch (err) {
        console.error("Erro ao carregar oficinas", err);
      }
    };

    carregar();
  }, []);

  // 🔹 criar oficina
  const criar = async () => {
    if (!nome || !localizacao) return;

    await api.post("/oficinas", {
      nome,
      localizacao,
    });

    setNome("");
    setLocalizacao("");

    const res = await api.get("/oficinas");
    setOficinas(res.data);
  };

  return (
    <div className="page">
      <h1>Oficinas</h1>

      <Link className="back" to="/dashboard">
        ⬅ Dashboard
      </Link>

      <input
        placeholder="Nome da oficina"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="Localização"
        value={localizacao}
        onChange={e => setLocalizacao(e.target.value)}
      />

      <button onClick={criar}>Adicionar</button>

      <ul>
        {oficinas.map(o => (
          <li key={o._id}>
            <div className="oficina-info">
              <strong>{o.nome}</strong>
              <span className="localizacao">{o.localizacao}</span>
            </div>

            <div className="actions">
              <Link to={`/servicos/${o._id}`}>Serviços</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
