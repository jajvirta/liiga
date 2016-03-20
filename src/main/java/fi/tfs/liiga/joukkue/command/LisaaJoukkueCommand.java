package fi.tfs.liiga.joukkue.command;

public class LisaaJoukkueCommand {

    public final String nimi;
    public final String kotirata;
    public final String yhteyshenkiloNimi;
    public final String yhteyshenkiloPuhelinnumero;
    public final String yhteyshenkiloSahkoposti;
    public final String muuPelaaja1;
    public final String muuPelaaja2;
    public final String muuPelaaja3;

    public LisaaJoukkueCommand(String nimi, String kotirata, String yhteyshenkiloNimi,
            String yhteyshenkiloPuhelinnumero, String yhteyshenkiloSahkoposti,
            String muuPelaaja1, String muuPelaaja2, String muuPelaaja3
            ) {
        super();
        this.nimi = nimi;
        this.kotirata = kotirata;
        this.yhteyshenkiloNimi = yhteyshenkiloNimi;
        this.yhteyshenkiloPuhelinnumero = yhteyshenkiloPuhelinnumero;
        this.yhteyshenkiloSahkoposti = yhteyshenkiloSahkoposti;
        this.muuPelaaja1 = muuPelaaja1;
        this.muuPelaaja2 = muuPelaaja2;
        this.muuPelaaja3 = muuPelaaja3;
    }
}
