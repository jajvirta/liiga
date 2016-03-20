package fi.tfs.liiga.joukkue;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.joukkue.command.LisaaJoukkueCommand;
import fi.tfs.liiga.joukkue.dto.Joukkue;

@Component
public class JoukkueDao {

    private final JdbcTemplate jdbcTemplate;


    @Autowired
    public JoukkueDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private class Mapper implements RowMapper<Joukkue> {
        public Joukkue mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Joukkue(
                    rs.getInt("joukkue_id"),
                    rs.getString("nimi"),
                    rs.getString("kotirata"),
                    rs.getString("henkilo_nimi"),
                    rs.getString("sahkoposti"),
                    rs.getString("puhelinnumero"),
                    rs.getString("joukkue_kuvaus")
                    );
        }
    }

    @Transactional
    public List<Joukkue> haeJoukkueet() {
        List<Joukkue> query = jdbcTemplate.query(
                "select * from joukkue join henkilo on (joukkue.yhteyshenkilo_id = henkilo.henkilo_id)", 
                new Mapper());

        return query;
    }

    public List<Joukkue> haeAlustavatJoukkueet() {
        List<Joukkue> query = jdbcTemplate.query(
                "select * from yhteyshenkilo_joukkue where ilmo_vahvistettu_k_e is null", 
                        new Mapper());
        return query;
    }

    @Transactional
    public List<Joukkue> haeVahvistetutJoukkueet() {
        List<Joukkue> query = jdbcTemplate.query(
                "select * from joukkue where ilmo_vahvistettu_k_e = 'K'", 
                new Mapper());
        return query;
    }

    public List<Joukkue> haeJoukkue(String currentUserOauthId) {
        return jdbcTemplate.
                query(
                        "select * from yhteyshenkilo_joukkue"
                       + " where oauth_tunnus = ?", 
                                new Object [] { currentUserOauthId },
                                new Mapper());
    }

    @Transactional()
    public long lisaaJoukkue(LisaaJoukkueCommand lisaa, String userId) {
        SimpleJdbcInsert henkilo = 
                new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("henkilo")
                .usingGeneratedKeyColumns("henkilo_id");

        Map<String, Object> params = new HashMap<>();
        params.put("henkilo_nimi", lisaa.yhteyshenkiloNimi);
        params.put("sahkoposti", lisaa.yhteyshenkiloSahkoposti);
        params.put("oauth_tunnus", userId);
        params.put("puhelinnumero", lisaa.yhteyshenkiloPuhelinnumero);
        params.put("yhteyshenkilo_k_e", "K");

        Number returnKey = henkilo.executeAndReturnKey(params);

        SimpleJdbcInsert insert = 
                new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("joukkue")
                .usingGeneratedKeyColumns("joukkue_id");

        params = new HashMap<>();
        params.put("nimi", lisaa.nimi.trim());
        params.put("kotirata", lisaa.kotirata);
        params.put("joukkue_kuvaus", lisaa.kuvaus);

        params.put("yhteyshenkilo_id", returnKey);

        returnKey = insert.executeAndReturnKey(params);

        return returnKey.longValue();
    }

    @Transactional
    public void poistaJoukkue(int joukkueId, String currentUserOauthId) {
        String sql = "delete from joukkue where joukkue_id = "
                + "(select joukkue_id from yhteyshenkilo_joukkue where oauth_tunnus = ?)";
        jdbcTemplate.update(sql, currentUserOauthId);
        
    }
}
