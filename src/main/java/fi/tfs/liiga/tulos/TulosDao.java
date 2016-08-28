package fi.tfs.liiga.tulos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import fi.tfs.liiga.ottelu.dto.Ottelu;
import fi.tfs.liiga.tulos.dto.OtteluJaTulos;
import fi.tfs.liiga.tulos.dto.OttelunTulos;
import fi.tfs.liiga.tulos.dto.PaivitaReikapeliCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulosCommand;
import fi.tfs.liiga.tulos.dto.PaivitaTulospeliCommand;
import fi.tfs.liiga.tulos.dto.Pelaajatilasto;
import fi.tfs.liiga.tulos.dto.Reikapeli;
import fi.tfs.liiga.tulos.dto.Tulospeli;

@Component
public class TulosDao {

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
    public TulosDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private class TulosMapper implements RowMapper<Tulospeli> {
        public Tulospeli mapRow(ResultSet rs, int rowNum) throws SQLException {
            int lohko = rs.getInt("lohko_id");
            String pelaaja = rs.getString("henkilo_nimi");
            int pelaajaId = rs.getInt("henkilo_id");
            int joukkue = rs.getInt("joukkue");
            int sijoitus = rs.getInt("sijoitus");
            int pisteet = rs.getInt("pisteet");
            int lohkojoukkue = rs.getInt("lohkojoukkue_lohko_id");

            return new Tulospeli(lohko, joukkue, lohkojoukkue, pelaaja, pelaajaId, sijoitus, pisteet);
        }
    }
    
    private class ReikapeliMapper implements RowMapper<Reikapeli> {
        public Reikapeli mapRow(ResultSet rs, int rowNum) throws SQLException {
            int kotiId = rs.getInt("pelaaja_koti");
            String kotinimi = rs.getString("pelaaja_koti_nimi");
            int vierasId = rs.getInt("pelaaja_vieras");
            String vierasnimi = rs.getString("pelaaja_vieras_nimi");
            int jarjestys = rs.getInt("jarjestys");
            int kotipisteet = rs.getInt("koti_pisteet");
            int vieraspisteet = rs.getInt("vieras_pisteet");

            String tulosString = "";
            if (kotipisteet == 2 && vieraspisteet == 0) {
                tulosString = "kotivoitto";
            } else if (kotipisteet == 1 && vieraspisteet == 1) {
                tulosString = "tasapeli";
            } else if (kotipisteet == 0 && vieraspisteet == 2) {
                tulosString = "vierasvoitto";
            }

            return new Reikapeli(kotiId, kotinimi, kotipisteet, vierasId, vierasnimi, vieraspisteet, tulosString, jarjestys);
        }
    }
    // TODO tee yheinen mapperi otteludaon kanssa
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
    
