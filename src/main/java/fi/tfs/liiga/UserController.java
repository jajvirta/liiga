package fi.tfs.liiga;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.dto.UserInfo;

@RestController
@Configuration
public class UserController {
    
    @Autowired
    private CurrentUserUtil current;

    @RequestMapping("/public-api/liiga/user")
    public UserInfo userinfo(Principal principal) {
        OAuth2Authentication oauth = (OAuth2Authentication) principal;
        if (oauth != null && oauth.isAuthenticated()) {
            return new UserInfo(true, current.getRealname());
        } else {
            return new UserInfo(false, null); 
        }
    }
 
}
