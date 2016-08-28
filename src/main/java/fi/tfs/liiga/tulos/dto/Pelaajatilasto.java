package fi.tfs.liiga.tulos.dto;

public class Pelaajatilasto {
    
    public final int pelaajaId;
    public final String nimi;
    public final int joukkuelohko;
    
    public final int ottelut;
    public final int tulospisteet;
    public final int reikapelipisteet;
    
    public Pelaajatilasto(int pelaajaId, String nimi, int joukkuelohko, int ottelut, int tulospisteet, int reikapelipisteet) {
        this.pelaajaId = pelaajaId;
        this.nimi = nimi;
        this.joukkuelohko = joukkuelohko;
        
        this.ottelut = ottelut;
        this.tulospisteet = tulospisteet;
        this.reikapelipisteet = reikapelipisteet;
    }
}