    public OttelunTulos haeOttelunTulos(long otteluId) {
        List<Tulospeli> tulospelit = jdbcTemplate.query(
                "select *, 0 as lohkojoukkue_lohko_id from tulospeli t join henkilo h on (h.henkilo_id = t.pelaaja) where t.tulospeli_ottelu_id = ?", 
                new TulosMapper(), otteluId);
        Optional<Tulospeli> lohko1Voittaja = tulospelit.stream().filter(t -> t.sijoitus == 1 && t.lohko == 1).findAny();
        Optional<Tulospeli> lohko1Kakkonen = tulospelit.stream().filter(t -> t.sijoitus == 2 && t.lohko == 1).findAny();
        Optional<Tulospeli> lohko1Kolmonen = tulospelit.stream().filter(t -> t.sijoitus == 3 && t.lohko == 1).findAny();
        Optional<Tulospeli> lohko1Nelonen = tulospelit.stream().filter(t -> t.sijoitus == 4 && t.lohko == 1).findAny();

        Optional<Tulospeli> lohko2Voittaja = tulospelit.stream().filter(t -> t.sijoitus == 1 && t.lohko == 2).findAny();
        Optional<Tulospeli> lohko2Kakkonen = tulospelit.stream().filter(t -> t.sijoitus == 2 && t.lohko == 2).findAny();
        Optional<Tulospeli> lohko2Kolmonen = tulospelit.stream().filter(t -> t.sijoitus == 3 && t.lohko == 2).findAny();
        Optional<Tulospeli> lohko2Nelonen = tulospelit.stream().filter(t -> t.sijoitus == 4 && t.lohko == 2).findAny();

        String reikapeliSql = "select pelaaja_koti, h1.henkilo_nimi as pelaaja_koti_nimi, pelaaja_vieras, "
                + "h2.henkilo_nimi as pelaaja_vieras_nimi, r.koti_pisteet, r.vieras_pisteet, r.jarjestys "
                + "from reikapeli r "
                + "join henkilo h1 on (r.pelaaja_koti = h1.henkilo_id) "
                + "join henkilo h2 on (r.pelaaja_vieras = h2.henkilo_id) where peli_ottelu_id = ?";

        List<Reikapeli> reikapelit = jdbcTemplate.query(
                reikapeliSql,
                new ReikapeliMapper(), otteluId);
        Optional<Reikapeli> ensimmainen = reikapelit.stream().filter(r -> r.jarjestys == 1).findAny();
        Optional<Reikapeli> toinen = reikapelit.stream().filter(r -> r.jarjestys == 2).findAny();
        Optional<Reikapeli> kolmas = reikapelit.stream().filter(r -> r.jarjestys == 3).findAny();
        Optional<Reikapeli> neljas = reikapelit.stream().filter(r -> r.jarjestys == 4).findAny();

        return new OttelunTulos(lohko1Voittaja, lohko1Kakkonen, lohko1Kolmonen, lohko1Nelonen,
                lohko2Voittaja, lohko2Kakkonen, lohko2Kolmonen, lohko2Nelonen,
                ensimmainen, toinen, kolmas, neljas
                );
    }
    
    public List<Pelaajatilasto> haeTilastot() {
        String sql = "select tulospeli.*, h.*, lj.lohkojoukkue_lohko_id "
                + " from tulospeli join henkilo h on (h.henkilo_id = tulospeli.pelaaja) "
                + " join joukkue j on (j.joukkue_id = h.joukkue) "
                + " join lohko_joukkue lj on (lj.lohkojoukkue_joukkue_id = j.joukkue_id)"
                + " where h.joukkue is not null";
        
        List<Tulospeli> tulospelit = jdbcTemplate.query(sql, new TulosMapper());
        
        Map<Integer, Pelaajatilasto> collector = new HashMap<>();
        
        for (Tulospeli t : tulospelit) {
            Integer pelaaja = new Integer(t.pelaajaId);
            if (!collector.containsKey(pelaaja)) {
                collector.put(pelaaja, new Pelaajatilasto(t.pelaajaId, t.nimi, t.joukkuelohko, 0, 0, 0));
            }
            
            Pelaajatilasto current = collector.get(pelaaja);
            Pelaajatilasto newTilasto = 
                    new Pelaajatilasto(t.pelaajaId, t.nimi, current.joukkuelohko, current.ottelut + 1, 
                            current.tulospisteet + t.pisteet, current.reikapelipisteet);
            collector.put(pelaaja, newTilasto);
        }
        System.out.println(collector.values().size());

        String reikapeliSql = "select pelaaja_koti, h1.henkilo_nimi as pelaaja_koti_nimi, pelaaja_vieras, "
                + "h2.henkilo_nimi as pelaaja_vieras_nimi, r.koti_pisteet, r.vieras_pisteet, r.jarjestys "
                + "from reikapeli r "
                + "join henkilo h1 on (r.pelaaja_koti = h1.henkilo_id) "
                + "join henkilo h2 on (r.pelaaja_vieras = h2.henkilo_id)";
        List<Reikapeli> reikapelit = jdbcTemplate.query(reikapeliSql, new ReikapeliMapper());
        
        for (Reikapeli r : reikapelit) {
            Integer kotipelaaja = new Integer(r.kotipelaajaId);
            //if (!collector.containsKey(kotipelaaja)) {
            //    collector.put(kotipelaaja, new Pelaajatilasto(r.kotipelaajaId, r.kotipelaaja, 0, 0, 0));
            //}

            Integer vieraspelaaja = new Integer(r.vieraspelaajaId);
            //if (!collector.containsKey(vieraspelaaja)) {
            //    collector.put(vieraspelaaja, new Pelaajatilasto(r.vieraspelaajaId, r.vieraspelaaja, 0, 0, 0));
            //}
            System.out.println(kotipelaaja);
            
            Pelaajatilasto currentKoti = collector.get(kotipelaaja);
            Pelaajatilasto newKoti = 
                    new Pelaajatilasto(r.kotipelaajaId, r.kotipelaaja, currentKoti.joukkuelohko, 
                            currentKoti.ottelut, 
                            currentKoti.tulospisteet, currentKoti.reikapelipisteet + r.kotipisteet);
            collector.put(kotipelaaja, newKoti);
            
            System.out.println(vieraspelaaja);
            Pelaajatilasto currentVieras = collector.get(vieraspelaaja);
            Pelaajatilasto newVieras = 
                    new Pelaajatilasto(r.vieraspelaajaId, r.vieraspelaaja, 
                            currentVieras.joukkuelohko,
                            currentVieras.ottelut, 
                            currentVieras.tulospisteet, currentVieras.reikapelipisteet + r.vieraspisteet);
            collector.put(vieraspelaaja, newVieras);
        }
        
        return collector.values().stream().collect(Collectors.toList());
    }

