package fi.tfs.liiga;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.CompositeFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import fi.tfs.liiga.filters.HideServerHeaderFilter;

@SpringBootApplication
// @EnableOAuth2Sso
@EnableOAuth2Client
@EnableWebSecurity
@Configuration
public class LiigaApplication extends WebSecurityConfigurerAdapter {

    @Autowired
    private AutowireCapableBeanFactory beanFactory;
    
    @Autowired
    OAuth2ClientContext oauth2ClientContext;

    public static void main(String[] args) {
        SpringApplication.run(LiigaApplication.class, args);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .authorizeRequests()
        .antMatchers("/", 
                "/vendor.js", 
                "/bundle.js*", "/common/**", "/styles/**", "/login",
                "/public-api/liiga/**"
                ).permitAll()
        .anyRequest()
        .authenticated()
        .and().logout().logoutSuccessUrl("/#/etusivu").permitAll()
        .and().csrf().csrfTokenRepository(csrfTokenRepository())
        .and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
        .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);

    }

    private Filter ssoFilter() {
        CompositeFilter filter = new CompositeFilter();
        List<Filter> filters = new ArrayList<>();
        
        OAuth2ClientAuthenticationProcessingFilter facebookFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/facebook");
        OAuth2RestTemplate facebookTemplate = new OAuth2RestTemplate(facebook(), oauth2ClientContext);
        facebookFilter.setRestTemplate(facebookTemplate);
        facebookFilter.setTokenServices(new UserInfoTokenServices(facebookResource().getUserInfoUri(), facebook().getClientId()));
        filters.add(facebookFilter);

        OAuth2ClientAuthenticationProcessingFilter googleFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/google");
        OAuth2RestTemplate googleTemplate = new OAuth2RestTemplate(google(), oauth2ClientContext);
        googleFilter.setRestTemplate(googleTemplate);
        googleFilter.setTokenServices(new UserInfoTokenServices(googleResource().getUserInfoUri(), google().getClientId()));
        filters.add(googleFilter);
        
        filter.setFilters(filters);
        return filter;

    }
    
    @Bean
    @ConfigurationProperties("google.resource")
    ResourceServerProperties googleResource() {
        return new ResourceServerProperties();
    }

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

    @Bean
    @ConfigurationProperties("facebook.resource")
    ResourceServerProperties facebookResource() {
      return new ResourceServerProperties();
    }
    
    @Bean
    public FilterRegistrationBean oauth2ClientFilterRegistration(
        OAuth2ClientContextFilter filter) {
      FilterRegistrationBean registration = new FilterRegistrationBean();
      registration.setFilter(filter);
      registration.setOrder(-100);
      return registration;
    }

    @Bean
    public FilterRegistrationBean hideServerHeaderFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        Filter myFilter = new HideServerHeaderFilter();
        beanFactory.autowireBean(myFilter);
        registration.setFilter(myFilter);
        registration.addUrlPatterns("/*");
        return registration;
    }


    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

    private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                    FilterChain filterChain) throws ServletException, IOException {
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {
                    String attribute = request.getHeader("XSRF-TOKEN");
                    String token = csrf.getToken();
                    if (attribute == null || token != null && !token.equals(attribute)) {
                        response.setHeader("XSRF-TOKEN", token);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    @Bean
    @ConditionalOnMissingBean
    public GsonHttpMessageConverter gsonHttpMessageConverter(Gson defaultGson) {
        GsonHttpMessageConverter converter = new GsonHttpMessageConverter();

        converter.setGson(new GsonBuilder().create());
        return converter;
    }
}
