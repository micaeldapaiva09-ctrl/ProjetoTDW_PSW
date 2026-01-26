import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./Services.css";

interface Servico {
  _id: string;
  nome: string;
  preco: number;
}

export default function Services() {
  const { id } = useParams<{ id: string }>();

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editarId, setEditarId] = useState<string | null>(null);

  // carregar serviços
  useEffect(() => {
    if (!id) return;

    const carregar = async () => {
      try {
        const res = await api.get(`/oficinas/${id}/servicos`);
        setServicos(res.data);
      } catch (err) {
        console.error("Erro ao carregar serviços", err);
      }
    };

    carregar();
  }, [id]);

  // criar ou editar serviço
  const guardar = async () => {
    if (!nome || !preco || !id) return;

    try {
      if (editarId) {
        // EDITAR
        await api.put(`/oficinas/servicos/${editarId}`, {
          nome,
          preco: Number(preco),
        });
        setEditarId(null);
      } else {
        // CRIAR
        await api.post(`/oficinas/${id}/servicos`, {
          nome,
          preco: Number(preco),
        });
      }

      setNome("");
      setPreco("");

      const res = await api.get(`/oficinas/${id}/servicos`);
      setServicos(res.data);
    } catch (err) {
      console.error("Erro ao guardar serviço", err);
    }
  };

  // remover serviço
  const remover = async (sid: string) => {
    try {
      await api.delete(`/oficinas/servicos/${sid}`);
      setServicos(prev => prev.filter(s => s._id !== sid));
    } catch (err) {
      console.error("Erro ao remover serviço", err);
    }
  };

  // preparar edição
  const editar = (s: Servico) => {
    setEditarId(s._id);
    setNome(s.nome);
    setPreco(String(s.preco));
  };

  return (
    <div className="veiculos-page">
      <h1>Serviços da Oficina</h1>

      <Link className="back" to="/oficinas">
        ⬅ Voltar às Oficinas
      </Link>

      <div className="veiculos-form">
        <input
          placeholder="Nome do serviço"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={e => setPreco(e.target.value)}
        />

        <button onClick={guardar}>
          {editarId ? "Guardar" : "Adicionar"}
        </button>
      </div>

      <ul className="veiculos-lista">
        {servicos.map(s => (
          <li key={s._id} className="veiculo-item">
            <span>
              {s.nome} — €{s.preco}
            </span>

            <div className="actions">
              <button onClick={() => editar(s)}>Editar</button>
              <button className="del" onClick={() => remover(s._id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
