
create table lohko (
    lohko_id serial primary key,
    lohko_nimi text,
    lohkon_sarja_id integer references sarja (sarja_id)
);

create table lohko_joukkue (
    lohkojoukkue_lohko_id integer references lohko (lohko_id),
    lohkojoukkue_joukkue_id integer references joukkue (joukkue_id),
);

create table sarja_joukkue (
    sarjajoukkue_sarja_id integer references sarja (sarja_id),
    sarjajoukkue_joukkue_id integer references joukkue (joukkue_id),
);





