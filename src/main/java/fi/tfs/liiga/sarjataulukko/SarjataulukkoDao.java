package fi.tfs.liiga.sarjataulukko;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.dto.SarjataulukkoRivi;

@Component
public class SarjataulukkoDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SarjataulukkoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public List<SarjataulukkoRivi> haeSarjatilanne() {
        return new ArrayList<SarjataulukkoRivi>();
    }
}
