package fi.tfs.liiga;

import java.security.Principal;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.tfs.liiga.dto.UserInfo;

@RestController
public class UserController {

    @RequestMapping("/user") // TODO FIXME
    public Principal user(Principal principal) {
        OAuth2Authentication oauth = (OAuth2Authentication) principal;
        System.out.println(oauth.getUserAuthentication().getDetails());
        System.out.println(oauth.getUserAuthentication().getName());
        return principal;
    }
    
    @RequestMapping("/api/liiga/user")
    public UserInfo userinfo(Principal principal) {
        OAuth2Authentication oauth = (OAuth2Authentication) principal;
        if (oauth != null && oauth.isAuthenticated()) {
            OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) oauth.getDetails();
            Authentication userAuthentication = oauth.getUserAuthentication();
            Map<String, String> realdetails = (Map<String, String>) userAuthentication.getDetails();

            // Map details = (Map) oauth.getDetails();
            System.out.println(realdetails);

            return new UserInfo(true, realdetails.get("name"));
        } else {
            return new UserInfo(true, null); 
        }
    }
 
}
