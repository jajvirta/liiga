package fi.tfs.liiga.joukkue.dto;

public class Joukkue {
	
	private String nimi;
	private String kotirata;
	private int id;

	public String getNimi() {
		return nimi;
	}

	public void setNimi(String nimi) {
		this.nimi = nimi;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getKotirata() {
		return kotirata;
	}

	public void setKotirata(String kotirata) {
		this.kotirata = kotirata;
	}
	

}
