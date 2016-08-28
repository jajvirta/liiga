package fi.tfs.liiga.sarjataulukko;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.dto.SarjataulukkoRivi;
import fi.tfs.liiga.joukkue.JoukkueDao;
import fi.tfs.liiga.joukkue.dto.Joukkue;
import fi.tfs.liiga.ottelu.OtteluDao;
import fi.tfs.liiga.ottelu.dto.Ottelu;

@Component
public class SarjataulukkoService {
    
    
    @Autowired
    private OtteluDao otteluDao;
    
    @Autowired
    private JoukkueDao joukkueDao;
    
    private static int sarjapisteet(int ottelupisteet) {
        return (ottelupisteet == 10 ? 1 : (ottelupisteet > 10) ? 3 : 0);
    }
    
    private static long tietytPelit(List<Ottelu> ottelut, int joukkueId, int pistemaara) {
        return ottelut
                .stream()
                .filter(o -> o.kotijoukkueId == joukkueId)
                .filter(o -> pistemaara > 0 ? sarjapisteet(o.kpiste) == pistemaara : sarjapisteet(o.kpiste) == pistemaara && sarjapisteet(o.vpiste) > 0)
                .count() 
                + 
                ottelut
                .stream()
                .filter(o -> o.vierasjoukkueId == joukkueId)
                .filter(o -> pistemaara > 0 ? sarjapisteet(o.vpiste) == pistemaara : sarjapisteet(o.vpiste) == pistemaara && sarjapisteet(o.kpiste) > 0)
                .count();
    }
    
    public List<SarjataulukkoRivi> haeSarjatilanne() {
        List<Ottelu> ottelut = otteluDao.haeTulevatOttelut();
        
        List<Joukkue> joukkueet = joukkueDao.haeJoukkueet();
        List<SarjataulukkoRivi> sarjataulukko = new ArrayList<>();
        
        for (Joukkue joukkue : joukkueet) {
            long voitot = tietytPelit(ottelut, joukkue.joukkueId, 3);
            long tasapelit = tietytPelit(ottelut, joukkue.joukkueId, 1);
            long haviot = tietytPelit(ottelut, joukkue.joukkueId, 0);
            
            long lohkoId = ottelut.stream()
                .filter(o -> o.kotijoukkueId == joukkue.joukkueId)
                .findAny().get().lohkoId;

            int kotipisteet = ottelut.stream().filter(o -> o.kotijoukkueId == joukkue.joukkueId).mapToInt(o -> sarjapisteet(o.kpiste)).sum();
            int vieraspisteet = ottelut.stream().filter(o -> o.vierasjoukkueId == joukkue.joukkueId).mapToInt(o -> sarjapisteet(o.vpiste)).sum();

            int kotiottelupisteet = ottelut.stream().filter(o -> o.kotijoukkueId == joukkue.joukkueId).mapToInt(o -> o.kpiste).sum();
            int vierasottelupisteet = ottelut.stream().filter(o -> o.vierasjoukkueId == joukkue.joukkueId).mapToInt(o -> o.vpiste).sum();
            // System.out.println(joukkue.nimi + ": " + (voitot) + " , " + kotipisteet + " " + vieraspisteet + "(" + ottelumaara + ")");

            sarjataulukko.add(new SarjataulukkoRivi(joukkue.nimi, 
                    lohkoId,
                    (voitot + tasapelit + haviot), voitot, tasapelit, haviot, 
                    (kotiottelupisteet + vierasottelupisteet),
                    (kotipisteet + vieraspisteet)));  
        }

        List<SarjataulukkoRivi> collect = sarjataulukko
                .stream()
                .sorted((s1, s2) -> s1.pisteet == s2.pisteet ? Long.compare(s1.ottelupisteet, s2.ottelupisteet) : Long.compare(s1.pisteet, s2.pisteet))
                .collect(Collectors.toList());

        Collections.reverse(collect);

        for (SarjataulukkoRivi rivi : collect) {
           // System.out.println(rivi.joukkue + " " + rivi.pisteet);
        }
        
        return collect;
    }

}
