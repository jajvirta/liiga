package fi.tfs.liiga.joukkue;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

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
			Joukkue dummy = new Joukkue();
			dummy.setId(rs.getInt("joukkue_id"));
			dummy.setNimi(rs.getString("nimi"));
			dummy.setKotirata(rs.getString("kotirata"));
			return dummy;
		}
	}
	
	public List<Joukkue> haeJoukkueet() {
		List<Joukkue> query = jdbcTemplate.query(
				"select * from joukkue", 
				new Mapper());

		return query;
	}

	public List<Joukkue> haeAlustavatJoukkueet() {
		List<Joukkue> query = jdbcTemplate.query(
				"select * from joukkue where ilmo_vahvistettu_k_e is null", 
				new Mapper());
		return query;
	}

	public List<Joukkue> haeVahvistetutJoukkueet() {
		List<Joukkue> query = jdbcTemplate.query(
				"select * from joukkue where ilmo_vahvistettu_k_e = 'K'", 
				new Mapper());
		return query;
	}
}
