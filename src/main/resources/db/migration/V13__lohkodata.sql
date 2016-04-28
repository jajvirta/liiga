
insert into lohko (lohko_nimi, lohkon_sarja_id) values ('Länsilohko', 1);
insert into lohko (lohko_nimi, lohkon_sarja_id) values ('Itälohko', 1);

insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'Woodpeckers'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'Aviaattorit'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'HV'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'Kiakkogosset'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'VlkDG'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'DG Keijot'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Itälohko'),
        (select joukkue_id from joukkue where nimi = 'Hervanta Disc Golf Team'));

insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Brutal Force'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Sasta FG'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Maajoukkue 2'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Ylöjärven Ryhti'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Amisketju'));
insert into lohko_joukkue values (
        (select lohko_id from lohko where lohko_nimi = 'Länsilohko'),
        (select joukkue_id from joukkue where nimi = 'Nelosketju'));


