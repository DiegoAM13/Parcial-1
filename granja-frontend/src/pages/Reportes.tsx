import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPORTE_GENERAL, GET_REPORTE_POR_CLIENTE, GET_CLIENTES } from '../graphql/queries';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Table } from '../components/ui/Table';
import { DocumentArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { ReportePorcino } from '../types';

export const Reportes: React.FC = () => {
  const [selectedCliente, setSelectedCliente] = useState<string>('');
  const [showFiltered, setShowFiltered] = useState(false);

  const { data: reporteData, loading: reporteLoading } = useQuery(GET_REPORTE_GENERAL);
  const { data: clientesData } = useQuery(GET_CLIENTES);
  const { data: reporteClienteData, loading: reporteClienteLoading } = useQuery(GET_REPORTE_POR_CLIENTE, {
    variables: { cedula: selectedCliente },
    skip: !selectedCliente
  });

  const clientes = clientesData?.obtenerClientes || [];
  const reporteGeneral = reporteData?.reportePorcino || [];
  const reporteCliente = reporteClienteData?.reportePorcinosPorCliente || [];

  const dataToShow = showFiltered && selectedCliente ? reporteCliente : reporteGeneral;
  const loading = showFiltered && selectedCliente ? reporteClienteLoading : reporteLoading;

  const exportToCSV = () => {
    const headers = ['Cédula Cliente', 'Nombre', 'Apellido', 'Teléfono', 'Dirección', 
                    'ID Porcino', 'Edad', 'Peso', 'Raza', 'Alimentación', 'Dosis'];
    
    const rows = dataToShow.map((item: ReportePorcino) => [
      item.clienteCedula,
      item.clienteNombre,
      item.clienteApellido,
      item.clienteTelefono,
      item.clienteDireccion,
      item.porcinoIdentificacion,
      item.porcinoEdad,
      item.porcinoPeso,
      item.razaNombre,
      item.alimentacionDescripcion,
      item.alimentacionDosis
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_porcinos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { 
      key: 'cliente', 
      header: 'Cliente',
      render: (item: ReportePorcino) => `${item.clienteNombre} ${item.clienteApellido}`
    },
    { key: 'clienteCedula', header: 'Cédula' },
    { key: 'porcinoIdentificacion', header: 'ID Porcino' },
    { 
      key: 'porcinoEdad', 
      header: 'Edad',
      render: (item: ReportePorcino) => `${item.porcinoEdad} meses`
    },
    { 
      key: 'porcinoPeso', 
      header: 'Peso',
      render: (item: ReportePorcino) => `${item.porcinoPeso} kg`
    },
    { key: 'razaNombre', header: 'Raza' },
    { key: 'alimentacionDescripcion', header: 'Alimentación' },
    { 
      key: 'alimentacionDosis', 
      header: 'Dosis',
      render: (item: ReportePorcino) => `${item.alimentacionDosis} kg`
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <Button
          onClick={exportToCSV}
          icon={<DocumentArrowDownIcon className="h-5 w-5" />}
          disabled={dataToShow.length === 0}
        >
          Exportar CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Filtros de Reporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Filtrar por Cliente"
              options={[
                { value: '', label: 'Todos los clientes' },
                ...clientes.map((c: any) => ({
                  value: c.cedula,
                  label: `${c.nombre} ${c.apellido} - ${c.cedula}`
                }))
              ]}
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
            />
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowFiltered(!!selectedCliente);
                }}
                icon={<FunnelIcon className="h-5 w-5" />}
                disabled={!selectedCliente}
              >
                Aplicar Filtro
              </Button>
            </div>
            {showFiltered && (
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowFiltered(false);
                    setSelectedCliente('');
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-farm-light to-farm-accent text-white">
          <div>
            <p className="text-sm text-farm-lightest">Total Registros</p>
            <p className="text-2xl font-bold">{dataToShow.length}</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-medium to-farm-light text-white">
          <div>
            <p className="text-sm text-farm-lightest">Peso Promedio</p>
            <p className="text-2xl font-bold">
              {dataToShow.length > 0
                ? `${(dataToShow.reduce((acc: number, item: ReportePorcino) => 
                    acc + item.porcinoPeso, 0) / dataToShow.length).toFixed(1)} kg`
                : '0 kg'}
            </p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-accent to-farm-pale text-white">
          <div>
            <p className="text-sm text-farm-dark">Edad Promedio</p>
            <p className="text-2xl font-bold text-farm-dark">
              {dataToShow.length > 0
                ? `${(dataToShow.reduce((acc: number, item: ReportePorcino) => 
                    acc + item.porcinoEdad, 0) / dataToShow.length).toFixed(1)} meses`
                : '0 meses'}
            </p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-farm-dark to-farm-medium text-white">
          <div>
            <p className="text-sm text-farm-lightest">Clientes Únicos</p>
            <p className="text-2xl font-bold">
              {new Set(dataToShow.map((item: ReportePorcino) => item.clienteCedula)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">
          {showFiltered && selectedCliente 
            ? `Reporte Filtrado - Cliente: ${clientes.find((c: any) => c.cedula === selectedCliente)?.nombre} ${clientes.find((c: any) => c.cedula === selectedCliente)?.apellido}`
            : 'Reporte General'}
        </h3>
        <Table
          columns={columns}
          data={dataToShow}
          loading={loading}
          emptyMessage="No hay datos para mostrar en el reporte"
        />
      </Card>
    </div>
  );
};
