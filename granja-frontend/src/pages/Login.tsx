import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import toast from 'react-hot-toast';

interface LoginForm {
  usuario: string;
  contrasena: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const success = await login(data.usuario, data.contrasena);
      if (success) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-light to-farm-accent flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Granja S.A.</h1>
          <p className="text-farm-lightest">Sistema de Gestión de Granja Porcina</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
              <p className="text-gray-600 mt-2">Ingrese sus credenciales para acceder al sistema</p>
            </div>

            <Input
              label="Usuario"
              type="text"
              placeholder="Ingrese su usuario"
              {...register('usuario', { 
                required: 'El usuario es obligatorio' 
              })}
              error={errors.usuario?.message}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña"
              {...register('contrasena', { 
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 4,
                  message: 'La contraseña debe tener al menos 4 caracteres'
                }
              })}
              error={errors.contrasena?.message}
            />

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              size="lg"
            >
              Ingresar
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              © 2025 Sistema de Gestión - Todos los derechos reservados
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
