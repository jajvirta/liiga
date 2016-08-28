package fi.tfs.liiga.tulos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fi.tfs.liiga.tulos.dto.OtteluJaTulos;
import fi.tfs.liiga.tulos.dto.OttelunTulos;
import fi.tfs.liiga.tulos.dto.PaivitaReikapeliCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulosCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulospeliCommand;
import fi.tfs.liiga.tulos.dto.Pelaajatilasto;


@Component
public class TulosService {
    
    @Autowired
    private TulosDao dao;
    
    
    @Transactional
    public OtteluJaTulos haeOttelu(long otteluId) {
        return dao.haeOttelu(otteluId);
    }

    @Transactional
    public OttelunTulos haeOttelunTulos(long otteluId) {
        return dao.haeOttelunTulos(otteluId);
    }

    // TODO autorisointitarkistus
    @Transactional
    public void paivitaTulospeli(PaivitaTulospeliCommand command) {
        dao.paivitaTulospeli(command);
    }

    @Transactional
    public void paivitaReikapeli(PaivitaReikapeliCommand command) {
        dao.lisaaReikapeli(command);
        System.out.println(command.otteluId + " " + command.reikapeli1.koti + " - " + command.reikapeli1.vieras + " -> " + command.reikapeli1.tulos);
    }

    @Transactional(readOnly=false)
    public void paivitaTulos(long otteluId, PaivitaTulosCommand command) {
        dao.paivitaTulos(otteluId, command);
        System.out.println("päivitetty tulos: " + otteluId + " " + command.kotipisteet + " - " + command.vieraspisteet);
    }

    @Transactional
    public List<Pelaajatilasto> haeTilastot() {
        return dao.haeTilastot();
    }
}