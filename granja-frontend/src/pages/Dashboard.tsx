import React from 'react';
import { useQuery } from '@apollo/client';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { GET_PORCINOS, GET_CLIENTES, GET_ALIMENTACION, GET_RAZAS } from '../graphql/queries';
import { 
  UserGroupIcon, 
  ChartBarIcon,
  PlusCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: porcinosData, loading: porcinosLoading } = useQuery(GET_PORCINOS);
  const { data: clientesData, loading: clientesLoading } = useQuery(GET_CLIENTES);
  const { data: alimentacionData, loading: alimentacionLoading } = useQuery(GET_ALIMENTACION);
  const { data: razasData } = useQuery(GET_RAZAS);

  const totalPorcinos = porcinosData?.obtenerPorcino?.length || 0;
  const totalClientes = clientesData?.obtenerClientes?.length || 0;
  const tiposAlimentacion = alimentacionData?.obtenerAlimentacion?.length || 0;
  
  const pesoPromedio = porcinosData?.obtenerPorcino?.reduce((acc: number, porcino: any) => {
    return acc + porcino.peso;
  }, 0) / (totalPorcinos || 1);

  // Datos para el gráfico de distribución por razas
  const razasDistribution = razasData?.obtenerRaza?.map((raza: any) => {
    const count = porcinosData?.obtenerPorcino?.filter((p: any) => p.raza.id === raza.id).length || 0;
    return {
      name: raza.raza,
      cantidad: count
    };
  }) || [];

  // Datos para el gráfico de peso por edad
  const pesosPorEdad = porcinosData?.obtenerPorcino?.reduce((acc: any[], porcino: any) => {
    const existing = acc.find(item => item.edad === porcino.edad);
    if (existing) {
      existing.peso = (existing.peso + porcino.peso) / 2;
    } else {
      acc.push({ edad: porcino.edad, peso: porcino.peso });
    }
    return acc;
  }, []).sort((a: any, b: any) => a.edad - b.edad) || [];

  const COLORS = ['#4A5D23', '#6B7C32', '#8B9A46', '#A8B864', '#C6D08D'];

  const isLoading = porcinosLoading || clientesLoading || alimentacionLoading;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/reportes')}
            icon={<DocumentTextIcon className="h-5 w-5" />}
          >
            Ver Reportes
          </Button>
          <Button
            onClick={() => navigate('/porcinos/nuevo')}
            icon={<PlusCircleIcon className="h-5 w-5" />}
          >
            Registrar Porcino
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-farm-light to-farm-accent text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm font-medium">Total Porcinos</p>
              <p className="text-3xl font-bold mt-2">
                {isLoading ? '...' : totalPorcinos}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="text-2xl">🐷</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-farm-medium to-farm-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm font-medium">Total Clientes</p>
              <p className="text-3xl font-bold mt-2">
                {isLoading ? '...' : totalClientes}
              </p>
            </div>
            <UserGroupIcon className="h-10 w-10 text-white/50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-farm-accent to-farm-pale text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-dark text-sm font-medium">Tipos de Alimentación</p>
              <p className="text-3xl font-bold mt-2 text-farm-dark">
                {isLoading ? '...' : tiposAlimentacion}
              </p>
            </div>
            <div className="bg-white/30 p-3 rounded-lg">
              <span className="text-2xl">🌾</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-farm-dark to-farm-medium text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm font-medium">Peso Promedio</p>
              <p className="text-3xl font-bold mt-2">
                {isLoading ? '...' : `${pesoPromedio.toFixed(1)} kg`}
              </p>
            </div>
            <ChartBarIcon className="h-10 w-10 text-white/50" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribución por Razas">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={razasDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="cantidad"
              >
                {razasDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Evolución de Peso por Edad">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pesosPorEdad}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="edad" label={{ value: 'Edad (meses)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="peso" fill="#6B7C32" name="Peso promedio" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Acciones Rápidas" subtitle="Acceda rápidamente a las funciones más utilizadas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/clientes/nuevo')}
            icon={<PlusCircleIcon className="h-5 w-5" />}
          >
            Registrar Cliente
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/alimentacion')}
            icon={<span>🌾</span>}
          >
            Gestionar Alimentación
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/razas')}
            icon={<span>🧬</span>}
          >
            Gestionar Razas
          </Button>
        </div>
      </Card>
    </div>
  );
};
