import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Oficina from "./pages/Oficina";
import Veiculos from "./pages/Veiculos";
import Marcacoes from "./pages/Marcacoes";
import Services from "./pages/Services";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/oficinas" element={<Oficina />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/marcacoes" element={<Marcacoes />} />

        
        <Route path="/servicos/:id" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}
