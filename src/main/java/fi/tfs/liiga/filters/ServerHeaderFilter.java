package fi.tfs.liiga.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class HideServerHeaderFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // emme tarvitse
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse resp = (HttpServletResponse) response;

        // Ettei IE mene johonkin sovelluksen rikkovaan compatibility-moodiin.
        resp.setHeader("X-UA-Compatible", "IE=edge");

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // emme tarvitse
    }
}
