import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportCSV from '../components/ImportCSV';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Upload } from 'lucide-react';

const ImportarDatos: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('porcinos');

  const handleImportComplete = () => {
    // Navegar a la página correspondiente después de importar
    if (activeTab === 'porcinos') {
      navigate('/porcinos');
    } else {
      navigate('/clientes');
    }
  };

  return (
    <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <Upload className="text-green-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Importar Datos desde CSV</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Importe datos masivos de porcinos o clientes desde archivos CSV
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="porcinos">Importar Porcinos</TabsTrigger>
            <TabsTrigger value="clientes">Importar Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="porcinos">
            <ImportCSV 
              type="porcinos" 
              onImportComplete={handleImportComplete}
            />
          </TabsContent>

          <TabsContent value="clientes">
            <ImportCSV 
              type="clientes" 
              onImportComplete={handleImportComplete}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Instrucciones importantes:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>El archivo CSV debe estar codificado en UTF-8</li>
            <li>Use comas (,) como separador de campos</li>
            <li>Los campos de texto pueden estar entre comillas</li>
            <li>Para porcinos, asegúrese de que los clientes existan previamente</li>
            <li>Los IDs de raza y tipo de alimentación deben ser válidos</li>
          </ul>
        </div>
      </div>
  );
};

export default ImportarDatos;
