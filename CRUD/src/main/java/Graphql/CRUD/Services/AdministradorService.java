package Graphql.CRUD.Services;

import Graphql.CRUD.DTOS.LoginDTO;
import Graphql.CRUD.Entities.*;
import Graphql.CRUD.Repositories.AdministradorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;



    public Administrador obtenerAdministradorPorUsuario( String usuario)
    {
        return administradorRepository.findByUsuario(usuario).orElse(null);
    }
    public  Administrador CrearAdmin(LoginDTO loginDTO)
    {
        if (administradorRepository.existsByUsuario(loginDTO.getUsuario()))
        {
            new IllegalArgumentException("El usuario ya existe");
        }

        Administrador administrador = new Administrador();

        administrador.setUsuario(loginDTO.getUsuario());
        administrador.setContrasena(loginDTO.getContrasena());
        return administradorRepository.save(administrador);


    }

    public Administrador ActualizarAdministrador(String usuario,LoginDTO loginDTO)
    {
        Administrador administradorActualizar = administradorRepository.findByUsuario(usuario)
                .orElseThrow(()-> new EntityNotFoundException(""+usuario+" no fue encontrado"));


        if (loginDTO.getUsuario() != null) {administradorActualizar.setUsuario(loginDTO.getUsuario());}
        if (loginDTO.getContrasena() != null) {administradorActualizar.setContrasena(loginDTO.getContrasena());}

        Administrador guardado = administradorRepository.save(administradorActualizar);
        return guardado;

    }

    public Administrador EliminarAdmin(String usuario)
    {
        Administrador administrador = administradorRepository.findByUsuario(usuario)
                .orElseThrow(()-> new IllegalArgumentException("El usuario no existe"));

        administradorRepository.delete(administrador);
        return  administrador;
    }
}
