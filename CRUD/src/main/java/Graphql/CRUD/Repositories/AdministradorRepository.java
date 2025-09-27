package Graphql.CRUD.Repositories;

import Graphql.CRUD.Entities.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    boolean existsByUsuario (String usuario);


    Optional<Administrador> findByUsuario(String usuario);
}
