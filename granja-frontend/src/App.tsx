import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Porcinos } from './pages/Porcinos';
import { Clientes } from './pages/Clientes';
import { AlimentacionPage } from './pages/Alimentacion';
import { Razas } from './pages/Razas';
import { Reportes } from './pages/Reportes';
import ImportarDatos from './pages/ImportarDatos';

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="porcinos" element={<Porcinos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="alimentacion" element={<AlimentacionPage />} />
        <Route path="razas" element={<Razas />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="importar" element={<ImportarDatos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
