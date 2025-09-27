package Graphql.CRUD.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PorcinoDTO {

    private String identificacion;
    private Integer edad;
    private Float peso;
    private Integer razaId;
    private Integer alimentacionTipo;
    private String clienteCedula;
}
