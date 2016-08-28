package fi.tfs.liiga.ottelu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.ottelu.dto.Ottelu;

@RestController
public class OtteluController {
    
    @Autowired
    private OtteluService otteluService;

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/tulevat", method=RequestMethod.GET)
    public List<Ottelu> tulevatOttelut(@PathVariable long lohkoId) {
        return otteluService.haeTulevatOttelut();
    }

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/tulevat/{joukkueId}", method=RequestMethod.GET)
    public List<Ottelu> tulevatOttelut(@PathVariable long lohkoId, @PathVariable long joukkueId) {
        return otteluService.haeTulevatOttelut(joukkueId);
    }

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/syksy/{joukkueId}", method=RequestMethod.GET)
    public List<Ottelu> tulevatOttelutSyksy(@PathVariable long lohkoId, @PathVariable long joukkueId) {
        return otteluService.haeTulevatOttelut(joukkueId, "2016-07-01");
    }

    @RequestMapping(value="/public-api/liiga/joukkue/{joukkueId}/kalenteri/syksy", produces="text/calendar")
    public String haeJoukkueenSyyskalenteri(@PathVariable Long joukkueId) {
        return otteluService.teeSyyskalenteri(joukkueId);
    }
    @RequestMapping(value="/public-api/liiga/joukkue/{joukkueId}/kalenteri", produces="text/calendar")
    public String haeJoukkueenKalenteri(@PathVariable Long joukkueId) {
        return otteluService.teeKalenteri(joukkueId);
    }
}

