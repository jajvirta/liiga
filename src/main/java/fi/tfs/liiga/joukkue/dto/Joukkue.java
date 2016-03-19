package fi.tfs.liiga.joukkue.dto;

public class Joukkue {

    public final String nimi;
    public final String kotirata;
    public final String yhteyshenkilo;
    public final String yhteyshenkiloSahkoposti;
    public final String yhteyshenkiloPuhelinnumero;
    public final int id;

    public Joukkue(
            String nimi, 
            String kotirata, 
            String yhteyshenkilo, 
            String yhteyshenkiloSahkoposti,
            String yhteyshenkiloPuhelinnumero,
            int id) {
        super();
        this.nimi = nimi;
        this.kotirata = kotirata;
        this.yhteyshenkilo = yhteyshenkilo;
        this.yhteyshenkiloSahkoposti = yhteyshenkiloSahkoposti;
        this.yhteyshenkiloPuhelinnumero = yhteyshenkiloPuhelinnumero;
        this.id = id;
    }
}
