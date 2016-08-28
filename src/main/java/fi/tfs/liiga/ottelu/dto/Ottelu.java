package fi.tfs.liiga.ottelu.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Ottelu {

    public final long otteluId;
    public final long lohkoId;
    public final Date pelipaiva;
    public final String formattedPelipaiva;
    public final long kotijoukkueId;
    public final String kotijoukkue;
    public final long vierasjoukkueId;
    public final String vierasjoukkue;
    public final String kotirata;
    public final int kpiste;
    public final int vpiste;
    public final int merkatut;
    
    private static String viikonpaiva(int dayOfWeek) {
        switch (dayOfWeek) {
            case Calendar.MONDAY: return "maanantaina";
            case Calendar.TUESDAY: return "tiistaina";
            case Calendar.WEDNESDAY: return "keskiviikkona";
            case Calendar.THURSDAY: return "torstaina";
            case Calendar.FRIDAY: return "perjantaina";
            case Calendar.SATURDAY: return "lauantaina";
            case Calendar.SUNDAY: return "sunnuntaina";
        }
        
        return "";
    }
    
    public Ottelu(long otteluId, long lohkoId, 
            Date pelipaiva, 
            long kotijoukkueId, String kotijoukkue, 
            long vierasjoukkueId, String vierasjoukkue, String kotirata,
            int kpiste, int vpiste, int merkatut
            ) {
        super();
        this.otteluId = otteluId;
        this.lohkoId = lohkoId;
        Calendar c = new GregorianCalendar();
        c.setTime(pelipaiva);
        LocalDate of = java.time.LocalDate.of(c.get(Calendar.YEAR), c.get(Calendar.MONTH)+1, c.get(Calendar.DAY_OF_MONTH));
        int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
        String format = viikonpaiva(dayOfWeek) + " " + of.format(DateTimeFormatter.ofPattern("d.M."));
        // String format = of.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT));
        this.pelipaiva = pelipaiva;
        this.formattedPelipaiva = format;

        this.kotijoukkueId = kotijoukkueId;
        this.kotijoukkue = kotijoukkue;
        this.vierasjoukkueId = vierasjoukkueId;
        this.vierasjoukkue = vierasjoukkue;
        this.kotirata = kotirata;
        this.kpiste = kpiste;
        this.vpiste = vpiste;
        this.merkatut = merkatut;
    }
}
