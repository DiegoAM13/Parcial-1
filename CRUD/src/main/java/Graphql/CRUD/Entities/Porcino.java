package Graphql.CRUD.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Porcino")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Porcino {

    @Id
    @Column(nullable = false, length = 5)
    private String identificacion;

    @Column(nullable = false)
    private Integer edad;

    @Column(nullable = false)
    private Float peso;

    @ManyToOne
    @JoinColumn(name = "raza_Id", referencedColumnName = "id")
    private Raza raza;

    @ManyToOne
    @JoinColumn(name = "alimentacion_tipo", referencedColumnName = "tipo")
    private Alimentacion alimentacion;

    @ManyToOne
    @JoinColumn(name = "cliente_cedula", referencedColumnName = "cedula")
    private Cliente cliente ;

}
