package fi.tfs.liiga.joukkue.command;

public class LisaaJoukkueCommand {

    public final String sarja;
    public final String nimi;
    public final String kotirata;
    public final String yhteyshenkiloNimi;
    public final String yhteyshenkiloPuhelinnumero;
    public final String yhteyshenkiloSahkoposti;
    public final String kuvaus;

    public LisaaJoukkueCommand(String sarja, String nimi, String kotirata, String yhteyshenkiloNimi,
            String yhteyshenkiloPuhelinnumero, String yhteyshenkiloSahkoposti,
            String kuvaus
            ) {
        super();
        this.sarja = sarja;
        this.nimi = nimi;
        this.kotirata = kotirata;
        this.yhteyshenkiloNimi = yhteyshenkiloNimi;
        this.yhteyshenkiloPuhelinnumero = yhteyshenkiloPuhelinnumero;
        this.yhteyshenkiloSahkoposti = yhteyshenkiloSahkoposti;
        this.kuvaus = kuvaus;
    }
}
