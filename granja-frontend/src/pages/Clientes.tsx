import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENTES } from '../graphql/queries';
import { DELETE_CLIENTE } from '../graphql/mutations';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { ClienteForm } from '../components/forms/ClienteForm';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Cliente } from '../types';

export const Clientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_CLIENTES);
  const [deleteCliente] = useMutation(DELETE_CLIENTE, {
    onCompleted: () => {
      toast.success('Cliente eliminado correctamente');
      refetch();
    },
    onError: (error) => {
      toast.error('Error al eliminar el cliente. Verifique que no tenga porcinos asociados.');
      console.error(error);
    },
  });

  const clientes = data?.obtenerClientes || [];

  const filteredClientes = clientes.filter((cliente: Cliente) => {
    const search = searchTerm.toLowerCase();
    return (
      cliente.cedula.toLowerCase().includes(search) ||
      cliente.nombre.toLowerCase().includes(search) ||
      cliente.apellido.toLowerCase().includes(search) ||
      cliente.telefono.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (cliente: Cliente) => {
    if (window.confirm(`¿Está seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`)) {
      await deleteCliente({
        variables: { cedula: cliente.cedula }
      });
    }
  };

  const handleView = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsViewModalOpen(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsEditModalOpen(true);
  };

  const columns = [
    { key: 'cedula', header: 'Cédula' },
    { 
      key: 'nombre', 
      header: 'Nombre Completo',
      render: (cliente: Cliente) => `${cliente.nombre} ${cliente.apellido}`
    },
    { key: 'direccion', header: 'Dirección' },
    { key: 'telefono', header: 'Teléfono' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Nuevo Cliente
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Buscar por cédula, nombre o teléfono..."
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
          data={filteredClientes}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay clientes registrados"
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Cliente"
      >
        <ClienteForm
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
          setSelectedCliente(null);
        }}
        title="Editar Cliente"
      >
        <ClienteForm
          cliente={selectedCliente}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedCliente(null);
            refetch();
          }}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedCliente(null);
          }}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCliente(null);
        }}
        title="Detalles del Cliente"
      >
        {selectedCliente && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Cédula</label>
                <p className="text-lg font-semibold">{selectedCliente.cedula}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Nombre</label>
                <p className="text-lg">{selectedCliente.nombre}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Apellido</label>
                <p className="text-lg">{selectedCliente.apellido}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Teléfono</label>
                <p className="text-lg">{selectedCliente.telefono}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-500">Dirección</label>
                <p className="text-lg">{selectedCliente.direccion}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
