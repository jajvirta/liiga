package fi.tfs.liiga.tulos.dto;

public class PaivitaTulosCommand {
    
    public final int kotipisteet;
    public final int vieraspisteet;
    
    public PaivitaTulosCommand(int kotipisteet, int vieraspisteet) {
        this.kotipisteet = kotipisteet;
        this.vieraspisteet = vieraspisteet;
    }
}
