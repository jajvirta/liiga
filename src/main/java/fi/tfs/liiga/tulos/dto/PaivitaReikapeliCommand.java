package fi.tfs.liiga.tulos.dto;

public class PaivitaReikapeliCommand {
    
    public final long otteluId;
    public final long kotijoukkue;
    public final long vierasjoukkue;
    
    public final ReikapeliUpdate reikapeli1;
    public final ReikapeliUpdate reikapeli2;
    public final ReikapeliUpdate reikapeli3;
    public final ReikapeliUpdate reikapeli4;
    
    public PaivitaReikapeliCommand(
            long otteluId,
            long kotijoukkue,
            long vierasjoukkue,
            ReikapeliUpdate reikapeli1,
            ReikapeliUpdate reikapeli2,
            ReikapeliUpdate reikapeli3,
            ReikapeliUpdate reikapeli4
            ) {
        this.otteluId = otteluId;
        this.kotijoukkue = kotijoukkue;
        this.vierasjoukkue = vierasjoukkue;
        this.reikapeli1 = reikapeli1;
        this.reikapeli2 = reikapeli2;
        this.reikapeli3 = reikapeli3;
        this.reikapeli4 = reikapeli4;
    }
}
