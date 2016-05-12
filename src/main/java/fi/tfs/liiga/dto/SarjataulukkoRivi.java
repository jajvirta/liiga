package fi.tfs.liiga.dto;

public class SarjataulukkoRivi {

    public final String joukkue;
    public final long lohkoId;
    public final long pelit;
    public final long voitot;
    public final long tasapelit;
    public final long haviot;
    public final long ottelupisteet;
    public final long pisteet;

    public SarjataulukkoRivi(String joukkue, long lohkoId, long pelit, long voitot, long tasapelit, long haviot, long ottelupisteet, long pisteet) {
        super();
        this.joukkue = joukkue;
        this.lohkoId = lohkoId;
        this.pelit = pelit;
        this.voitot = voitot;
        this.tasapelit = tasapelit;
        this.haviot = haviot;
        this.ottelupisteet = ottelupisteet;
        this.pisteet = pisteet;
    }

}
