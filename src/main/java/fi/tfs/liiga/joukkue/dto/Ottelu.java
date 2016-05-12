package fi.tfs.liiga.joukkue.dto;

public class Ottelu {
    
    public final long otteluId;
    public final long lohkoId;
    public final long sarjaId;
    public final String kotijoukkue;
    public final long kotijoukkueId;
    public final String vierasjoukkue;
    public final long vierasjoukkueId;
    public final String ajankohta;

    public Ottelu(
            long otteluId,
            long lohkoId,
            long sarjaId,
            String kotijoukkue, 
            long kotijoukkueId, 
            String vierasjoukkue, 
            long vierasjoukkueId,
            String ajankohta) {

        super();
        this.otteluId = otteluId;
        this.sarjaId = sarjaId;
        this.lohkoId = lohkoId;
        this.kotijoukkue = kotijoukkue;
        this.kotijoukkueId = kotijoukkueId;
        this.vierasjoukkue = vierasjoukkue;
        this.vierasjoukkueId = vierasjoukkueId;
        this.ajankohta = ajankohta;
    }
}
