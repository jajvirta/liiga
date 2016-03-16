package fi.tfs.liiga.joukkue.dto;

public class Joukkue {
	
	public final String nimi;
	public final String kotirata;
	public final String yhteyshenkilo;
	public final int id;

	public Joukkue(String nimi, String kotirata, String yhteyshenkilo, int id) {
        super();
        this.nimi = nimi;
        this.kotirata = kotirata;
        this.yhteyshenkilo = yhteyshenkilo;
        this.id = id;
    }
}
