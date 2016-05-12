package fi.tfs.liiga.sarjataulukko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.dto.Sarjataulukko;

@RestController
public class SarjataulukkoController {
    
    @Autowired
    private SarjataulukkoDao dao;
    
    @Autowired
    private SarjataulukkoService service;

    @RequestMapping("/public-api/liiga/sarjataulukko")
    public Sarjataulukko sarjataulukko() {
        return Sarjataulukko.of(service.haeSarjatilanne());
    }
}
