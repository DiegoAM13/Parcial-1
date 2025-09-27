package Graphql.CRUD.Services;

import Graphql.CRUD.Entities.Alimentacion;
import Graphql.CRUD.Entities.Cliente;
import Graphql.CRUD.Repositories.AlimentacionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlimentacionService {

    @Autowired
    private AlimentacionRepository alimentacionRepository;


    public void CrearAlimentacion(Alimentacion alimentacion)
    {
        if (alimentacionRepository.existsByTipo(alimentacion.getTipo()))
        {
            throw  new IllegalArgumentException("La alimentacion ya existe");
        }

        alimentacionRepository.save(alimentacion);
    }

    public Alimentacion EliminarAlimentacion(Integer Tipo) {

        Alimentacion alimentacion = alimentacionRepository.findByTipo(Tipo)
                .orElseThrow(() -> new EntityNotFoundException("Alimento tipo: " + Tipo + " no encontrada"));


        alimentacionRepository.delete(alimentacion);
        return alimentacion;
    }

    public List<Alimentacion> ObtenerAlimentacion(){return alimentacionRepository.findAll();}

    public Alimentacion buscarPorTipo(Integer tipo) {
        return alimentacionRepository.findByTipo(tipo).orElse(null);
    }

    public Alimentacion ActualizarAlimentacion( Integer Tipo, Alimentacion alimentacionActualizar)
    {
        Alimentacion alimentacion = alimentacionRepository.findByTipo(Tipo)
                .orElseThrow(() -> new EntityNotFoundException("Alimento tipo: " + Tipo + " no encontrada"));

        if (alimentacionActualizar.getDescripcion() != null && !alimentacionActualizar.getDescripcion().isBlank())
        {
            alimentacion.setDescripcion(alimentacionActualizar.getDescripcion());
        }
        if (alimentacionActualizar.getDosis() != null && !alimentacionActualizar.getDosis().isNaN())
        {
            alimentacion.setDosis(alimentacionActualizar.getDosis());
        }
        return alimentacionRepository.save(alimentacion);
    }
}
