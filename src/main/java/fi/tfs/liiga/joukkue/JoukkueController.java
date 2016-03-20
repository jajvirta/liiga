package fi.tfs.liiga.joukkue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private JoukkueDao dao;

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


    @RequestMapping("/public-api/liiga/joukkueet/alustavat")
    public List<Joukkue> haeAlustavatJoukkueet() {
        return dao.haeAlustavatJoukkueet();
    }
}
