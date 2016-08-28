drop table tulospeli;

create table tulospeli (
    tulospeli_id serial primary key,
    tulospeli_ottelu_id integer references ottelu (ottelu_id),
    lohko_id integer,
    pelaaja integer references henkilo (henkilo_id),
    joukkue integer,
    sijoitus integer,
    pisteet integer
);
