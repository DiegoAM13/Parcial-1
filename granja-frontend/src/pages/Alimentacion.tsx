import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALIMENTACION } from '../graphql/queries';
import { DELETE_ALIMENTACION } from '../graphql/mutations';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { AlimentacionForm } from '../components/forms/AlimentacionForm';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Alimentacion } from '../types';

export const AlimentacionPage: React.FC = () => {
  const [selectedAlimentacion, setSelectedAlimentacion] = useState<Alimentacion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_ALIMENTACION);
  const [deleteAlimentacion] = useMutation(DELETE_ALIMENTACION, {
    onCompleted: () => {
      toast.success('Tipo de alimentación eliminado correctamente');
      refetch();
    },
    onError: (error) => {
      toast.error('Error al eliminar. Verifique que no esté siendo usado por algún porcino.');
      console.error(error);
    },
  });

  const alimentacion = data?.obtenerAlimentacion || [];

  const handleDelete = async (item: Alimentacion) => {
    if (window.confirm(`¿Está seguro de eliminar el tipo de alimentación ${item.descripcion}?`)) {
      await deleteAlimentacion({
        variables: { tipo: item.tipo }
      });
    }
  };

  const handleEdit = (item: Alimentacion) => {
    setSelectedAlimentacion(item);
    setIsEditModalOpen(true);
  };

  const columns = [
    { key: 'tipo', header: 'Tipo' },
    { key: 'descripcion', header: 'Descripción' },
    { 
      key: 'dosis', 
      header: 'Dosis',
      render: (item: Alimentacion) => `${item.dosis} kg`
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Alimentación</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Nuevo Tipo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-farm-light to-farm-accent text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Total Tipos</p>
              <p className="text-3xl font-bold">{alimentacion.length}</p>
            </div>
            <span className="text-4xl">🌾</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-medium to-farm-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Dosis Promedio</p>
              <p className="text-3xl font-bold">
                {alimentacion.length > 0
                  ? `${(alimentacion.reduce((acc: number, item: Alimentacion) => 
                      acc + item.dosis, 0) / alimentacion.length).toFixed(1)} kg`
                  : '0 kg'}
              </p>
            </div>
            <span className="text-4xl">⚖️</span>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-dark to-farm-medium text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-farm-lightest text-sm">Última Actualización</p>
              <p className="text-2xl font-bold">Hoy</p>
            </div>
            <span className="text-4xl">📅</span>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={alimentacion}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay tipos de alimentación registrados"
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Tipo de Alimentación"
      >
        <AlimentacionForm
          onSuccess={() => {
            setIsModalOpen(false);
            refetch();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAlimentacion(null);
        }}
        title="Editar Tipo de Alimentación"
      >
        <AlimentacionForm
          alimentacion={selectedAlimentacion}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedAlimentacion(null);
            refetch();
          }}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedAlimentacion(null);
          }}
        />
      </Modal>
    </div>
  );
};
