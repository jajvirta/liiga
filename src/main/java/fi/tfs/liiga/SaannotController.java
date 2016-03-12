package fi.tfs.liiga;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.dto.Saannot;

@RestController
public class SaannotController {
	
	@RequestMapping(value="/api/liiga/something", method=RequestMethod.POST)
	public void foo() {
		System.out.println("jep");
	}

	@RequestMapping(value="/api/liiga/get", method=RequestMethod.GET)
	public @ResponseBody Saannot baz() {
		System.out.println("jep");
		return new Saannot("asdoifj");
	}
}
