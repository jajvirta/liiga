
create table tulospeli (
    tulospeli_id serial primary key,
    tulospeli_ottelu_id integer references ottelu (ottelu_id),
    lohko_id integer,
    pelaaja_sija_1 integer references henkilo (henkilo_id),
    pelaaja_sija_2 integer references henkilo (henkilo_id),
    pelaaja_sija_3 integer references henkilo (henkilo_id),
    pelaaja_sija_4 integer references henkilo (henkilo_id)
);

