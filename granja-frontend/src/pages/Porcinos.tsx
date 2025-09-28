import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PORCINOS } from '../graphql/queries';
import { DELETE_PORCINO } from '../graphql/mutations';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { PorcinoForm } from '../components/forms/PorcinoForm';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Porcino } from '../types';

export const Porcinos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [selectedPorcino, setSelectedPorcino] = useState<Porcino | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_PORCINOS);
  const [deletePorcino] = useMutation(DELETE_PORCINO, {
    onCompleted: () => {
      toast.success('Porcino eliminado correctamente');
      refetch();
    },
    onError: (error) => {
      toast.error('Error al eliminar el porcino');
      console.error(error);
    },
  });

  const porcinos = data?.obtenerPorcino || [];

  const filteredPorcinos = porcinos.filter((porcino: Porcino) => {
    const search = searchTerm.toLowerCase();
    return (
      porcino.identificacion.toLowerCase().includes(search) ||
      porcino.cliente.nombre.toLowerCase().includes(search) ||
      porcino.cliente.apellido.toLowerCase().includes(search) ||
      porcino.raza.raza.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (porcino: Porcino) => {
    if (window.confirm(`¿Está seguro de eliminar el porcino ${porcino.identificacion}?`)) {
      await deletePorcino({
        variables: { identificacion: porcino.identificacion }
      });
    }
  };

  const handleView = (porcino: Porcino) => {
    setSelectedPorcino(porcino);
    setIsViewModalOpen(true);
  };

  const handleEdit = (porcino: Porcino) => {
    setSelectedPorcino(porcino);
    setIsEditModalOpen(true);
  };

  const columns = [
    { key: 'identificacion', header: 'Identificación' },
    { 
      key: 'cliente', 
      header: 'Cliente',
      render: (porcino: Porcino) => `${porcino.cliente.nombre} ${porcino.cliente.apellido}`
    },
    { 
      key: 'raza', 
      header: 'Raza',
      render: (porcino: Porcino) => porcino.raza.raza
    },
    { key: 'edad', header: 'Edad (meses)' },
    { 
      key: 'peso', 
      header: 'Peso (kg)',
      render: (porcino: Porcino) => `${porcino.peso} kg`
    },
    { 
      key: 'alimentacion', 
      header: 'Alimentación',
      render: (porcino: Porcino) => porcino.alimentacion.descripcion
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Porcinos</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Nuevo Porcino
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar por identificación, cliente o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={() => refetch()}>
            Actualizar
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={filteredPorcinos}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay porcinos registrados"
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Porcino"
        size="lg"
      >
        <PorcinoForm
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
          setSelectedPorcino(null);
        }}
        title="Editar Porcino"
        size="lg"
      >
        <PorcinoForm
          porcino={selectedPorcino}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedPorcino(null);
            refetch();
          }}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedPorcino(null);
          }}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedPorcino(null);
        }}
        title="Detalles del Porcino"
      >
        {selectedPorcino && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Identificación</label>
                <p className="text-lg font-semibold">{selectedPorcino.identificacion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Edad</label>
                <p className="text-lg">{selectedPorcino.edad} meses</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Peso</label>
                <p className="text-lg">{selectedPorcino.peso} kg</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Raza</label>
                <p className="text-lg">{selectedPorcino.raza.raza}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Información del Cliente</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre</label>
                  <p>{selectedPorcino.cliente.nombre} {selectedPorcino.cliente.apellido}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Cédula</label>
                  <p>{selectedPorcino.cliente.cedula}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Teléfono</label>
                  <p>{selectedPorcino.cliente.telefono}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Dirección</label>
                  <p>{selectedPorcino.cliente.direccion}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Información de Alimentación</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo</label>
                  <p>{selectedPorcino.alimentacion.descripcion}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Dosis</label>
                  <p>{selectedPorcino.alimentacion.dosis} kg</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
