package fi.tfs.liiga.joukkue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.joukkue.dto.Joukkue;

@RestController
public class JoukkueController {
	
	@Autowired
	private JoukkueDao dao;
	
	@RequestMapping("/api/liiga/joukkueet")
	public List<Joukkue> haeJoukkueet() {
		return dao.haeJoukkueet();
	}

	@RequestMapping("/api/liiga/joukkueet/alustavat")
	public List<Joukkue> haeAlustavatJoukkueet() {
		return dao.haeAlustavatJoukkueet();
	}
}
