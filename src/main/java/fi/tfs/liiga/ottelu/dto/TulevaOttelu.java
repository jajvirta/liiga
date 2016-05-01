package fi.tfs.liiga.ottelu.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class TulevaOttelu {

    public final long otteluId;
    public final long lohkoId;
    public final Date pelipaiva;
    public final String formattedPelipaiva;
    public final long kotijoukkueId;
    public final String kotijoukkue;
    public final long vierasjoukkueId;
    public final String vierasjoukkue;
    public final String kotirata;
    
    public TulevaOttelu(long otteluId, long lohkoId, 
            Date pelipaiva, 
            long kotijoukkueId, String kotijoukkue, 
            long vierasjoukkueId, String vierasjoukkue, String kotirata) {
        super();
        this.otteluId = otteluId;
        this.lohkoId = lohkoId;
        Calendar c = new GregorianCalendar();
        c.setTime(pelipaiva);
        LocalDate of = java.time.LocalDate.of(c.get(Calendar.YEAR), c.get(Calendar.MONTH)+1, c.get(Calendar.DAY_OF_MONTH));
        String format = of.format(DateTimeFormatter.ofPattern("d.M."));
        // String format = of.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT));
        this.pelipaiva = pelipaiva;
        this.formattedPelipaiva = format;

        this.kotijoukkueId = kotijoukkueId;
        this.kotijoukkue = kotijoukkue;
        this.vierasjoukkueId = vierasjoukkueId;
        this.vierasjoukkue = vierasjoukkue;
        this.kotirata = kotirata;
    }
    
    
}
