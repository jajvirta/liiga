package fi.tfs.liiga.ottelu;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.ottelu.dto.Ottelu;

@Component
public class OtteluDao {

     private final JdbcTemplate jdbcTemplate;
     
     public static final String baseQuery = 
                " select o.ottelu_id, lj.lohkojoukkue_lohko_id lohko_id, o.pelipaiva, kj.joukkue_id kj_id, kj.kotirata, "
                + "kj.nimi kotinimi, vj.joukkue_id vj_id, vj.nimi vierasnimi, o.kotijoukkue_pisteet kpiste, o.vierasjoukkue_pisteet vpiste, "
                + " (select count(1) from tulospeli where tulospeli_ottelu_id = ottelu_id) as merkatut"
                + " from ottelu o "
                + " join joukkue kj on (o.kotijoukkue_id = kj.joukkue_id) "
                + " join joukkue vj on (o.vierasjoukkue_id = vj.joukkue_id) "
                + " join lohko_joukkue lj on (o.kotijoukkue_id = lj.lohkojoukkue_joukkue_id) ";

    @Autowired
    public OtteluDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private class Mapper implements RowMapper<Ottelu> {
        public Ottelu mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Ottelu(
                    rs.getInt("ottelu_id"),
                    rs.getLong("lohko_id"),
                    rs.getDate("pelipaiva"),
                    rs.getLong("kj_id"),
                    rs.getString("kotinimi"),
                    rs.getLong("vj_id"),
                    rs.getString("vierasnimi"),
                    rs.getString("kotirata"),
                    rs.getInt("kpiste"),
                    rs.getInt("vpiste"),
                    rs.getInt("merkatut")
                    );
        }
    }


    public List<Ottelu> haeTulevatOttelut() {
        return jdbcTemplate.query(baseQuery + " order by (o.pelipaiva, o.ottelu_id)", new Mapper());
    }

    public List<Ottelu> haeTulevatOttelut(long joukkueId) {
        List<Ottelu> query = jdbcTemplate.query(
                baseQuery 
                + " where (o.kotijoukkue_id = ? or o.vierasjoukkue_id = ?) "
                + " order by (o.pelipaiva, o.ottelu_id)",
                new Mapper(), joukkueId, joukkueId);

        return query;
    }

    public List<Ottelu> haeTulevatOttelut(long joukkueId, String earliestDate) {
        List<Ottelu> query = jdbcTemplate.query(
                baseQuery 
                + " where (o.kotijoukkue_id = ? or o.vierasjoukkue_id = ?)"
                + " and o.pelipaiva > to_date(?, 'YYYY-MM-DD')" 
                + " order by (o.pelipaiva, o.ottelu_id)",
                new Mapper(), joukkueId, joukkueId, earliestDate);

        return query;
    }
}
