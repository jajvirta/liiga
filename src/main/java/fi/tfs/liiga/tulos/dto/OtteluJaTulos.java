package fi.tfs.liiga.tulos.dto;

import fi.tfs.liiga.ottelu.dto.Ottelu;

public class OtteluJaTulos {
    
    public final Ottelu ottelu;
    public final OttelunTulos tulos;
    
    public OtteluJaTulos(Ottelu ottelu, OttelunTulos tulos) {
        this.ottelu = ottelu;
        this.tulos = tulos;
    }
}