    public OtteluJaTulos haeOttelu(long otteluId) {
        Ottelu ottelu = jdbcTemplate.queryForObject(baseQuery + "where o.ottelu_id = ?", new Object[] {otteluId}, new Mapper());
        OttelunTulos tulos = this.haeOttelunTulos(otteluId);
        
        return new OtteluJaTulos(ottelu, tulos);
    }
    
    private int getHenkilo(long kotijoukkue, String nimi) {
        List<Integer> results = 
                jdbcTemplate.queryForList("select henkilo_id from henkilo where UPPER(henkilo_nimi) like ? and joukkue = ?", 
                new Object[] { nimi.toUpperCase(), kotijoukkue }, Integer.class);
        return results.get(0).intValue();
    }
    
    private int insertOrGetHenkilo(int joukkueId, String nimi) {
        List<Integer> results = jdbcTemplate.queryForList("select henkilo_id from henkilo where UPPER(henkilo_nimi) like ? and joukkue = ?", 
                new Object[] { nimi.toUpperCase(), joukkueId }, Integer.class);

        Integer henkiloId = null;

        if (results.size() == 0) {
            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(new PreparedStatementCreator() {
                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

                    PreparedStatement ps = connection.prepareStatement("insert into henkilo (henkilo_nimi, joukkue) values (?, ?)", Statement.RETURN_GENERATED_KEYS);
                    ps.setString(1, nimi);
                    ps.setInt(2, joukkueId);
                    return ps;
                }
            }, keyHolder);

            henkiloId = (Integer) keyHolder.getKeys().get("henkilo_id");
        } else {
            henkiloId = results.get(0);
        }
        
