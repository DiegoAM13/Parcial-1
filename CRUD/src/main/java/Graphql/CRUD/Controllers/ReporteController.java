package Graphql.CRUD.Controllers;

import Graphql.CRUD.DTOS.ReporteDTO;
import Graphql.CRUD.Services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @QueryMapping
    public List<ReporteDTO> reportePorcino() {
        return reporteService.obtenerReporteClientesPorcinos();
    }

    @QueryMapping
    public List<ReporteDTO> reportePorcinosPorCliente(@Argument String cedula) {
        return reporteService.obtenerReportePorCliente(cedula);
    }
}
