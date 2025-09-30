import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import {
  PORCINO_AGREGADO_SUBSCRIPTION,
  PORCINO_ACTUALIZADO_SUBSCRIPTION,
  CLIENTE_AGREGADO_SUBSCRIPTION,
  RAZA_AGREGADA_SUBSCRIPTION,
  ALERTA_PESO_SUBSCRIPTION
} from '../graphql/subscriptions';
import { Card } from '../components/ui/Card';
import { Bell, User, AlertTriangle, Tag, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Notificacion {
  id: string;
  tipo: 'porcino' | 'cliente' | 'raza' | 'alerta';
  mensaje: string;
  timestamp: Date;
  icono: React.ReactNode;
}

export default function Alertas() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  // Suscripción a nuevos porcinos
  const { data: porcinoData } = useSubscription(PORCINO_AGREGADO_SUBSCRIPTION);
  
  // Suscripción a porcinos actualizados
  const { data: porcinoActualizadoData } = useSubscription(PORCINO_ACTUALIZADO_SUBSCRIPTION);
  
  // Suscripción a nuevos clientes
  const { data: clienteData } = useSubscription(CLIENTE_AGREGADO_SUBSCRIPTION);
  
  // Suscripción a nuevas razas
  const { data: razaData } = useSubscription(RAZA_AGREGADA_SUBSCRIPTION);
  
  // Suscripción a alertas de peso (250kg)
  const { data: alertaData } = useSubscription(ALERTA_PESO_SUBSCRIPTION, {
    variables: { pesoLimite: 250 }
  });

  // Agregar notificación cuando llega un nuevo porcino
  useEffect(() => {
    if (porcinoData?.porcinoAgregado) {
      const porcino = porcinoData.porcinoAgregado;
      const notif: Notificacion = {
        id: Date.now().toString(),
        tipo: 'porcino',
        mensaje: `🐷 Nuevo porcino registrado: ${porcino.identificacion} - Peso: ${porcino.peso}kg`,
        timestamp: new Date(),
        icono: <Zap className="w-5 h-5 text-blue-500" />
      };
      setNotificaciones(prev => [notif, ...prev]);
      toast.success(notif.mensaje);
    }
  }, [porcinoData]);

  // Agregar notificación cuando se actualiza un porcino
  useEffect(() => {
    if (porcinoActualizadoData?.porcinoActualizado) {
      const porcino = porcinoActualizadoData.porcinoActualizado;
      const notif: Notificacion = {
        id: Date.now().toString(),
        tipo: 'porcino',
        mensaje: `📝 Porcino actualizado: ${porcino.identificacion} - Nuevo peso: ${porcino.peso}kg`,
        timestamp: new Date(),
        icono: <Zap className="w-5 h-5 text-green-500" />
      };
      setNotificaciones(prev => [notif, ...prev]);
      toast.success(notif.mensaje);
    }
  }, [porcinoActualizadoData]);

  // Agregar notificación cuando llega un nuevo cliente
  useEffect(() => {
    if (clienteData?.clienteAgregado) {
      const cliente = clienteData.clienteAgregado;
      const notif: Notificacion = {
        id: Date.now().toString(),
        tipo: 'cliente',
        mensaje: `👤 Nuevo cliente registrado: ${cliente.nombre} ${cliente.apellido}`,
        timestamp: new Date(),
        icono: <User className="w-5 h-5 text-purple-500" />
      };
      setNotificaciones(prev => [notif, ...prev]);
      toast.success(notif.mensaje);
    }
  }, [clienteData]);

  // Agregar notificación cuando llega una nueva raza
  useEffect(() => {
    if (razaData?.razaAgregada) {
      const raza = razaData.razaAgregada;
      const notif: Notificacion = {
        id: Date.now().toString(),
        tipo: 'raza',
        mensaje: `🏷️ Nueva raza agregada: ${raza.raza}`,
        timestamp: new Date(),
        icono: <Tag className="w-5 h-5 text-orange-500" />
      };
      setNotificaciones(prev => [notif, ...prev]);
      toast.success(notif.mensaje);
    }
  }, [razaData]);

  // Agregar notificación de alerta de peso
  useEffect(() => {
    if (alertaData?.alertaPesoPorcino) {
      const porcino = alertaData.alertaPesoPorcino;
      const notif: Notificacion = {
        id: Date.now().toString(),
        tipo: 'alerta',
        mensaje: `⚠️ ALERTA: El porcino ${porcino.identificacion} supera los 250kg (${porcino.peso}kg)`,
        timestamp: new Date(),
        icono: <AlertTriangle className="w-5 h-5 text-red-500" />
      };
      setNotificaciones(prev => [notif, ...prev]);
      toast.error(notif.mensaje, { duration: 5000 });
    }
  }, [alertaData]);

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getColorPorTipo = (tipo: string) => {
    switch (tipo) {
      case 'porcino': return 'border-blue-200 bg-blue-50';
      case 'cliente': return 'border-purple-200 bg-purple-50';
      case 'raza': return 'border-orange-200 bg-orange-50';
      case 'alerta': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="w-8 h-8" />
          Alertas en Tiempo Real
        </h1>
        <p className="text-gray-600 mt-2">
          Notificaciones automáticas usando GraphQL Subscriptions
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total de notificaciones</p>
            <p className="text-3xl font-bold">{notificaciones.length}</p>
          </div>
          <Bell className="w-12 h-12 text-blue-500" />
        </div>
      </Card>

      <Card title="Historial de Notificaciones">
        {notificaciones.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No hay notificaciones aún</p>
            <p className="text-sm mt-2">
              Las notificaciones aparecerán aquí cuando se registren nuevos porcinos, clientes o razas
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notificaciones.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-lg border-2 ${getColorPorTipo(notif.tipo)} 
                  transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{notif.icono}</div>
                  <div className="flex-1">
                    <p className="font-medium">{notif.mensaje}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatearFecha(notif.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 ¿Cómo funciona?</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Esta página está conectada al backend mediante WebSocket</li>
          <li>• Cuando alguien registra un porcino, cliente o raza, verás la notificación aquí</li>
          <li>• Si un porcino supera los 250kg, recibirás una alerta roja</li>
          <li>• Abre otra pestaña y registra algo para ver las notificaciones en tiempo real</li>
        </ul>
      </div>
    </div>
  );
}