        return henkiloId.intValue();
    }

    public void paivitaTulospeli(PaivitaTulospeliCommand command) {
        
        int voittajaId = insertOrGetHenkilo(command.voittajaJoukkue, command.voittajaNimi);
        int kakkonenId = insertOrGetHenkilo(command.kakkonenJoukkue, command.kakkonenNimi);
        int kolmonenId = insertOrGetHenkilo(command.kolmonenJoukkue, command.kolmonenNimi);
        int nelonenId = insertOrGetHenkilo(command.nelonenJoukkue, command.nelonenNimi);


        String sql = "insert into tulospeli (tulospeli_ottelu_id, lohko_id, "
                + " pelaaja, joukkue, sijoitus, pisteet)"
                + " values (?, ?, ?, ?, ?, ?)";
        System.out.println(command.otteluId + " " + " " + voittajaId + " " + command.voittajaJoukkue);
        jdbcTemplate.update(sql, command.otteluId, Integer.parseInt(command.lohko),
                voittajaId, command.voittajaJoukkue, 1, 3);
        jdbcTemplate.update(sql, command.otteluId, Integer.parseInt(command.lohko),
                kakkonenId, command.kakkonenJoukkue, 2, 2);
        jdbcTemplate.update(sql, command.otteluId, Integer.parseInt(command.lohko),
                kolmonenId, command.kolmonenJoukkue, 3, 1);
        jdbcTemplate.update(sql, command.otteluId, Integer.parseInt(command.lohko),
                nelonenId, command.nelonenJoukkue, 4, 0);
    }

    public void lisaaReikapeli(PaivitaReikapeliCommand command) {
        String sql = "insert into reikapeli (peli_ottelu_id, pelaaja_koti, koti_pisteet,"
                + " pelaaja_vieras, vieras_pisteet, jarjestys) values (?, ?, ?, ?, ?, ?)";

        int koti = getHenkilo(command.kotijoukkue, command.reikapeli1.koti);
        int vieras = getHenkilo(command.vierasjoukkue, command.reikapeli1.vieras);
        int kotipisteet = kotipisteet(command.reikapeli1.tulos);
        int vieraspisteet = vieraspisteet(command.reikapeli1.tulos);
        jdbcTemplate.update(sql, command.otteluId, koti, kotipisteet, vieras, vieraspisteet, 1);
        
        
        koti = getHenkilo(command.kotijoukkue, command.reikapeli2.koti);
        vieras = getHenkilo(command.vierasjoukkue, command.reikapeli2.vieras);
        kotipisteet = kotipisteet(command.reikapeli2.tulos);
        vieraspisteet = vieraspisteet(command.reikapeli2.tulos);
        jdbcTemplate.update(sql, command.otteluId, koti, kotipisteet, vieras, vieraspisteet, 2);

        koti = getHenkilo(command.kotijoukkue, command.reikapeli3.koti);
        vieras = getHenkilo(command.vierasjoukkue, command.reikapeli3.vieras);
        kotipisteet = kotipisteet(command.reikapeli3.tulos);
        vieraspisteet = vieraspisteet(command.reikapeli3.tulos);
        jdbcTemplate.update(sql, command.otteluId, koti, kotipisteet, vieras, vieraspisteet, 3);

        koti = getHenkilo(command.kotijoukkue, command.reikapeli4.koti);
        vieras = getHenkilo(command.vierasjoukkue, command.reikapeli4.vieras);
        kotipisteet = kotipisteet(command.reikapeli4.tulos);
        vieraspisteet = vieraspisteet(command.reikapeli4.tulos);
        jdbcTemplate.update(sql, command.otteluId, koti, kotipisteet, vieras, vieraspisteet, 4);
        
    }

    private int kotipisteet(String tulos) {
        return "kotivoitto".equals(tulos) ? 2 : "tasapeli".equals(tulos) ? 1 : 0;
    }

    private int vieraspisteet(String tulos) {
        return "vierasvoitto".equals(tulos) ? 2 : "tasapeli".equals(tulos) ? 1 : 0;
    }

    public void paivitaTulos(long otteluId, PaivitaTulosCommand command) {
        String sql = "update ottelu set kotijoukkue_pisteet = ?, vierasjoukkue_pisteet = ?"
                + " where ottelu_id = ?";

        jdbcTemplate.update(sql, command.kotipisteet, command.vieraspisteet, otteluId);
        
    }
}
