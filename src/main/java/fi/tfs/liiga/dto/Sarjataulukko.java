package fi.tfs.liiga.dto;

import java.util.ArrayList;
import java.util.List;

public class Sarjataulukko {

    private List<SarjataulukkoRivi> rivit = new ArrayList<>();

    public Sarjataulukko() {
    }

    public void addRivi(SarjataulukkoRivi rivi) {
        rivit.add(rivi);
    }

    public List<SarjataulukkoRivi> getRivit() {
        return rivit;
    }

    public void setRivit(List<SarjataulukkoRivi> rivit) {
        this.rivit = rivit;
    }

    public static Sarjataulukko of(List<SarjataulukkoRivi> haeSarjatilanne) {
        Sarjataulukko sarjataulukko = new Sarjataulukko();
        sarjataulukko.setRivit(haeSarjatilanne);
        
        return sarjataulukko;
    }
}
