package fi.tfs.liiga.tulos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.tulos.dto.OtteluJaTulos;
import fi.tfs.liiga.tulos.dto.OttelunTulos;
import fi.tfs.liiga.tulos.dto.PaivitaReikapeliCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulosCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulospeliCommand;
import fi.tfs.liiga.tulos.dto.Pelaajatilasto;

@RestController
public class TulosController {
    
    @Autowired
    private TulosService tulosService;

    @RequestMapping(value="/public-api/liiga/ottelu/{otteluId}", method=RequestMethod.GET)
    public OtteluJaTulos tulevatOttelut(@PathVariable long otteluId) {
        return tulosService.haeOttelu(otteluId);
    }

    @RequestMapping(value="/public-api/liiga/ottelu/{otteluId}/tulokset", method=RequestMethod.GET)
    public OttelunTulos haeTulokset(@PathVariable long otteluId) {
        return tulosService.haeOttelunTulos(otteluId);
    }

    @RequestMapping(value="/public-api/liiga/tilastot", method=RequestMethod.GET)
    public List<Pelaajatilasto> haeTilastot() {
        return tulosService.haeTilastot();
    }

    // TODO vaihda publicista privateen ja tee muutkin autorisointitarkistukset
    @RequestMapping(value="/api/liiga/ottelu/{otteluId}/tulospeli", method=RequestMethod.POST)
    public void paivitaTulospeli(@PathVariable long otteluId, @RequestBody PaivitaTulospeliCommand command) {
        tulosService.paivitaTulospeli(command);
    }
    // TODO vaihda publicista privateen ja tee muutkin autorisointitarkistukset
    @RequestMapping(value="/api/liiga/ottelu/{otteluId}/reikapeli", method=RequestMethod.POST)
    public void paivitaReikapeli(@PathVariable long otteluId, @RequestBody PaivitaReikapeliCommand command) {
        tulosService.paivitaReikapeli(command);
    }
    // TODO vaihda publicista privateen ja tee muutkin autorisointitarkistukset
    @RequestMapping(value="/api/liiga/ottelu/{otteluId}/kokonaistulos", method=RequestMethod.POST)
    public void paivitaKokonaistulos(@PathVariable long otteluId, @RequestBody PaivitaTulosCommand command) {
        tulosService.paivitaTulos(otteluId, command);
    }
}