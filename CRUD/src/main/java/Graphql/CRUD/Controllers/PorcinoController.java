package Graphql.CRUD.Controllers;

import Graphql.CRUD.DTOS.PorcinoDTO;
import Graphql.CRUD.Entities.Porcino;
import Graphql.CRUD.Services.PorcinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PorcinoController {

    @Autowired
    private PorcinoService porcinoService;

    @QueryMapping
    public List<Porcino> obtenerPorcino()
    {
        return  porcinoService.obtenerPorcino();
    }
    @QueryMapping
    public Porcino obtenerPorcinoPorId(@Argument String identificacion)
    {
        return  porcinoService.obtenerPorcinoPorId(identificacion);
    }
    @MutationMapping
    public PorcinoDTO guardarPorcino(@Argument("input") PorcinoDTO porcino)
    {
        porcinoService.CrearPorcino(porcino);
        return porcino;
    }
    @MutationMapping
    public Porcino eliminarPorcino(@Argument String identificacion)
    {
        return porcinoService.EliminarPorcino(identificacion);
    }
    @MutationMapping
    public  Porcino actualizarPorcino(@Argument  String identificacion, @Argument("input") PorcinoDTO porcino)
    {
        return porcinoService.ActualizarPorcino(identificacion, porcino);
    }
}
