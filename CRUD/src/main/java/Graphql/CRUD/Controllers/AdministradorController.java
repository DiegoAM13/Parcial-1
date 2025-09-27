package Graphql.CRUD.Controllers;

import Graphql.CRUD.DTOS.LoginDTO;
import Graphql.CRUD.Entities.Administrador;
import Graphql.CRUD.Services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @QueryMapping
    public Administrador  obtenerAdministradorPorUsuario(@Argument String usuario)
    {
        return administradorService.obtenerAdministradorPorUsuario(usuario);
    }


    @MutationMapping
    public Administrador guardarAdministrador(@Argument("input") LoginDTO loginDTO)
    {
        return administradorService.CrearAdmin(loginDTO);

    }

    @MutationMapping
    public Administrador eliminarAdministrador(@Argument String usuario)
    {
        return administradorService.EliminarAdmin(usuario);
    }

    @MutationMapping
    public Administrador actualizarAdministrador(@Argument  String usuario, @Argument("input") LoginDTO loginDTO)
    {
        return administradorService.ActualizarAdministrador(usuario, loginDTO);
    }
}
