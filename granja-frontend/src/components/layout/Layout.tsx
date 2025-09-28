import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="/assets/logo.png" 
                  alt="Granja S.A." 
                  className="h-10 w-auto"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h2 className="text-xl font-semibold text-gray-900">
                  Sistema de Gestión de Granja Porcina
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <img 
                  src="/assets/banner_institucion.png" 
                  alt="Institución" 
                  className="h-10 w-auto"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-farm-dark to-farm-medium text-white mt-5">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center space-y-2">
              <p className="text-farm-lightest font-semibold">
                2025 - Politécnico Colombiano Jaime Isaza Cadavid
              </p>
              <p className="text-farm-pale">
                Desarrollado por:{' '}
                <a 
                  href="https://github.com/DiegoAM13" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-farm-accent transition-colors underline"
                >
                  Diego Mejía
                </a>{' '}
                y{' '}
                <a 
                  href="https://github.com/EstivenUribe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-farm-accent transition-colors underline"
                >
                  Rafael Uribe
                </a>
              </p>
              <p className="text-farm-pale">
                Profesor:{' '}
                <a 
                  href="https://github.com/hrecaman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-farm-accent transition-colors underline"
                >
                  Hernando Recamán Chaux
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
