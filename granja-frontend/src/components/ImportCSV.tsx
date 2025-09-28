import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ADD_PORCINO, ADD_CLIENTE } from '../graphql/mutations';

interface CSVImportProps {
  type: 'porcinos' | 'clientes';
  onImportComplete?: () => void;
}

const ImportCSV: React.FC<CSVImportProps> = ({ type, onImportComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [addPorcino] = useMutation(ADD_PORCINO);
  const [addCliente] = useMutation(ADD_CLIENTE);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSVFile(selectedFile);
    } else {
      toast.error('Por favor seleccione un archivo CSV válido');
    }
  };

  const parseCSVFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
      
      setPreview(data.slice(0, 5)); // Mostrar solo las primeras 5 filas como preview
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('No hay archivo seleccionado');
      return;
    }

    setImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });

        let successCount = 0;
        let errorCount = 0;

        for (const row of data) {
          try {
            if (type === 'porcinos') {
              await addPorcino({
                variables: {
                  identificacion: row.identificacion || '',
                  edad: parseInt(row.edad) || 0,
                  peso: parseFloat(row.peso) || 0,
                  razaId: parseInt(row.razaId || row.raza) || 1,
                  alimentacionTipo: parseInt(row.alimentacionTipo) || 1,
                  clienteCedula: row.clienteCedula || ''
                }
              });
            } else if (type === 'clientes') {
              await addCliente({
                variables: {
                  cedula: row.cedula || '',
                  nombre: row.nombre || '',
                  apellido: row.apellido || '',
                  direccion: row.direccion || '',
                  telefono: row.telefono || ''
                }
              });
            }
            successCount++;
          } catch (error) {
            errorCount++;
            console.error('Error importing row:', error);
          }
        }

        if (successCount > 0) {
          toast.success(`Se importaron ${successCount} registros exitosamente`);
        }
        if (errorCount > 0) {
          toast.error(`${errorCount} registros no pudieron ser importados`);
        }

        // Reset state
        setFile(null);
        setPreview([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        if (onImportComplete) {
          onImportComplete();
        }
      } catch (error) {
        toast.error('Error al procesar el archivo CSV');
        console.error(error);
      } finally {
        setImporting(false);
      }
    };
    
    reader.readAsText(file);
  };

  const getTemplateHeaders = () => {
    if (type === 'porcinos') {
      return 'identificacion,edad,peso,raza,alimentacionTipo,clienteCedula';
    } else {
      return 'cedula,nombre,apellido,direccion,telefono';
    }
  };

  const downloadTemplate = () => {
    const headers = getTemplateHeaders();
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${type}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Importar {type === 'porcinos' ? 'Porcinos' : 'Clientes'} desde CSV</h2>
        <p className="text-gray-600">
          Cargue un archivo CSV con los datos a importar. Puede descargar una plantilla de ejemplo.
        </p>
      </div>

      <div className="space-y-4">
        {/* Plantilla */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900">Formato del archivo</h4>
              <p className="text-sm text-blue-700 mt-1">
                El archivo CSV debe contener las siguientes columnas:
              </p>
              <code className="block mt-2 p-2 bg-white rounded text-xs">
                {getTemplateHeaders()}
              </code>
              <Button
                onClick={downloadTemplate}
                variant="secondary"
                size="sm"
                className="mt-3"
              >
                <FileText className="mr-2" size={16} />
                Descargar Plantilla
              </Button>
            </div>
          </div>
        </div>

        {/* Selector de archivo */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="mx-auto text-gray-400" size={48} />
            <p className="mt-2 text-sm text-gray-600">
              {file ? (
                <span className="font-semibold text-green-600">
                  <CheckCircle className="inline mr-1" size={16} />
                  {file.name}
                </span>
              ) : (
                'Arrastra un archivo CSV aquí o haz clic para seleccionar'
              )}
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="mt-4"
            >
              Seleccionar Archivo
            </Button>
          </div>
        </div>

        {/* Vista previa */}
        {preview.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Vista previa (primeras 5 filas):</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {preview.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((value: any, i) => (
                        <td key={i} className="px-4 py-2 text-sm text-gray-900">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Botón de importar */}
        {file && (
          <div className="flex justify-end">
            <Button
              onClick={handleImport}
              loading={importing}
              disabled={importing}
            >
              {importing ? 'Importando...' : 'Importar Datos'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImportCSV;
