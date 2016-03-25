package fi.tfs.liiga.joukkue;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.joukkue.dto.Joukkue;

@Component
public class JoukkueService {
    
    @Autowired
    private JoukkueDao dao;
    
    
    @Transactional
    public Joukkue getJoukkue(long joukkueId) {
        return dao.getJoukkue(joukkueId);
    }
    
    @Transactional
    public List<Joukkue> haeAlustavatJoukkueet() {
        return dao.haeAlustavatJoukkueet();
    }

    @Transactional
    public List<Joukkue> haeVahvistetutJoukkueet() {
        return dao.haeVahvistetutJoukkueet();
    }
}
