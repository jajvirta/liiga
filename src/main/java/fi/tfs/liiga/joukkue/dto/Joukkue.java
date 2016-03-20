package fi.tfs.liiga.joukkue.dto;

public class Joukkue {

    public final int joukkueId;
    public final String nimi;
    public final String kotirata;
    public final String yhteyshenkilo;
    public final String yhteyshenkiloSahkoposti;
    public final String yhteyshenkiloPuhelinnumero;

    public Joukkue(
            int id,
            String nimi, 
            String kotirata, 
            String yhteyshenkilo, 
            String yhteyshenkiloSahkoposti,
            String yhteyshenkiloPuhelinnumero) {
        super();
        this.nimi = nimi;
        this.kotirata = kotirata;
        this.yhteyshenkilo = yhteyshenkilo;
        this.yhteyshenkiloSahkoposti = yhteyshenkiloSahkoposti;
        this.yhteyshenkiloPuhelinnumero = yhteyshenkiloPuhelinnumero;
        this.joukkueId = id;
    }
}
