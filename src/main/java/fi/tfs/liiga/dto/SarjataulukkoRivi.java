package fi.tfs.liiga.dto;

public class SarjataulukkoRivi {
	
	private String joukkue;
	private int pelit;
	private int pisteet;
	
	public SarjataulukkoRivi() {
	}
	
	public SarjataulukkoRivi(String joukkue, int pelit, int pisteet) {
		super();
		this.joukkue = joukkue;
		this.pelit = pelit;
		this.pisteet = pisteet;
	}
	public String getJoukkue() {
		return joukkue;
	}
	public void setJoukkue(String joukkue) {
		this.joukkue = joukkue;
	}
	public int getPelit() {
		return pelit;
	}
	public void setPelit(int pelit) {
		this.pelit = pelit;
	}
	public int getPisteet() {
		return pisteet;
	}
	public void setPisteet(int pisteet) {
		this.pisteet = pisteet;
	}

}
