package fi.tfs.liiga.joukkue.command;

public class LisaaJoukkueCommand {

	public final String nimi;
	public final String kotirata;
	public final String yhteyshenkiloNimi;
	public final String yhteyshenkiloPuhelinnumero;
	public final String yhteyshenkiloSahkoposti;

	public LisaaJoukkueCommand(String nimi, String kotirata, String yhteyshenkiloNimi,
			String yhteyshenkiloPuhelinnumero, String yhteyshenkiloSahkoposti) {
		super();
		this.nimi = nimi;
		this.kotirata = kotirata;
		this.yhteyshenkiloNimi = yhteyshenkiloNimi;
		this.yhteyshenkiloPuhelinnumero = yhteyshenkiloPuhelinnumero;
		this.yhteyshenkiloSahkoposti = yhteyshenkiloSahkoposti;
	}
	
	
}
