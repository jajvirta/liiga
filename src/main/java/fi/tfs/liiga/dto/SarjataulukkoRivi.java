package fi.tfs.liiga.dto;

public class SarjataulukkoRivi {

    public final String joukkue;
    public final long lohkoId;
    public final long pelit;
    public final long voitot;
    public final long tasapelit;
    public final long haviot;
    public final long ottelupisteet;
    public final long kotiottelupisteet;
    public final long vierasottelupisteet;
    public final long pisteet;
    public final long kotipisteet;
    public final long vieraspisteet;

    public SarjataulukkoRivi(String joukkue, long lohkoId, long pelit, long voitot, 
            long tasapelit, long haviot, 
            long ottelupisteet,
            long kotiottelupisteet,
            long vierasottelupisteet,
            long pisteet,
            long kotipisteet,
            long vieraspisteet
            ) {
        super();
        this.joukkue = joukkue;
        this.lohkoId = lohkoId;
        this.pelit = pelit;
        this.voitot = voitot;
        this.tasapelit = tasapelit;
        this.haviot = haviot;
        this.ottelupisteet = ottelupisteet;
        this.kotiottelupisteet = kotiottelupisteet;
        this.vierasottelupisteet = vierasottelupisteet;
        this.pisteet = pisteet;
        this.kotipisteet = kotipisteet;
        this.vieraspisteet = vieraspisteet;
    }

}
