package fi.tfs.liiga.otteluohjelma;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class OtteluohjelmaDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OtteluohjelmaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    
    public void generoiOtteluohjelma() {
        // TODO
    }

}
