package fi.tfs.liiga.ottelu;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.joukkue.dto.Joukkue;
import fi.tfs.liiga.ottelu.dto.TulevaOttelu;

@Component
public class OtteluService {
    
    @Autowired
    private OtteluDao dao;
    
    
    @Transactional
    public List<TulevaOttelu> haeTulevatOttelut() {
        return dao.haeTulevatOttelut();
    }
}
