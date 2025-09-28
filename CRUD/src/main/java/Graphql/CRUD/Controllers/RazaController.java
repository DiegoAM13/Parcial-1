package Graphql.CRUD.Controllers;

import Graphql.CRUD.Entities.Raza;
import Graphql.CRUD.Services.RazaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class RazaController {


    @Autowired
    private RazaService razaService;

    @QueryMapping
    public List<Raza>  obtenerRaza()
    {
        return razaService.ObtenerRaza();
    }
    @QueryMapping
    public  Raza obtenerRazaPorId(@Argument Integer id)
    {
        return  razaService.ObtenerPorId(id);
    }

    @MutationMapping
    public Raza guardarRaza(@Argument Raza input) {
        return razaService.guardarRaza(input);
    }

    @MutationMapping
    public Raza actualizarRaza(@Argument Integer id, @Argument Raza input) {
        return razaService.actualizarRaza(id, input);
    }

    @MutationMapping
    public Raza eliminarRaza(@Argument Integer id) {
        return razaService.eliminarRaza(id);
    }

}
