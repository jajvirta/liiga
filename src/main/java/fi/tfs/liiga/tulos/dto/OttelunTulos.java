package fi.tfs.liiga.tulos.dto;

import java.util.Optional;

public class OttelunTulos {
    
    public final Optional<Tulospeli> lohko1Voittaja;
    public final Optional<Tulospeli> lohko1Kakkonen;
    public final Optional<Tulospeli> lohko1Kolmonen;
    public final Optional<Tulospeli> lohko1Nelonen;
    
    public final Optional<Tulospeli> lohko2Voittaja;
    public final Optional<Tulospeli> lohko2Kakkonen;
    public final Optional<Tulospeli> lohko2Kolmonen;
    public final Optional<Tulospeli> lohko2Nelonen;
    
    public final Optional<Reikapeli> ensimmainen;
    public final Optional<Reikapeli> toinen;
    public final Optional<Reikapeli> kolmas;
    public final Optional<Reikapeli> neljas;
    
    
    public OttelunTulos(
            Optional<Tulospeli> lohko1Voittaja, 
            Optional<Tulospeli> lohko1Kakkonen,
            Optional<Tulospeli> lohko1Kolmonen,
            Optional<Tulospeli> lohko1Nelonen,
            Optional<Tulospeli> lohko2Voittaja,
            Optional<Tulospeli> lohko2Kakkonen,
            Optional<Tulospeli> lohko2Kolmonen,
            Optional<Tulospeli> lohko2Nelonen,
            Optional<Reikapeli> ensimmainen,
            Optional<Reikapeli> toinen,
            Optional<Reikapeli> kolmas,
            Optional<Reikapeli> neljas
            ) {
        this.lohko1Voittaja = lohko1Voittaja;
        this.lohko1Kakkonen = lohko1Kakkonen;
        this.lohko1Kolmonen = lohko1Kolmonen;
        this.lohko1Nelonen = lohko1Nelonen;
        
        this.lohko2Voittaja = lohko2Voittaja;
        this.lohko2Kakkonen = lohko2Kakkonen;
        this.lohko2Kolmonen = lohko2Kolmonen;
        this.lohko2Nelonen = lohko2Nelonen;
        
        this.ensimmainen = ensimmainen;
        this.toinen = toinen;
        this.kolmas = kolmas;
        this.neljas = neljas;
    }

}
