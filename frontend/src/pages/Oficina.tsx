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


  const carregar = async () => {
    const res = await api.get("/oficinas");
    setOficinas(res.data);
  };

  const criar = async () => {
    if (!nome || !localizacao) return;

    await api.post("/oficinas", { nome, localizacao });

    setNome("");
    setLocalizacao("");
    carregar();
  };

  const remover = async (id: string) => {
    await api.delete(`/oficinas/${id}`);
    setOficinas(prev => prev.filter(o => o._id !== id));
  };

  return (
    <div className="page">
      <h1>Oficinas</h1>

      <Link className="back" to="/dashboard">⬅ Dashboard</Link>

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
              <button className="del" onClick={() => remover(o._id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
