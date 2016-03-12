

create table henkilo (
    henkilo_id serial primary key,
    nimi text,
    sahkoposti text,
    puhelinnumero text,
    oauth_tunnus text,
    yhteyshenkilo_k_e char(1),
    vahvistettu_k_e char(1)
);

create table joukkue (
    joukkue_id serial primary key,
    nimi text,
    kotirata text,
    luotu timestamp default now(),
    ilmo_vahvistettu_k_e char(1),
    yhteyshenkilo_id integer references henkilo (henkilo_id)
);

insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Jarno', 'j@joo', '23445');
insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Seppo', 'j@joo', '23445');
insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Pauli', 'j@joo', '23445');

insert into joukkue (nimi, kotirata, ilmo_vahvistettu_k_e) values ('Vihiojan vippailijat', 'Vihioja', 'K');
insert into joukkue (nimi, kotirata) values ('Kangasalan karjut', 'Kangasala');
insert into joukkue (nimi, kotirata) values ('Juntit', 'Julkujärvi');
insert into joukkue (nimi, kotirata) values ('Kyräilijät', 'Kylmäkoski');


