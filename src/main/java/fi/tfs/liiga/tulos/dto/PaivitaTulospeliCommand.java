package fi.tfs.liiga.tulos.dto;

public class PaivitaTulospeliCommand {
    
    public final String voittajaNimi;
    public final int voittajaJoukkue;
    public final String kakkonenNimi;
    public final int kakkonenJoukkue;
    public final String kolmonenNimi;
    public final int kolmonenJoukkue;
    public final String nelonenNimi;
    public final int nelonenJoukkue;
    
    public final String lohko;
    public final String sijoitus;
    public final long otteluId;
    
    public PaivitaTulospeliCommand(
            long otteluId,
            String voittajaNimi, 
            int voittajaJoukkue,
            String kakkonenNimi, 
            int kakkonenJoukkue,
            String kolmonenNimi, 
            int kolmonenJoukkue,
            String nelonenNimi, 
            int nelonenJoukkue,
            String lohko, 
            String sijoitus) {
        this.otteluId = otteluId;
        this.voittajaNimi = voittajaNimi;
        this.voittajaJoukkue = voittajaJoukkue;
        this.kakkonenNimi = kakkonenNimi;
        this.kakkonenJoukkue = kakkonenJoukkue;
        this.kolmonenNimi = kolmonenNimi;
        this.kolmonenJoukkue = kolmonenJoukkue;
        this.nelonenNimi = nelonenNimi;
        this.nelonenJoukkue = nelonenJoukkue;
        this.lohko = lohko;
        this.sijoitus = sijoitus;
    }
}
