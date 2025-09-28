import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENTE, UPDATE_CLIENTE } from '../../graphql/mutations';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Cliente, ClienteInput } from '../../types';
import toast from 'react-hot-toast';

interface ClienteFormProps {
  cliente?: Cliente | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSuccess, onCancel }) => {
  const isEdit = !!cliente;
  
  const [createCliente, { loading: creating }] = useMutation(CREATE_CLIENTE);
  const [updateCliente, { loading: updating }] = useMutation(UPDATE_CLIENTE);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClienteInput>({
    defaultValues: isEdit ? cliente : undefined
  });

  const onSubmit = async (data: ClienteInput) => {
    try {
      if (isEdit) {
        await updateCliente({
          variables: {
            cedula: cliente.cedula,
            input: data
          }
        });
        toast.success('Cliente actualizado correctamente');
      } else {
        await createCliente({
          variables: { input: data }
        });
        toast.success('Cliente registrado correctamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Cédula"
        type="text"
        {...register('cedula', {
          required: 'La cédula es obligatoria',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'La cédula debe tener 10 dígitos'
          }
        })}
        error={errors.cedula?.message}
        disabled={isEdit}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          type="text"
          {...register('nombre', {
            required: 'El nombre es obligatorio',
            maxLength: {
              value: 50,
              message: 'El nombre debe tener máximo 50 caracteres'
            }
          })}
          error={errors.nombre?.message}
        />

        <Input
          label="Apellido"
          type="text"
          {...register('apellido', {
            required: 'El apellido es obligatorio',
            maxLength: {
              value: 50,
              message: 'El apellido debe tener máximo 50 caracteres'
            }
          })}
          error={errors.apellido?.message}
        />
      </div>

      <Input
        label="Dirección"
        type="text"
        {...register('direccion', {
          required: 'La dirección es obligatoria',
          maxLength: {
            value: 50,
            message: 'La dirección debe tener máximo 50 caracteres'
          }
        })}
        error={errors.direccion?.message}
      />

      <Input
        label="Teléfono"
        type="text"
        {...register('telefono', {
          required: 'El teléfono es obligatorio',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'El teléfono debe tener 10 dígitos'
          }
        })}
        error={errors.telefono?.message}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={creating || updating}>
          {isEdit ? 'Actualizar' : 'Registrar'}
        </Button>
      </div>
    </form>
  );
};
