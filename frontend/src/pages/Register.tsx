import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await api.post("/users", {
        nome,
        email,
        password,
        role: "cliente"
      });
      alert("Conta criada");
      navigate("/login");
    } catch {
      alert("Erro no registo");
    }
  };

  return (
    <div className="register-auth">
      <div className="register-box">
        <h2>Registo</h2>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={submit}>Criar conta</button>
        <p>Já tens conta? <span onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
}