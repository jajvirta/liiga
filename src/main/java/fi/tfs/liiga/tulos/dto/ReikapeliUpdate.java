package fi.tfs.liiga.tulos.dto;

public class ReikapeliUpdate {
    
    public final String koti;
    public final String vieras;
    public final String tulos;
    
    public ReikapeliUpdate(String koti, String vieras, String tulos) {
        this.koti = koti;
        this.vieras = vieras;
        this.tulos = tulos;
    }
}
