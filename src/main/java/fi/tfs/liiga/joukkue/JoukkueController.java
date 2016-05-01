package fi.tfs.liiga.joukkue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.CurrentUserUtil;
import fi.tfs.liiga.joukkue.command.LisaaJoukkueCommand;
import fi.tfs.liiga.joukkue.dto.Joukkue;

@RestController
public class JoukkueController {
    
    @Value("${environment:}")
    private String env; 

    @Autowired
    private JoukkueDao dao;
    
    @Autowired
    private JoukkueService joukkueService;

    @RequestMapping(value="/api/liiga/joukkueet/uusi", method=RequestMethod.POST)
    public void luoUusiJoukkue(@RequestBody LisaaJoukkueCommand lisaa) {
        dao.lisaaJoukkue(lisaa, CurrentUserUtil.getCurrentUserOauthId());
    }

    @RequestMapping(value="/api/liiga/joukkueet/{joukkueId}", method=RequestMethod.DELETE)
    public void poistaJoukkue(@PathVariable int joukkueId) {
        System.out.println("poistetaan " + joukkueId);
        dao.poistaJoukkue(joukkueId, CurrentUserUtil.getCurrentUserOauthId());
    }

    @RequestMapping("/api/liiga/joukkueet/kirjautuneen-kayttajan-joukkue")
    public List<Joukkue> haeJoukkue() {
        return dao.haeJoukkue(CurrentUserUtil.getCurrentUserOauthId());
    }

    @RequestMapping("/public-api/liiga/joukkueet")
    public List<Joukkue> haeJoukkueet() {
        return dao.haeJoukkueet();
    }
    
    
    @RequestMapping("/public-api/liiga/joukkue/{joukkueId}")
    public Joukkue haeJoukkue(@PathVariable Long joukkueId) {
        return joukkueService.getJoukkue(joukkueId.longValue());
    }
    
    @RequestMapping("/public-api/liiga/joukkueet/alustavat")
    public List<Joukkue> haeAlustavatJoukkueet() {
        return joukkueService.haeAlustavatJoukkueet();
    }

    @RequestMapping("/public-api/liiga/joukkueet/vahvistetut")
    public List<Joukkue> haeVahvistetutJoukkueet() {
        return joukkueService.haeVahvistetutJoukkueet();
    }

    @RequestMapping(value="/public-api/liiga/generoi-testijoukkueet", method=RequestMethod.GET)
    public String generoiJoukkueet() {
        if (env != null && "development".equals(env)) {
            LisaaJoukkueCommand l = 
                    new LisaaJoukkueCommand("tfsliiga", "Woodpeckers", "Kylmis", "Marko", "12", "f@b.fo", "");
            dao.lisaaJoukkue(l, "123");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Sasta FG", "Häntyri", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "HV", "Vihnu", "Jarno", "12", "f@b.fo", ""), "125");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Herwanta DGG", "Hervanta", "Mikko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Nelosketju", "Epilä", "Mika", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Maajoukkue 2", "Vihku", "Mika", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Äetsä", "Äetsä", "M", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Ylöjärven Ryhti", "Julku", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Aviaattorit", "Pirkkala", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Brutal Force", "Hämeenkyrö", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "DG Keijjot", "Julku", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "Kiakkogosset", "Valkeakoski", "Marko", "12", "f@b.fo", ""), "124");
            dao.lisaaJoukkue(new LisaaJoukkueCommand("tfsliiga", "VlkDG", "Valkeakosi", "Marko", "12", "f@b.fo", ""), "124");
            return "OK"; 
        } else {
            return "not dev, doing nothing";
        }
        
    }
}
