package fi.tfs.liiga.ottelu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.ottelu.dto.TulevaOttelu;

@RestController
public class OtteluController {
    
    @Autowired
    private OtteluService otteluService;

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/tulevat", method=RequestMethod.GET)
    public List<TulevaOttelu> tulevatOttelut(@PathVariable long lohkoId) {
        return otteluService.haeTulevatOttelut();
    }

}
