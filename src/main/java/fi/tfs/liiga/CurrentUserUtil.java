package fi.tfs.liiga;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class CurrentUserUtil {

    @Bean
    @ConfigurationProperties("google.client")
    OAuth2ProtectedResourceDetails google() {
        return new AuthorizationCodeResourceDetails();
    }

    @Bean
    @ConfigurationProperties("facebook.client")
    OAuth2ProtectedResourceDetails facebook() {
        return new AuthorizationCodeResourceDetails();
    }
    
    public String getOauth2Id() {
        OAuth2Authentication oauth = (OAuth2Authentication) 
                SecurityContextHolder.getContext().getAuthentication();
        return oauth.getName();
    }
    
    public String getRealname() {
         OAuth2Authentication oauth = (OAuth2Authentication) 
                SecurityContextHolder.getContext().getAuthentication();
        OAuth2Request oAuth2Request = oauth.getOAuth2Request();
        Authentication userAuthentication = oauth.getUserAuthentication();

        if (oAuth2Request.getClientId().equals(google().getClientId())) {
            Map<String, Map<String, String>> realdetails = (Map<String, Map<String, String>>) userAuthentication.getDetails();
            Map<String, String> map = realdetails.get("name");
            return String.format("%s %s", map.get("givenName"), map.get("familyName"));
        } else if (oAuth2Request.getClientId().equals(facebook().getClientId())) {
            Map<String, String> realdetails = (Map<String, String>) userAuthentication.getDetails();
            return realdetails.get("name");
        }

        return "";
    }

    public static String getCurrentUserOauthId() {
        OAuth2Authentication oauth = (OAuth2Authentication) 
                SecurityContextHolder.getContext().getAuthentication();

        return oauth.getName();
    }
}
