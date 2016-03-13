

create table henkilo (
    henkilo_id serial primary key,
    nimi text,
    sahkoposti text,
    puhelinnumero text,
    oauth_tunnus text,
    yhteyshenkilo_k_e char(1) constraint y_k_e check (yhteyshenkilo_k_e in ('K', 'E')),
    vahvistettu_k_e char(1)
);

create table sarja (
    sarja_id serial primary key,
    nimi text,
    ajankohta_teksti text,
    aktiivinen_k_e char(1) constraint akt_k_e check (aktiivinen_k_e in ('K', 'E')),
    testisarja_k_e char(1) constraint testisarja_k_e check (testisarja_k_e in ('K', 'E'))
);

create table joukkue (
    joukkue_id serial primary key,
    nimi text,
    kotirata text,
    luotu timestamp default now(),
    ilmo_vahvistettu_k_e char(1) constraint ilmovahv_k_e check (ilmo_vahvistettu_k_e in ('K', 'E')),
    yhteyshenkilo_id integer references henkilo (henkilo_id)
);

create table ottelu (
    ottelu_id serial primary key,
    ottelun_sarja_id integer references sarja (sarja_id),
    pelipaiva date,
    kotijoukkue_id integer references joukkue (joukkue_id),
    vierasjoukkue_id integer references joukkue (joukkue_id),
    kotijoukkue_pisteet integer,
    vierasjoukkue_pisteet integer
);

-- pisteet on denormalisoitu vaikka tieto on oikeastaan peli-taulussakin

create table reikapeli (
    peli_id serial primary key,
    peli_ottelu_id integer references ottelu (ottelu_id),
    pelaaja_koti integer references henkilo (henkilo_id),
    koti_tulos integer,
    koti_pisteet integer,
    pelaaja_vieras integer references henkilo (henkilo_id),
    vieras_tulos integer,
    vieras_pisteet integer
);

insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Jarno', 'j@joo', '23445');
insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Seppo', 'j@joo', '23445');
insert into henkilo (nimi, sahkoposti, puhelinnumero) values ('Pauli', 'j@joo', '23445');

insert into joukkue (nimi, kotirata, ilmo_vahvistettu_k_e) values ('Vihiojan vippailijat', 'Vihioja', 'K');
insert into joukkue (nimi, kotirata) values ('Kangasalan karjut', 'Kangasala');
insert into joukkue (nimi, kotirata) values ('Juntit', 'Julkujärvi');
insert into joukkue (nimi, kotirata) values ('Kyräilijät', 'Kylmäkoski');


