package fi.tfs.liiga;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public class CurrentUserUtil {

    public static String getCurrentUserOauthId() {
        OAuth2Authentication oauth = (OAuth2Authentication) 
                SecurityContextHolder.getContext().getAuthentication();

        return oauth.getName();
    }
}
