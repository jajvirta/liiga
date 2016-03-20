
create or replace  view 
  yhteyshenkilo_joukkue as 
  select *
  from joukkue 
  join henkilo on (joukkue.yhteyshenkilo_id = henkilo.henkilo_id);
