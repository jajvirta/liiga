
drop view yhteyshenkilo_joukkue;

-- ei ole repeatablea niin tama pitaa ajaa uudelleen
create or replace  view 
  yhteyshenkilo_joukkue as 
  select *
  from joukkue 
  join henkilo on (joukkue.yhteyshenkilo_id = henkilo.henkilo_id);
