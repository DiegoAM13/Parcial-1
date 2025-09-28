import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PORCINO, UPDATE_PORCINO } from '../../graphql/mutations';
import { GET_CLIENTES, GET_RAZAS, GET_ALIMENTACION } from '../../graphql/queries';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Porcino, PorcinoInput } from '../../types';
import toast from 'react-hot-toast';

interface PorcinoFormProps {
  porcino?: Porcino | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PorcinoForm: React.FC<PorcinoFormProps> = ({ porcino, onSuccess, onCancel }) => {
  const isEdit = !!porcino;
  
  const { data: clientesData } = useQuery(GET_CLIENTES);
  const { data: razasData } = useQuery(GET_RAZAS);
  const { data: alimentacionData } = useQuery(GET_ALIMENTACION);

  const [createPorcino, { loading: creating }] = useMutation(CREATE_PORCINO);
  const [updatePorcino, { loading: updating }] = useMutation(UPDATE_PORCINO);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PorcinoInput>({
    defaultValues: isEdit ? {
      identificacion: porcino.identificacion,
      edad: porcino.edad,
      peso: porcino.peso,
      razaId: porcino.raza.id,
      alimentacionTipo: porcino.alimentacion.tipo,
      clienteCedula: porcino.cliente.cedula
    } : undefined
  });

  const onSubmit = async (data: PorcinoInput) => {
    try {
      const input = {
        ...data,
        edad: parseInt(data.edad.toString()),
        peso: parseFloat(data.peso.toString()),
        razaId: parseInt(data.razaId.toString()),
        alimentacionTipo: parseInt(data.alimentacionTipo.toString())
      };

      if (isEdit) {
        await updatePorcino({
          variables: {
            identificacion: porcino.identificacion,
            input
          }
        });
        toast.success('Porcino actualizado correctamente');
      } else {
        await createPorcino({
          variables: { input }
        });
        toast.success('Porcino registrado correctamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el porcino');
    }
  };

  const clientes = clientesData?.obtenerClientes || [];
  const razas = razasData?.obtenerRaza || [];
  const alimentacion = alimentacionData?.obtenerAlimentacion || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Identificación"
          type="text"
          {...register('identificacion', {
            required: 'La identificación es obligatoria',
            maxLength: {
              value: 5,
              message: 'La identificación debe tener máximo 5 caracteres'
            }
          })}
          error={errors.identificacion?.message}
          disabled={isEdit}
        />

        <Input
          label="Edad (meses)"
          type="number"
          {...register('edad', {
            required: 'La edad es obligatoria',
            min: {
              value: 1,
              message: 'La edad debe ser mayor a 0'
            }
          })}
          error={errors.edad?.message}
        />

        <Input
          label="Peso (kg)"
          type="number"
          step="0.1"
          {...register('peso', {
            required: 'El peso es obligatorio',
            min: {
              value: 0.1,
              message: 'El peso debe ser mayor a 0'
            }
          })}
          error={errors.peso?.message}
        />

        <Select
          label="Cliente"
          options={clientes.map((c: any) => ({
            value: c.cedula,
            label: `${c.nombre} ${c.apellido} - ${c.cedula}`
          }))}
          {...register('clienteCedula', {
            required: 'El cliente es obligatorio'
          })}
          error={errors.clienteCedula?.message}
        />

        <Select
          label="Raza"
          options={razas.map((r: any) => ({
            value: r.id,
            label: r.raza
          }))}
          {...register('razaId', {
            required: 'La raza es obligatoria'
          })}
          error={errors.razaId?.message}
        />

        <Select
          label="Alimentación"
          options={alimentacion.map((a: any) => ({
            value: a.tipo,
            label: a.descripcion
          }))}
          {...register('alimentacionTipo', {
            required: 'La alimentación es obligatoria'
          })}
          error={errors.alimentacionTipo?.message}
        />
      </div>

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
