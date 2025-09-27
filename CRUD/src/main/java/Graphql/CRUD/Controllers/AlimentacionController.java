package Graphql.CRUD.Controllers;

import Graphql.CRUD.Entities.Alimentacion;
import Graphql.CRUD.Services.AlimentacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AlimentacionController {

    @Autowired
    private AlimentacionService alimentacionService;


    @QueryMapping
    public List<Alimentacion> obtenerAlimentacion()
    {
        return alimentacionService.ObtenerAlimentacion();
    }

    @QueryMapping
    public Alimentacion obtenerAlimentacionPorTipo(@Argument Integer tipo)
    {
        return  alimentacionService.buscarPorTipo(tipo);
    }


    @MutationMapping
    public  Alimentacion guardarAlimentacion(@Argument("input") Alimentacion alimentacion)
    {
        alimentacionService.CrearAlimentacion(alimentacion);
        return  alimentacion;
    }
    @MutationMapping
    public Alimentacion eliminarAlimentacion(@Argument Integer tipo){

        return  alimentacionService.EliminarAlimentacion(tipo);
    }

    @MutationMapping
    public Alimentacion actualizarAlimentacion(@Argument Integer tipo, @Argument("input") Alimentacion alimentacion)
    {
        return alimentacionService.ActualizarAlimentacion(tipo, alimentacion);
    }
}
