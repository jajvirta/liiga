package fi.tfs.liiga.joukkue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.joukkue.command.LisaaJoukkueCommand;
import fi.tfs.liiga.joukkue.dto.Joukkue;

@RestController
public class JoukkueController {
	
	@Autowired
	private JoukkueDao dao;
	
	@RequestMapping(value="/api/liiga/joukkueet/uusi", method=RequestMethod.POST)
	public void luoUusiJoukkue(@RequestBody LisaaJoukkueCommand lisaa) {
        OAuth2Authentication oauth = (OAuth2Authentication) 
	            SecurityContextHolder.getContext().getAuthentication();
	    // Principal principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println(lisaa.nimi + " " + lisaa.kotirata + " " + oauth);
		
		dao.lisaaJoukkue(lisaa, oauth.getName());
	}
	
	@RequestMapping("/public-api/liiga/joukkueet")
	public List<Joukkue> haeJoukkueet() {
		return dao.haeJoukkueet();
	}

	@RequestMapping("/public-api/liiga/joukkueet/alustavat")
	public List<Joukkue> haeAlustavatJoukkueet() {
		return dao.haeAlustavatJoukkueet();
	}
}
