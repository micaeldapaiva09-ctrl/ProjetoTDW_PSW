import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("user_id", res.data._id);
      localStorage.setItem("user_nome", res.data.nome);
      localStorage.setItem("user_role", res.data.role);

      navigate("/dashboard");
    } catch {
      alert("Login inválido");
    }
  };

  return (
    <div className="login-auth">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={submit}>Entrar</button>
        <p>
          Não tens conta? <span onClick={() => navigate("/")}>Registar</span>
        </p>
      </div>
    </div>
  );
}