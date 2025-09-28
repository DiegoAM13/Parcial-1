import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_ALIMENTACION, UPDATE_ALIMENTACION } from '../../graphql/mutations';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alimentacion, AlimentacionInput } from '../../types';
import toast from 'react-hot-toast';

interface AlimentacionFormProps {
  alimentacion?: Alimentacion | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AlimentacionForm: React.FC<AlimentacionFormProps> = ({ 
  alimentacion, 
  onSuccess, 
  onCancel 
}) => {
  const isEdit = !!alimentacion;
  
  const [createAlimentacion, { loading: creating }] = useMutation(CREATE_ALIMENTACION);
  const [updateAlimentacion, { loading: updating }] = useMutation(UPDATE_ALIMENTACION);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AlimentacionInput>({
    defaultValues: isEdit ? alimentacion : undefined
  });

  const onSubmit = async (data: AlimentacionInput) => {
    try {
      const input = {
        ...data,
        tipo: parseInt(data.tipo.toString()),
        dosis: parseFloat(data.dosis.toString())
      };

      if (isEdit) {
        await updateAlimentacion({
          variables: {
            tipo: alimentacion.tipo,
            input
          }
        });
        toast.success('Tipo de alimentación actualizado correctamente');
      } else {
        await createAlimentacion({
          variables: { input }
        });
        toast.success('Tipo de alimentación registrado correctamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el tipo de alimentación');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Tipo (Código)"
        type="number"
        {...register('tipo', {
          required: 'El tipo es obligatorio',
          min: {
            value: 1,
            message: 'El tipo debe ser mayor a 0'
          },
          max: {
            value: 99,
            message: 'El tipo debe ser menor a 100'
          }
        })}
        error={errors.tipo?.message}
        disabled={isEdit}
      />

      <Input
        label="Descripción"
        type="text"
        {...register('descripcion', {
          required: 'La descripción es obligatoria',
          maxLength: {
            value: 100,
            message: 'La descripción debe tener máximo 100 caracteres'
          }
        })}
        error={errors.descripcion?.message}
      />

      <Input
        label="Dosis (kg)"
        type="number"
        step="0.01"
        {...register('dosis', {
          required: 'La dosis es obligatoria',
          min: {
            value: 0.01,
            message: 'La dosis debe ser mayor a 0'
          }
        })}
        error={errors.dosis?.message}
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
