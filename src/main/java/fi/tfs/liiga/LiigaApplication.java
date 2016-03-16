package fi.tfs.liiga;

import java.io.IOException;

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
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import fi.tfs.liiga.filters.HideServerHeaderFilter;

@SpringBootApplication
@EnableOAuth2Sso
@EnableWebSecurity
@Configuration
public class LiigaApplication extends WebSecurityConfigurerAdapter {

    @Autowired
    private AutowireCapableBeanFactory beanFactory;


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
            .and().csrf().csrfTokenRepository(csrfTokenRepository())
            .and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
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
