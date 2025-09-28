package Graphql.CRUD.Config;

import Graphql.CRUD.Entities.Raza;
import Graphql.CRUD.Entities.Administrador;
import Graphql.CRUD.Repositories.RazaRepository;
import Graphql.CRUD.Repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RazaRepository razaRepository;
    
    @Autowired
    private AdministradorRepository administradorRepository;

    @Override
    public void run(String... args) throws Exception {
        // Inicializar razas si no existen
        if (razaRepository.count() == 0) {
            razaRepository.save(new Raza(1, "York"));
            razaRepository.save(new Raza(2, "Hampshire"));
            razaRepository.save(new Raza(3, "Duroc"));

            System.out.println("Razas inicializadas: York, Hampshire, Duroc");
        }
        
        // Inicializar usuario admin si no existe
        if (!administradorRepository.existsByUsuario("admin")) {
            Administrador admin = new Administrador();
            admin.setUsuario("admin");
            // Password: admin123
            admin.setContrasena("$2a$10$XsgCqXkL8QZz5Y5J3oVUzO1e5xXv1nLJQ5vL5Y3Z1QeWX8vK5XHm");
            administradorRepository.save(admin);
            System.out.println("Usuario admin inicializado con contraseña: admin123");
        }
    }

}
