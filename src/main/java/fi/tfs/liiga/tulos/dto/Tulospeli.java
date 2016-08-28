package fi.tfs.liiga.tulos.dto;

public class Tulospeli {

    public final int lohko;
    public final int joukkue;
    public final int joukkuelohko;
    public final String nimi;
    public final int pelaajaId;
    public final int sijoitus;
    public final int pisteet;
    
    public Tulospeli(int lohko, int joukkue, int joukkuelohko, String nimi, int pelaajaId, int sijoitus, int pisteet) {
        this.lohko = lohko;
        this.joukkue = joukkue;
        this.joukkuelohko = joukkuelohko;
        this.nimi = nimi;
        this.pelaajaId = pelaajaId;
        this.sijoitus = sijoitus;
        this.pisteet = pisteet;
    }
}
