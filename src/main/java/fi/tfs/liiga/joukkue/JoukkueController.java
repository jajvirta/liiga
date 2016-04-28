package fi.tfs.liiga.joukkue;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.CurrentUserUtil;
import fi.tfs.liiga.joukkue.command.LisaaJoukkueCommand;
import fi.tfs.liiga.joukkue.dto.Joukkue;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;

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

    @RequestMapping(value="/public-api/liiga/joukkue/{joukkueId}/kalenteri", produces="text/calendar")
    public String haeJoukkueenKalenteri(@PathVariable Long joukkueId) {
        Calendar calendar = new Calendar();
        calendar.getProperties().add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.set(java.util.Calendar.MONTH, java.util.Calendar.DECEMBER);
        cal.set(java.util.Calendar.DAY_OF_MONTH, 25);
        cal.set(java.util.Calendar.HOUR_OF_DAY, 18);
        cal.clear(java.util.Calendar.MINUTE);
        cal.clear(java.util.Calendar.SECOND);
        // cal.set(java.util.Calendar.HOUR_OF_DAY, 21);
        
        Date date = cal.getTime();
        
        DateTime dt = new DateTime(cal.getTime());
        VEvent ve = new VEvent(dt, "Muaosdifj");
        calendar.getComponents().add(ve);
        
        System.out.println(calendar.toString());

        // calendar.

        return "BEGIN:VCALENDAR\n"
        + "VERSION:2.0\n"
        + "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n"
        + "BEGIN:VEVENT\n"
        + "UID:uid1@example.com\n"
        + "DTSTAMP:19970714T170000Z\n"
        + "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n"
        + "DTSTART:20160415T170000Z\n"
        + "DTEND:20160415T035959Z\n"
        + "SUMMARY:Testieventti\n"
        + "END:VEVENT\n"
        + "END:VCALENDAR";
    }

    @RequestMapping("/public-api/liiga/joukkueet/alustavat")
    public List<Joukkue> haeAlustavatJoukkueet() {
        return joukkueService.haeAlustavatJoukkueet();
    }

    @RequestMapping("/public-api/liiga/joukkueet/vahvistetut")
    public List<Joukkue> haeVahvistetutJoukkueet() {
        return joukkueService.haeVahvistetutJoukkueet();
    }
}
