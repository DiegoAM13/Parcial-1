import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RAZAS } from '../graphql/queries';
import { Table } from '../components/ui/Table';
import { Card } from '../components/ui/Card';

export const Razas: React.FC = () => {
  const { data, loading } = useQuery(GET_RAZAS);
  const razas = data?.obtenerRaza || [];

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'raza', header: 'Nombre de la Raza' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Razas</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-farm-light to-farm-accent text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Total Razas</p>
              <p className="text-3xl font-bold">{razas.length}</p>
            </div>
            <span className="text-4xl">🧬</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-medium to-farm-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Más Popular</p>
              <p className="text-2xl font-bold">
                {razas.length > 0 ? razas[0].raza : 'N/A'}
              </p>
            </div>
            <span className="text-4xl">🏆</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-dark to-farm-medium text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Estado</p>
              <p className="text-2xl font-bold">Activo</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="mb-4">
          <p className="text-gray-600">
            Las razas son gestionadas directamente desde la base de datos para mantener la integridad referencial.
          </p>
        </div>
        <Table
          columns={columns}
          data={razas}
          loading={loading}
          emptyMessage="No hay razas registradas"
        />
      </Card>
    </div>
  );
};
