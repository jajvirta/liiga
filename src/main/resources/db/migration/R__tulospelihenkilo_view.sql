create or replace view tulospelihenkilo as
select
  tulospeli.*,
  ykkonen.henkilo_id as sija_1_id, ykkonen.henkilo_nimi as sija_1_nimi,
  kakkonen.henkilo_id as sija_2_id, kakkonen.henkilo_nimi as sija_2_nimi,
  kolmonen.henkilo_id as sija_3_id, kolmonen.henkilo_nimi as sija_3_nimi,
  nelonen.henkilo_id as sija_4_id, nelonen.henkilo_nimi as sija_4_nimi
from tulospeli
  left join henkilo ykkonen on (tulospeli.pelaaja_sija_1 = ykkonen.henkilo_id)
  left join henkilo kakkonen on (tulospeli.pelaaja_sija_2 = kakkonen.henkilo_id)
  left join henkilo kolmonen on (tulospeli.pelaaja_sija_3 = kolmonen.henkilo_id)
  left join henkilo nelonen on (tulospeli.pelaaja_sija_4 = nelonen.henkilo_id);