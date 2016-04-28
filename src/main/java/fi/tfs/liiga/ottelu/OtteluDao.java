package fi.tfs.liiga.ottelu;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.ottelu.dto.TulevaOttelu;

@Component
public class OtteluDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OtteluDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private class Mapper implements RowMapper<TulevaOttelu> {
        public TulevaOttelu mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new TulevaOttelu(
                    rs.getInt("ottelu_id"),
                    rs.getLong("lohko_id"),
                    rs.getDate("pelipaiva"),
                    rs.getLong("kj_id"),
                    rs.getString("kotinimi"),
                    rs.getLong("vj_id"),
                    rs.getString("vierasnimi")
                    );
        }
    }


    public List<TulevaOttelu> haeTulevatOttelut() {
        List<TulevaOttelu> query = jdbcTemplate.query(
                " select o.ottelu_id, lj.lohkojoukkue_lohko_id lohko_id, o.pelipaiva, kj.joukkue_id kj_id, "
                + "kj.nimi kotinimi, vj.joukkue_id vj_id, vj.nimi vierasnimi from "
                + "ottelu o "
                + " join joukkue kj on (o.kotijoukkue_id = kj.joukkue_id) "
                + " join joukkue vj on (o.vierasjoukkue_id = vj.joukkue_id) "
                + " join lohko_joukkue lj on (o.kotijoukkue_id = lj.lohkojoukkue_joukkue_id)", 
                new Mapper());

        return query;
    }

}
