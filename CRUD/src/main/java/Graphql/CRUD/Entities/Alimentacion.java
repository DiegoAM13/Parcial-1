package Graphql.CRUD.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Alimentacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alimentacion {

    @Id
    @Column(nullable = false,length =2)
    private Integer tipo;

    @Column(nullable = false,length = 100)
    private String descripcion;

    @Column(nullable = false)
    private Float dosis;
}
