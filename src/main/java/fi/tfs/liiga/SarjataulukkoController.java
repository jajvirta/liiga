package fi.tfs.liiga;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.dto.Sarjataulukko;
import fi.tfs.liiga.dto.SarjataulukkoRivi;

@RestController
public class SarjataulukkoController {
	
	@RequestMapping("/public-api/liiga/sarjataulukko")
	public Sarjataulukko sarjataulukko() {

		Sarjataulukko sarjataulukko = new Sarjataulukko();
		sarjataulukko.addRivi(new SarjataulukkoRivi("Hustlers", 10, 28));
		sarjataulukko.addRivi(new SarjataulukkoRivi("Joku Players Tai Vastaava", 12, 24));
		sarjataulukko.addRivi(new SarjataulukkoRivi("Taka-9", 13, 18));
		sarjataulukko.addRivi(new SarjataulukkoRivi("BC/X", 10, 18));
		
		return sarjataulukko;
	}
}
