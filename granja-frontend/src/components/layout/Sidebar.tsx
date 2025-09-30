import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentChartBarIcon,
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Porcinos', href: '/porcinos', icon: '🐷' },
  { name: 'Clientes', href: '/clientes', icon: UserGroupIcon },
  { name: 'Alimentación', href: '/alimentacion', icon: '🌾' },
  { name: 'Razas', href: '/razas', icon: '🧬' },
  { name: 'Reportes', href: '/reportes', icon: DocumentChartBarIcon },
  { name: 'Importar CSV', href: '/importar', icon: CloudArrowUpIcon },
  { name: 'Alertas', href: '/alertas', icon: '🔔' },
];

export const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="p-2 rounded-md bg-white shadow-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-farm-medium"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 bg-farm-dark transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 bg-farm-dark border-b border-farm-medium px-4">
            <img 
              src="/assets/logo.png" 
              alt="Granja S.A." 
              className="h-12 w-auto"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                const textElement = document.getElementById('logo-text');
                if (textElement) textElement.style.display = 'block';
              }}
            />
            <h1 id="logo-text" className="text-2xl font-bold text-white" style={{ display: 'none' }}>
              Granja S.A.
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-farm-medium text-white'
                      : 'text-farm-lightest hover:bg-farm-medium hover:text-white'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {typeof item.icon === 'string' ? (
                  <span className="mr-3 text-xl">{item.icon}</span>
                ) : (
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                )}
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-farm-medium">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-farm-medium flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.usuario?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user?.usuario || 'Administrador'}
                </p>
                <p className="text-xs text-farm-lightest">
                  Sistema de Gestión
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-4 py-2 text-sm font-medium rounded-lg text-farm-lightest hover:bg-farm-medium hover:text-white transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" aria-hidden="true" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
