
delete from ottelu;

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'VlkDG'), (select joukkue_id from joukkue where nimi = 'Woodpeckers'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'), (select joukkue_id from joukkue where nimi = 'Aviaattorit'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'HV'), (select joukkue_id from joukkue where nimi = 'DG Keijot'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'DG Keijot'), (select joukkue_id from joukkue where nimi = 'Woodpeckers'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'HV'), (select joukkue_id from joukkue where nimi = 'VlkDG'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Kiakkogosset'), (select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Aviaattorit'), (select joukkue_id from joukkue where nimi = 'HV'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'DG Keijot'), (select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'VlkDG'), (select joukkue_id from joukkue where nimi = 'Kiakkogosset'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Woodpeckers'), (select joukkue_id from joukkue where nimi = 'HV'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Kiakkogosset'), (select joukkue_id from joukkue where nimi = 'Aviaattorit'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'), (select joukkue_id from joukkue where nimi = 'VlkDG'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'HV'), (select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Aviaattorit'), (select joukkue_id from joukkue where nimi = 'DG Keijot'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Woodpeckers'), (select joukkue_id from joukkue where nimi = 'Kiakkogosset'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-08', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'VlkDG'), (select joukkue_id from joukkue where nimi = 'DG Keijot'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-08', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Kiakkogosset'), (select joukkue_id from joukkue where nimi = 'HV'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-08', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Woodpeckers'), (select joukkue_id from joukkue where nimi = 'Aviaattorit'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-15', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'), (select joukkue_id from joukkue where nimi = 'Woodpeckers'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-15', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'DG Keijot'), (select joukkue_id from joukkue where nimi = 'Kiakkogosset'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(1, to_date('2016-06-15', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Aviaattorit'), (select joukkue_id from joukkue where nimi = 'VlkDG'));







insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Sasta FG'), (select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Amisketju'), (select joukkue_id from joukkue where nimi = 'Brutal Force'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-04', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Nelosketju'), (select joukkue_id from joukkue where nimi = 'Maajoukkue 2'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Maajoukkue 2'), (select joukkue_id from joukkue where nimi = 'Sasta FG'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'), (select joukkue_id from joukkue where nimi = 'Amisketju'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-11', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Brutal Force'), (select joukkue_id from joukkue where nimi = 'Nelosketju'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Sasta FG'), (select joukkue_id from joukkue where nimi = 'Nelosketju'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Amisketju'), (select joukkue_id from joukkue where nimi = 'Maajoukkue 2'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-18', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'), (select joukkue_id from joukkue where nimi = 'Brutal Force'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Brutal Force'), (select joukkue_id from joukkue where nimi = 'Sasta FG'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Maajoukkue 2'), (select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-05-25', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Nelosketju'), (select joukkue_id from joukkue where nimi = 'Amisketju'));


insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Sasta FG'), (select joukkue_id from joukkue where nimi = 'Amisketju'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'), (select joukkue_id from joukkue where nimi = 'Nelosketju'));

insert into ottelu (ottelun_sarja_id, pelipaiva, kotijoukkue_id, vierasjoukkue_id) values 
(2, to_date('2016-06-01', 'YYYY-MM-DD'), 
(select joukkue_id from joukkue where nimi = 'Brutal Force'), (select joukkue_id from joukkue where nimi = 'Maajoukkue 2'));

