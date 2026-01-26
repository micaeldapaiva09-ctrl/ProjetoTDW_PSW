import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Marcacoes.css";

interface Oficina {
  _id: string;
  nome: string;
}

interface Servico {
  _id: string;
  nome: string;
}

interface Marcacao {
  _id: string;
  dataHora: string;
  oficina: Oficina;
}

export default function Marcacoes() {
  const [oficinas, setOficinas] = useState<Oficina[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);

  const [oficina, setOficina] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");

  // 🔹 carregar oficinas
  useEffect(() => {
    const carregar = async () => {
      const res = await api.get("/oficinas");
      setOficinas(res.data);
    };
    carregar();
  }, []);

  // 🔹 carregar serviços da oficina
  useEffect(() => {
    if (!oficina) return;

    const carregarServicos = async () => {
      const res = await api.get(`/oficinas/${oficina}/servicos`);
      setServicos(res.data);
    };

    carregarServicos();
  }, [oficina]);

  // 🔹 carregar marcações
  const carregarMarcacoes = async () => {
    const res = await api.get("/marcacoes");
    setMarcacoes(res.data);
  };

  useEffect(() => {
  const carregarMarcacoes = async () => {
    try {
      const res = await api.get("/marcacoes");
      setMarcacoes(res.data);
    } catch (err) {
      console.error("Erro ao carregar marcações", err);
    }
  };

  carregarMarcacoes();
}, []);


  // 🔹 criar marcação
  const criar = async () => {
    if (!oficina || !servico || !dataHora) return;

    await api.post("/marcacoes", {
      oficina,
      servico,
      dataHora
    });

    setDataHora("");
    setServico("");

    carregarMarcacoes();
  };

  return (
    <div className="page">
      <h1>Marcações</h1>

      <Link className="back" to="/dashboard">⬅ Dashboard</Link>

      {/* FORM */}
      <select value={oficina} onChange={e => setOficina(e.target.value)}>
        <option value="">Selecionar oficina</option>
        {oficinas.map(o => (
          <option key={o._id} value={o._id}>{o.nome}</option>
        ))}
      </select>

      <select value={servico} onChange={e => setServico(e.target.value)}>
        <option value="">Selecionar serviço</option>
        {servicos.map(s => (
          <option key={s._id} value={s._id}>{s.nome}</option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={dataHora}
        onChange={e => setDataHora(e.target.value)}
      />

      <button onClick={criar}>Criar Marcação</button>

      {/* LISTA */}
      <h2>Marcações Criadas</h2>

      <ul>
        {marcacoes.map(m => (
          <li key={m._id}>
            {new Date(m.dataHora).toLocaleString()} — {m.oficina?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
