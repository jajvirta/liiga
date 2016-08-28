package fi.tfs.liiga.tulos.dto;

public class Reikapeli {
    
    public final int kotipelaajaId;
    public final String kotipelaaja;
    public final int kotipisteet;
    
    public final int vieraspelaajaId;
    public final String vieraspelaaja;
    public final int vieraspisteet;
    
    public final String tulosString;
    public final int jarjestys;
    
    public Reikapeli(int kotipelaajaId, String kotipelaaja, int kotipisteet,
            int vieraspelaajaId, String vieraspelaaja, 
            int vieraspisteet, String tulosString,
            int jarjestys) {
        this.kotipelaajaId = kotipelaajaId;
        this.kotipelaaja = kotipelaaja;
        this.kotipisteet = kotipisteet;
        this.vieraspelaajaId = vieraspelaajaId;
        this.vieraspelaaja = vieraspelaaja;
        this.vieraspisteet = vieraspisteet;
        this.tulosString = tulosString;
        this.jarjestys = jarjestys;
    }
}
