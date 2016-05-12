package fi.tfs.liiga.ottelu;

import java.time.LocalDate;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.ottelu.dto.TulevaOttelu;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;

@RestController
public class OtteluController {
    
    @Autowired
    private OtteluService otteluService;

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/tulevat", method=RequestMethod.GET)
    public List<TulevaOttelu> tulevatOttelut(@PathVariable long lohkoId) {
        return otteluService.haeTulevatOttelut();
    }

    @RequestMapping(value="/public-api/liiga/{lohkoId}/ottelut/tulevat/{joukkueId}", method=RequestMethod.GET)
    public List<TulevaOttelu> tulevatOttelut(@PathVariable long lohkoId, @PathVariable long joukkueId) {
        return otteluService.haeTulevatOttelut(joukkueId);
    }

    private DateTime getEntry(int month, int day, int hour) {
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.set(java.util.Calendar.MONTH, month-1);
        cal.set(java.util.Calendar.DAY_OF_MONTH, day);
        cal.set(java.util.Calendar.HOUR_OF_DAY, hour);
        cal.clear(java.util.Calendar.MINUTE);
        cal.clear(java.util.Calendar.SECOND);
        cal.setTimeZone(TimeZone.getTimeZone("Europe/Helsinki"));
        
        DateTime dt = new DateTime(cal.getTime());
        
        return dt;
    }

    @RequestMapping(value="/public-api/liiga/joukkue/{joukkueId}/kalenteri", produces="text/calendar")
    public String haeJoukkueenKalenteri(@PathVariable Long joukkueId) {
        Calendar calendar = new Calendar();
        calendar.getProperties().add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);
        
        TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();

        VTimeZone tz = registry.getTimeZone("Europe/Helsinki").getVTimeZone();
        calendar.getComponents().add(tz); 
        
       
        List<TulevaOttelu> ottelut = otteluService.haeTulevatOttelut(joukkueId);
        for (TulevaOttelu ottelu : ottelut) {
            java.util.Calendar c = new GregorianCalendar();
            c.setTime(ottelu.pelipaiva);
            // LocalDate of = 
            LocalDate of = java.time.LocalDate.of(c.get(java.util.Calendar.YEAR), c.get(java.util.Calendar.MONTH)+1, c.get(java.util.Calendar.DAY_OF_MONTH));


            DateTime start = getEntry(c.get(java.util.Calendar.MONTH)+1, c.get(java.util.Calendar.DAY_OF_MONTH), 18);
            DateTime end = getEntry(c.get(java.util.Calendar.MONTH)+1, c.get(java.util.Calendar.DAY_OF_MONTH), 20);

            VEvent ve = new VEvent(start, end, ottelu.kotijoukkue + " vs. " + ottelu.vierasjoukkue + " (" + ottelu.kotirata + ")");
            calendar.getComponents().add(ve);
        }
       

        System.out.println("Printataan kalenteri " + joukkueId);
        // System.out.println(calendar.toString());

        return calendar.toString();
    }
}

