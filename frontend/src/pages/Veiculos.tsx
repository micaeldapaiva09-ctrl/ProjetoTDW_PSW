import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Veiculos.css";

interface Veiculo {
  _id: string;
  marca: string;
  modelo: string;
  matricula: string;
  ano: number;
}

export default function Veiculos() {
  const [lista, setLista] = useState<Veiculo[]>([]);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    matricula: "",
    ano: "",
  });

  const [editarId, setEditarId] = useState<string | null>(null);

  // 🔹 carregar veículos
  const carregarLista = async () => {
    try {
      const res = await api.get("/veiculos");
      setLista(res.data);
    } catch (err) {
      console.error("Erro ao carregar veículos", err);
    }
  };

  useEffect(() => {
  const carregarLista = async () => {
    try {
      const res = await api.get("/veiculos");
      setLista(res.data);
    } catch (err) {
      console.error("Erro ao carregar veículos", err);
    }
  };

  carregarLista();
}, []);


  
  const guardar = async () => {
    if (!form.marca || !form.modelo || !form.matricula || !form.ano) return;

    if (editarId) {
      
      await api.put(`/veiculos/${editarId}`, {
        ...form,
        ano: Number(form.ano),
      });
      setEditarId(null);
    } else {
      // CRIAR
      await api.post("/veiculos", {
        ...form,
        ano: Number(form.ano),
      });
    }

    setForm({ marca: "", modelo: "", matricula: "", ano: "" });
    carregarLista();
  };

  
  const remover = async (id: string) => {
    await api.delete(`/veiculos/${id}`);
    setLista(lista.filter(v => v._id !== id));
  };

  
  const editar = (v: Veiculo) => {
    setEditarId(v._id);
    setForm({
      marca: v.marca,
      modelo: v.modelo,
      matricula: v.matricula,
      ano: String(v.ano),
    });
  };

  return (
    <div className="veiculos-page">
      <h1>Veículos</h1>

      
      <Link to="/dashboard">← Voltar ao Dashboard</Link>

      {/* formulário */}
      <div className="veiculos-form">
        <input
          placeholder="Marca"
          value={form.marca}
          onChange={e => setForm({ ...form, marca: e.target.value })}
        />

        <input
          placeholder="Modelo"
          value={form.modelo}
          onChange={e => setForm({ ...form, modelo: e.target.value })}
        />

        <input
          placeholder="Matrícula"
          value={form.matricula}
          onChange={e => setForm({ ...form, matricula: e.target.value })}
        />

        <input
          type="number"
          placeholder="Ano"
          value={form.ano}
          onChange={e => setForm({ ...form, ano: e.target.value })}
        />

        <button onClick={guardar}>
          {editarId ? "Guardar" : "Adicionar"}
        </button>
      </div>

      
      <ul className="veiculos-lista">
        {lista.map(v => (
          <li key={v._id} className="veiculo-item">
            <div>
              <strong>{v.marca}</strong> — {v.modelo} <br />
              {v.matricula} • {v.ano}
            </div>

            <div>
              <button onClick={() => editar(v)}>Editar</button>
              <button className="del" onClick={() => remover(v._id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
